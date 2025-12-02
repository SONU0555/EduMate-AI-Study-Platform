        // Timer state
        let currentSession = 'focus';
        let timeLeft = 25 * 60; // 25 minutes in seconds
        let totalTime = 25 * 60;
        let timerInterval = null;
        let isRunning = false;

        // Settings
        const settings = {
            focus: 25,
            short: 5,
            long: 15
        };

        // Stats
        let stats = {
            sessions: 0,
            minutes: 0,
            streak: 0
        };

        // Motivational quotes
        const quotes = [
            "Stay focused — small steps lead to big changes",
            "Success is the sum of small efforts repeated daily",
            "Focus on being productive instead of busy",
            "The secret of getting ahead is getting started",
            "One focused hour is worth more than many scattered ones",
            "Consistency is the key to mastery",
            "Your future is created by what you do today"
        ];

        // Circle progress
        const circle = document.getElementById('progressCircle');
        const circumference = 2 * Math.PI * 150;

        // Select session type
        function selectSession(type) {
            if (isRunning) return;
            
            currentSession = type;
            
            // Update UI
            document.querySelectorAll('.session-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-type="${type}"]`).classList.add('active');
            
            // Update timer
            const labels = {
                focus: 'Focus Session',
                short: 'Short Break',
                long: 'Long Break'
            };
            
            timeLeft = settings[type] * 60;
            totalTime = timeLeft;
            
            document.getElementById('timerLabel').textContent = labels[type];
            updateDisplay();
            updateCircle();
        }

        // Update timer display
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timerDisplay').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Update circular progress
        function updateCircle() {
            const progress = (timeLeft / totalTime);
            const offset = circumference * (1 - progress);
            circle.style.strokeDashoffset = offset;
        }

        // Start timer
        function startTimer() {
            if (isRunning) return;
            
            isRunning = true;
            document.getElementById('startBtn').disabled = true;
            document.getElementById('pauseBtn').disabled = false;
            document.getElementById('timerDisplay').classList.add('pulse');
            
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                    updateCircle();
                } else {
                    completeSession();
                }
            }, 1000);
        }

        // Pause timer
        function pauseTimer() {
            isRunning = false;
            clearInterval(timerInterval);
            document.getElementById('startBtn').disabled = false;
            document.getElementById('pauseBtn').disabled = true;
            document.getElementById('timerDisplay').classList.remove('pulse');
        }

        // Reset timer
        function resetTimer() {
            pauseTimer();
            timeLeft = settings[currentSession] * 60;
            totalTime = timeLeft;
            updateDisplay();
            updateCircle();
        }

        // Complete session
        function completeSession() {
            pauseTimer();
            
            // Update stats
            if (currentSession === 'focus') {
                stats.sessions++;
                stats.minutes += settings.focus;
                stats.streak++;
                
                updateStats();
                
                // Play completion sound (visual feedback)
                alert('🎉 Focus session completed! Great work!\n\nTime for a break.');
            }
            
            // Rotate motivational quote
            rotateQuote();
            
            // Reset timer
            resetTimer();
        }

        // Update stats display
        function updateStats() {
            document.getElementById('sessionsCompleted').textContent = stats.sessions;
            document.getElementById('totalMinutes').textContent = stats.minutes;
            document.getElementById('currentStreak').textContent = stats.streak;
        }

        // Adjust settings
        function adjustSetting(type, amount) {
            if (isRunning) return;
            
            settings[type] = Math.max(1, settings[type] + amount);
            document.getElementById(`${type}Duration`).textContent = settings[type];
            
            if (currentSession === type) {
                timeLeft = settings[type] * 60;
                totalTime = timeLeft;
                updateDisplay();
                updateCircle();
            }
        }

        // Rotate motivational quote
        function rotateQuote() {
            const quote = quotes[Math.floor(Math.random() * quotes.length)];
            document.getElementById('motivationQuote').textContent = quote;
        }

        // Initialize
        updateDisplay();
        updateCircle();
        
        // Change quote every 30 seconds
        setInterval(rotateQuote, 30000);