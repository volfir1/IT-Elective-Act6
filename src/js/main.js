// Databases
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

const spaceWords = [
    { word: "Asteroid", definition: "A rocky object that orbits the Sun, smaller than a planet!" },
    { word: "Galaxy", definition: "A huge collection of stars, gas, and dust held together by gravity!" },
    { word: "Nebula", definition: "A giant cloud of gas and dust in space where stars are born!" },
    { word: "Black Hole", definition: "A place in space where gravity is so strong that even light can't escape!" },
    { word: "Comet", definition: "A ball of ice and rock that grows a tail when it gets close to the Sun!" }
];

const timelineEvents = [
    { year: 1957, event: "First satellite in space - Sputnik 1" },
    { year: 1961, event: "First human in space - Yuri Gagarin" },
    { year: 1969, event: "First humans on the Moon - Apollo 11" },
    { year: 1990, event: "Hubble Space Telescope launched" },
    { year: 2012, event: "Curiosity rover lands on Mars" }
];

const astronautQA = [
    {
        question: "How do astronauts sleep in space?",
        answer: "In special sleeping bags attached to the wall! Without gravity, we could float away while sleeping!"
    },
    {
        question: "What do astronauts eat in space?",
        answer: "Special packaged food and drinks that won't float away! Some foods are dehydrated - we add water before eating."
    },
    {
        question: "How do astronauts exercise in space?",
        answer: "We use special equipment like treadmills and resistance bands that keep us strapped down!"
    }
];

const spaceExperiments = [
    {
        title: "Make a Moon Phases Cookie",
        materials: ["Oreo cookies", "Plate"],
        steps: ["Twist cookie apart", "Scrape cream to show different moon phases!"]
    },
    {
        title: "Create a Crater",
        materials: ["Flour", "Cocoa powder", "Marbles"],
        steps: ["Fill pan with flour", "Dust with cocoa", "Drop marbles to make craters!"]
    }
];

const spaceJobs = [
    {
        title: "Astronaut",
        description: "Explores space and does experiments on space stations!"
    },
    {
        title: "Rocket Engineer",
        description: "Designs and builds the rockets that go to space!"
    },
    {
        title: "Astrobiologist",
        description: "Searches for life on other planets!"
    }
];

const quizQuestions = [
    {
        question: "What's the largest planet in our Solar System?",
        answer: "jupiter",
        hint: "distinctive red spot"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: "mars",
        hint: "rusty red color"
    },
    {
        question: "Which planet has the most prominent rings?",
        answer: "saturn",
        hint: "beautiful ring system"
    },
    {
        question: "What planet is closest to the Sun?",
        answer: "mercury",
        hint: "extremely hot temperatures"
    }
];

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

// State Management
let currentQuiz = 0;
let score = 0;
let currentFact = 0;

// Utility Functions
function showMessage(message) {
    const questionElement = getElement('quiz-question');
    const quizContainer = questionElement.parentElement;
    
    // Remove existing message if present
    const existingMessage = quizContainer.querySelector('.quiz-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and add new message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'quiz-message alert ' + 
        (message.includes('Correct') ? 'alert-success' : 'alert-info');
    messageDiv.textContent = message;
    
    // Insert after the button
    const button = quizContainer.querySelector('button');
    button.parentNode.insertBefore(messageDiv, button.nextSibling);
}

function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with ID "${id}" not found.`);
        return null;
    }
    return element;
}


function getElement(id) {
    return document.getElementById(id);
}
// Quiz System
function checkQuizAnswer() {
    const answerInput = getElement('quiz-answer');
    if (!answerInput) return;

    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = quizQuestions[currentQuiz].answer;
    
    if (userAnswer === correctAnswer) {
        showMessage("🎉 Correct! You're a space genius!");
        score++;
        nextQuestion();
    } else {
        showMessage("Try again! Here's a hint: This planet is special for its " + getHint(currentQuiz));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    resetQuiz();
})
function getHint(questionIndex) {
    return quizQuestions[questionIndex].hint;
}

function nextQuestion() {
    currentQuiz++;
    if (currentQuiz >= quizQuestions.length) {
        // Quiz completed
        const questionElement = getElement('quiz-question').parentElement;
        questionElement.innerHTML = `
            <h4>🎉 Quiz Complete!</h4>
            <p>Your score: ${score} out of ${quizQuestions.length}</p>
            <button class="btn btn-primary mt-3" onclick="resetQuiz()">Try Again</button>
        `;
    } else {
        // Show next question
        getElement('quiz-question').textContent = quizQuestions[currentQuiz].question;
        getElement('quiz-answer').value = '';
    }
}

function resetQuiz() {
    currentQuiz = 0;
    score = 0;
    const questionElement = getElement('quiz-question');
    if (questionElement) {
        questionElement.textContent = quizQuestions[0].question;
        const answerInput = getElement('quiz-answer');
        if (answerInput) {
            answerInput.value = '';
        }
    }
}

function showFinalScore() {
    const message = `Amazing job! You got ${score} out of ${quizQuestions.length} questions right!`;
    showMessage(message);
    score = 0; // Reset score for next round
}

function showFinalScore() {
    const message = `Amazing job! You got ${score} out of ${quizQuestions.length} questions right!`;
    showMessage(message);
    score = 0;
}



// Configuration for planet orbits with reduced speeds
const PLANET_CONFIG = {
    // Reduced speeds (original values divided by ~4)
    mercury: { orbitRadius: 50, speed: 1.0, size: 10 },
    venus: { orbitRadius: 80, speed: 0.9, size: 15 },
    earth: { orbitRadius: 110, speed: 0.8, size: 16 },
    mars: { orbitRadius: 140, speed: 0.7, size: 14 },
    jupiter: { orbitRadius: 180, speed: 0.6, size: 25 },
    saturn: { orbitRadius: 220, speed: 0.5, size: 22 },
    uranus: { orbitRadius: 260, speed: 0.4, size: 18 },
    neptune: { orbitRadius: 300, speed: 0.3, size: 17 }
};

function createSolarSystem() {
    const container = document.querySelector('.planets-orbit-container');
    if (!container) return;

    const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    
    planets.forEach((planet, index) => {
        // Create orbit
        const orbit = document.createElement('div');
        orbit.className = `orbit orbit-${index + 1}`;
        orbit.style.width = `${PLANET_CONFIG[planet].orbitRadius * 2}px`;
        orbit.style.height = `${PLANET_CONFIG[planet].orbitRadius * 2}px`;
        
        // Create planet
        const planetDiv = document.createElement('div');
        planetDiv.className = `planet ${planet}`;
        planetDiv.setAttribute('data-planet', planet);
        planetDiv.style.width = `${PLANET_CONFIG[planet].size}px`;
        planetDiv.style.height = `${PLANET_CONFIG[planet].size}px`;
        
        // Position planet initially on its orbit
        positionPlanetOnOrbit(planetDiv, PLANET_CONFIG[planet].orbitRadius, 0);
        
        orbit.appendChild(planetDiv);
        container.appendChild(orbit);
        
        // Add click event
        planetDiv.addEventListener('click', () => showPlanetInfo(planet));
        
        // Start orbital animation
        animatePlanet(planetDiv, PLANET_CONFIG[planet]);
    });
}

function positionPlanetOnOrbit(planetElement, radius, angle) {
    const rad = angle * (Math.PI / 180);
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    
    planetElement.style.transform = `translate(${x}px, ${y}px)`;
}

function animatePlanet(planetElement, config) {
    let angle = Math.random() * 360; // Random starting position
    
    function updatePosition() {
        positionPlanetOnOrbit(planetElement, config.orbitRadius, angle);
        
        // Reduced speed multiplier from 0.5 to 0.1 for slower movement
        angle = (angle + config.speed * 0.1) % 360;
        
        requestAnimationFrame(updatePosition);
    }
    
    updatePosition();
}

// Add required styles
function addOrbitStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .planets-orbit-container {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .orbit {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px dashed rgba(255, 255, 255, 0.2);
            border-radius: 50%;
        }
        .planet {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center center;
            cursor: pointer;
            transition: transform 0.1s linear;
        }
        .sun-container {
            z-index: 10;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addOrbitStyles();
    createSolarSystem();
});


function newSpaceWord() {
    const wordElement = getElement('space-word');
    const definitionElement = getElement('word-definition');
    if (!wordElement || !definitionElement) return;

    const randomWord = spaceWords[Math.floor(Math.random() * spaceWords.length)];
    wordElement.textContent = randomWord.word;
    definitionElement.textContent = randomWord.definition;
}

function createTimeline() {
    const timeline = getElement('timeline-content');
    if (!timeline) return;

    timelineEvents.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-event">${event.event}</div>
        `;
        timeline.appendChild(item);
    });
}
function createTimelineCarousel() {
    const timelineContent = document.getElementById('timeline-content');
    timelineContent.innerHTML = ""; // Clear existing content

    timelineEvents.forEach((event, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        itemDiv.innerHTML = `
            <h5>${event.year}</h5>
            <p>${event.event}</p>
        `;
        timelineContent.appendChild(itemDiv);
    });
}

// Call the function to create the timeline carousel when the document is ready
document.addEventListener("DOMContentLoaded", createTimelineCarousel);

function updateQA(index) {
    const qaContainer = getElement('qa-container');
    if (!qaContainer) return;

    const qa = astronautQA[index];
    qaContainer.innerHTML = `
        <div class="qa-card">
            <h3>${qa.question}</h3>
            <p>${qa.answer}</p>
        </div>
    `;
}

function createExperiments() {
    const container = getElement('experiment-container');
    if (!container) return;

    spaceExperiments.forEach(experiment => {
        const card = document.createElement('div');
        card.className = 'experiment-card';
        card.innerHTML = `
            <h3>${experiment.title}</h3>
            <div class="materials">
                <h4>Materials Needed:</h4>
                <ul>${experiment.materials.map(m => `<li>${m}</li>`).join('')}</ul>
            </div>
            <div class="steps">
                <h4>Steps:</h4>
                <ol>${experiment.steps.map(s => `<li>${s}</li>`).join('')}</ol>
            </div>
        `;
        container.appendChild(card);
    });
}

function createJobsGrid() {
    const grid = getElement('jobs-grid');
    if (!grid) return;

    spaceJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.description}</p>
        `;
        grid.appendChild(card);
    });
}


function showPlanetInfo(planet) {
    const info = planetFacts[planet] || [`This is ${planet}!`];
    const randomFact = info[Math.floor(Math.random() * info.length)];
    
    const modal = document.createElement('div');
    modal.className = 'planet-modal';
    modal.innerHTML = `
        <div class="planet-info">
            <h2>${planet.charAt(0).toUpperCase() + planet.slice(1)}</h2>
            <p>${randomFact}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function initPlanetColors() {
    const container = getElement('planet-colors');
    if (!container) return;

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
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    createSolarSystem();
    newSpaceWord();
    createTimeline();
    updateQA(0);
    createExperiments();
    createJobsGrid();

    initPlanetColors();

    // Set up first quiz question
    const quizQuestion = getElement('quiz-question');
    if (quizQuestion) {
        quizQuestion.textContent = quizQuestions[currentQuiz].question;
    }
    
    // Start automatic content cycling
    setInterval(newSpaceWord, 5000);
    
    let currentQA = 0;
    setInterval(() => {
        currentQA = (currentQA + 1) % astronautQA.length;
        updateQA(currentQA);
    }, 8000);

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add floating animation to planet cards
    document.querySelectorAll('.planet-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});