// Fun Facts Database
const planetFacts = {
    mercury: [
        "I'm the fastest planet around the Sun!",
        "I have the most extreme temperatures!",
        "I'm the smallest planet!"
    ],
    venus: [
        "I'm the hottest planet!",
        "I spin backwards!",
        "I'm Earth's sister planet!"
    ],
    earth: [
        "I'm the only planet with liquid water oceans!",
        "I'm the only planet with life that we know of!",
        "I have one natural satellite - the Moon!"
    ]
};

// Quiz System
const quizQuestions = [
    {
        question: "What's the largest planet in our Solar System?",
        answer: "jupiter"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: "mars"
    },
    {
        question: "Which planet has beautiful rings around it?",
        answer: "saturn"
    }
];

let currentQuiz = 0;
let score = 0;

function checkQuizAnswer() {
    const userAnswer = document.getElementById('quiz-answer').value.toLowerCase();
    const correctAnswer = quizQuestions[currentQuiz].answer;
    
    if (userAnswer === correctAnswer) {
        showMessage("🎉 Correct! You're a space genius!");
        score++;
        nextQuestion();
    } else {
        showMessage("Try again! Here's a hint: This planet is special for its " + getHint(currentQuiz));
    }
}

function getHint(quizIndex) {
    const hints = {
        0: "size - it's REALLY big!",
        1: "color - look at its nickname!",
        2: "unique feature around it!"
    };
    return hints[quizIndex];
}

function nextQuestion() {
    currentQuiz = (currentQuiz + 1) % quizQuestions.length;
    document.getElementById('quiz-question').textContent = quizQuestions[currentQuiz].question;
    document.getElementById('quiz-answer').value = '';
    
    if (currentQuiz === 0) {
        showFinalScore();
    }
}

function showFinalScore() {
    const message = `Amazing job! You got ${score} out of ${quizQuestions.length} questions right!`;
    showMessage(message);
    score = 0; // Reset score for next round
}

function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'alert alert-primary animate__animated animate__bounceIn';
    messageDiv.textContent = message;
    
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.insertBefore(messageDiv, quizContainer.firstChild);
    
    setTimeout(() => messageDiv.remove(), 3000);
}

// Planet Facts System
function showFunFact(planet) {
    const facts = planetFacts[planet];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    showMessage(randomFact);
}

// Fact Carousel System
let currentFact = 0;
const facts = document.querySelectorAll('.fact-card');

function nextFact() {
    facts[currentFact].classList.remove('active');
    currentFact = (currentFact + 1) % facts.length;
    facts[currentFact].classList.add('active');
}

// Interactive Planet Colors
const planetColors = {
    mercury: '#A0522D',
    venus: '#DEB887',
    earth: '#4169E1',
    mars: '#CD5C5C',
    jupiter: '#DAA520',
    saturn: '#F4A460',
    uranus: '#87CEEB',
    neptune: '#1E90FF'
};

function initPlanetColors() {
    const container = document.getElementById('planet-colors');
    
    Object.entries(planetColors).forEach(([planet, color]) => {
        const planetCircle = document.createElement('div');
        planetCircle.className = 'planet-circle';
        planetCircle.style.backgroundColor = '#ccc';
        planetCircle.setAttribute('data-planet', planet);
        planetCircle.setAttribute('data-color', color);
        
        planetCircle.addEventListener('click', revealPlanetColor);
        container.appendChild(planetCircle);
    });
}

function revealPlanetColor(event) {
    const circle = event.target;
    const planet = circle.getAttribute('data-planet');
    const color = circle.getAttribute('data-color');
    
    circle.style.backgroundColor = color;
    showMessage(`This is the color of ${planet.charAt(0).toUpperCase() + planet.slice(1)}!`);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up first quiz question
    document.getElementById('quiz-question').textContent = quizQuestions[currentQuiz].question;
    
    // Start fact carousel
    setInterval(nextFact, 5000);
    
    // Initialize planet colors game
    initPlanetColors();
    
    // Add floating animation to planet cards
    const cards = document.querySelectorAll('.planet-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


//locate fun fact planets
function showFunFact(url) {
    // Navigate to the given url
    window.location.href = url;
}