// Feature navigation function
// function openFeature(featureName) {
//     const features = {
//         'planner': 'EduMate\HTML\EduMate.html',
//         'notes': 'Notes Summarizer',
//         'pomodoro': 'Pomodoro Focus Timer',
//         'tracker': 'Assignment Tracker',
//         'career': 'Career Suggestions'
//     };

//     window.location.href = features[featureName];
    
    // Show alert for now - you can replace this with actual navigation
    // alert(`Opening ${features[featureName]}...\n\nThis will navigate to the ${features[featureName]} page.`);
    
    // For actual implementation, you would use:
    // window.location.href = `${featureName}.html`;
// }


// Quick action buttons
// document.querySelectorAll('.quick-btn').forEach((btn, index) => {
//     btn.addEventListener('click', function() {
//         const actions = ['Start Timer', "Today's Plan", 'Add Assignment'];
//         const action = actions[index];
        
//         // Add ripple effect
//         const ripple = document.createElement('span');
//         ripple.style.cssText = `
//             position: absolute;
//             border-radius: 50%;
//             background: rgba(255, 255, 255, 0.6);
//             width: 100px;
//             height: 100px;
//             margin-left: -50px;
//             margin-top: -50px;
//             animation: ripple 0.6s;
//         `;
        
//         this.style.position = 'relative';
//         this.appendChild(ripple);
        
//         setTimeout(() => ripple.remove(), 600);
        
//     });
// });

// Add ripple animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// Dynamic greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.querySelector('.greeting');
    
    if (hour < 12) {
        greetingElement.textContent = '🌅 Good Morning! Welcome to Your AI Study Companion';
    } else if (hour < 18) {
        greetingElement.textContent = '☀️ Good Afternoon! Welcome to Your AI Study Companion';
    } else {
        greetingElement.textContent = '🌙 Good Evening! Welcome to Your AI Study Companion';
    }
}

// Initialize
updateGreeting();

// Add hover sound effect simulation (visual feedback)
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Random motivational quotes
const quotes = [
    "One step at a time. Your consistency decides your success.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The secret of getting ahead is getting started.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today."
];

function rotateQuote() {
    const quoteElement = document.querySelector('.motivation-quote');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.style.opacity = '0';
    
    setTimeout(() => {
        quoteElement.textContent = `"${randomQuote}"`;
        quoteElement.style.opacity = '1';
    }, 300);
}

// Change quote every 10 seconds
setInterval(rotateQuote, 10000);