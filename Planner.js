// script.js
const predefinedSubjects = ['Math', 'Science', 'English', 'History', 'Physics', 'Chemistry'];
let selectedSubjects = [];
let selectedDifficulty = '';

// Initialize subjects grid
function initSubjects() {
    const grid = document.getElementById('subjectsGrid');
    predefinedSubjects.forEach(subject => {
        const btn = document.createElement('button');
        btn.className = 'subject-chip';
        btn.textContent = subject;
        btn.onclick = () => toggleSubject(subject, btn);
        grid.appendChild(btn);
    });
}

// Toggle subject selection
function toggleSubject(subject, btn) {
    if (selectedSubjects.includes(subject)) {
        selectedSubjects = selectedSubjects.filter(s => s !== subject);
        btn.classList.remove('selected');
    } else {
        selectedSubjects.push(subject);
        btn.classList.add('selected');
    }
}

// Add custom subject
document.getElementById('addSubjectBtn').onclick = function() {
    const input = document.getElementById('customSubject');
    const subject = input.value.trim();
    
    if (subject && !selectedSubjects.includes(subject)) {
        selectedSubjects.push(subject);
        
        const btn = document.createElement('button');
        btn.className = 'subject-chip selected';
        btn.textContent = subject;
        btn.onclick = () => {
            selectedSubjects = selectedSubjects.filter(s => s !== subject);
            btn.remove();
        };
        
        document.getElementById('subjectsGrid').appendChild(btn);
        input.value = '';
    }
};

// Handle Enter key for custom subject
document.getElementById('customSubject').onkeypress = function(e) {
    if (e.key === 'Enter') {
        document.getElementById('addSubjectBtn').click();
    }
};

// Hours slider
const hoursSlider = document.getElementById('hoursSlider');
const hoursValue = document.getElementById('hoursValue');
const hoursText = document.getElementById('hoursText');

hoursSlider.oninput = function() {
    const value = this.value;
    hoursValue.textContent = value;
    hoursText.textContent = value === '1' ? 'hour' : 'hours';
    
    const percent = ((value - 1) / 7) * 100;
    this.style.background = `linear-gradient(to right, #86efac 0%, #22c55e ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`;
};

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('examDate').setAttribute('min', today);

// Difficulty buttons
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.onclick = function() {
        document.querySelectorAll('.difficulty-btn').forEach(b => {
            b.classList.remove('selected', 'easy', 'medium', 'hard');
        });
        
        selectedDifficulty = this.dataset.level;
        this.classList.add('selected', selectedDifficulty.toLowerCase());
    };
});

// Generate plan
document.getElementById('generateBtn').onclick = function() {
    const topics = document.getElementById('topics').value;
    const hours = parseInt(hoursSlider.value);
    const examDate = document.getElementById('examDate').value;
    
    if (!selectedSubjects.length || !topics || !examDate || !selectedDifficulty) {
        alert('Please fill in all fields');
        return;
    }
    
    const today = new Date();
    const exam = new Date(examDate);
    const daysLeft = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 0) {
        alert('Please select a future date');
        return;
    }
    
    const topicList = topics.split(',').map(t => t.trim()).filter(Boolean);
    const totalHours = daysLeft * hours;
    const hoursPerTopic = Math.floor(totalHours / topicList.length);
    const dailyTopics = Math.ceil(topicList.length / daysLeft);
    
    document.getElementById('daysLeft').textContent = daysLeft;
    document.getElementById('totalHours').textContent = totalHours + 'h';
    document.getElementById('hoursPerTopic').textContent = hoursPerTopic + 'h';
    document.getElementById('dailyTopics').textContent = dailyTopics;
    document.getElementById('summarySubjects').textContent = 'Subjects: ' + selectedSubjects.join(', ');
    document.getElementById('summaryNote').textContent = `Focus on ${selectedDifficulty.toLowerCase()} difficulty content. Stay consistent!`;
    
    document.getElementById('resultsCard').classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('resultsCard').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
};

// Initialize
initSubjects();