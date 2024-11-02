let totalScore = 0;

// Memory Game Variables
const memoryEmojis = ['🚀', '🛸', '🌎', '🌟', '🌙', '☄️', '👽', '🪐'];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;

// Quiz Game Variables
const spaceQuestions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the name of our galaxy?",
        options: ["Andromeda", "Milky Way", "Black Eye", "Sombrero"],
        correct: 1
    },
    {
        question: "Which planet has the most moons?",
        options: ["Earth", "Mars", "Saturn", "Jupiter"],
        correct: 3
    },
    {
        question: "What is the largest planet in the solar system?",
        options: ["Mars", "Earth", "Jupiter", "Venus"],
        correct: 2
    },
    {
        question: "How long does it take for the Earth to orbit the Sun?",
        options: ["365 days", "100 days", "24 hours", "30 days"],
        correct: 0
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mars", "Mercury", "Earth"],
        correct: 2
    },
    {
        question: "What is the name of Earth's natural satellite?",
        options: ["Sun", "Moon", "Mars", "Star"],
        correct: 1
    },
    {
        question: "Which planet is known for its beautiful rings?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correct: 1
    },
    {
        question: "What is the hottest planet in our solar system?",
        options: ["Mars", "Mercury", "Venus", "Jupiter"],
        correct: 2
    },
    {
        question: "Which planet is known as the Blue Planet?",
        options: ["Earth", "Neptune", "Uranus", "Mars"],
        correct: 0
    },
    {
        question: "What is the name of the force that pulls objects towards Earth?",
        options: ["Magnetism", "Electricity", "Gravity", "Wind"],
        correct: 2
    },
    {
        question: "Which of these is NOT a planet in our solar system?",
        options: ["Neptune", "Pluto", "Saturn", "Venus"],
        correct: 1
    },
    {
        question: "What do we call a rock from space that enters Earth's atmosphere?",
        options: ["Comet", "Meteor", "Asteroid", "Planet"],
        correct: 1
    },
    {
        question: "Which planet is known as the Ice Giant?",
        options: ["Neptune", "Jupiter", "Mars", "Mercury"],
        correct: 0
    },
    {
        question: "What is the center of our solar system?",
        options: ["Earth", "Moon", "Sun", "Mars"],
        correct: 2
    }
];


let currentQuestion = 0;
let quizScore = 0;

// Initialize games
document.addEventListener('DOMContentLoaded', () => {
    // Add click listeners to game buttons
    document.querySelectorAll('.play-btn').forEach(button => {
        button.addEventListener('click', () => {
            const game = button.dataset.game;
            startGame(game);
        });
    });
});

function startGame(game) {
    switch (game) {
        case 'memory':
            initMemoryGame();
            new bootstrap.Modal(document.getElementById('memoryGameModal')).show();
            break;
        case 'quiz':
            initQuizGame();
            new bootstrap.Modal(document.getElementById('quizGameModal')).show();
            break;
        case 'asteroid':
            initAsteroidGame();
            new bootstrap.Modal(document.getElementById('asteroidGameModal')).show();
            break;
    }
}




let isPlayerTurn = true;  // True if it's the player's turn, false for AI
let playerScore = 0;
let aiScore = 0;
let aiMemory = {};  // AI will remember previous card flips
const totalPairs = memoryEmojis.length;  // Total pairs of cards in the game

// Initialize the memory game
function initMemoryGame() {
    const gameBoard = document.getElementById('memoryGameBoard');
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    attempts = 0;
    flippedCards = [];
    playerScore = 0;
    aiScore = 0;
    aiMemory = {};  // Reset AI memory
    isPlayerTurn = true;  // Set it to player's turn at the start of the game

    // Create cards array with pairs
    const cards = [...memoryEmojis, ...memoryEmojis];
    shuffleArray(cards);

    // Create and append cards to the board
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.card = emoji;
        card.dataset.index = index;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });

    updateMemoryStats();
}

// Handle player card clicks
function handleCardClick(event) {
    if (!isPlayerTurn || flippedCards.length === 2) return;  // Block AI turn or if two cards are already flipped
    const clickedCard = event.target;

    if (clickedCard.classList.contains('flipped')) return;  // Don't flip the same card twice

    flipCard(clickedCard);

    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Flip a card to reveal the emoji
function flipCard(card) {
    card.classList.add('flipped');
    card.innerHTML = card.dataset.card;  // Show the emoji
}

// Unflip a pair of non-matching cards
function unflipCards() {
    flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.innerHTML = '';  // Hide the emoji
    });
    flippedCards = [];
}

// Check if the two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.card === card2.dataset.card) {
        matchedPairs++;
        updateScores(true);  // Update the score for the current player (player or AI)
        flippedCards = [];

        if (isPlayerTurn) {
            checkForWin();
        } else {
            // AI scored, now the player takes their turn
            isPlayerTurn = true;
        }

    } else {
        setTimeout(() => {
            unflipCards();
            updateScores(false);

            if (isPlayerTurn) {
                // Switch to AI turn after player's turn
                isPlayerTurn = false;
                aiTurn();
            } else {
                // After AI turn, switch back to the player
                isPlayerTurn = true;
            }
        }, 1000);  // Give the player time to see the cards before they are unflipped
    }
}

// Update scores after a match or mismatch
function updateScores(matched) {
    if (isPlayerTurn) {
        if (matched) {
            playerScore++;
        }
    } else {
        if (matched) {
            aiScore++;
        }
    }
    updateMemoryStats();
}

// Check if the game has been won
function checkForWin() {
    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            alert(`Game over! Player Score: ${playerScore}, AI Score: ${aiScore}`);
        }, 500);
    }
}

// Update the game stats displayed to the player
function updateMemoryStats() {
    const statsElement = document.getElementById('memoryGameStats');
    statsElement.innerHTML = `Player Score: ${playerScore}, AI Score: ${aiScore}, Attempts: ${attempts}`;
}

// AI turn logic
function aiTurn() {
    // Delay AI moves slightly for more realistic behavior
    setTimeout(() => {
        let flippedCard1, flippedCard2;

        // Check if AI remembers a match
        for (let emoji in aiMemory) {
            if (aiMemory[emoji].length === 2) {
                [flippedCard1, flippedCard2] = aiMemory[emoji].map(index => document.querySelector(`[data-index='${index}']`));
                break;
            }
        }

        // If no match is remembered, pick two random cards
        if (!flippedCard1 || !flippedCard2) {
            const unflippedCards = Array.from(document.querySelectorAll('.memory-card:not(.flipped)'));
            flippedCard1 = unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
            unflippedCards.splice(unflippedCards.indexOf(flippedCard1), 1);
            flippedCard2 = unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
        }

        flipCard(flippedCard1);
        flipCard(flippedCard2);
        flippedCards.push(flippedCard1, flippedCard2);

        setTimeout(() => {
            checkForMatch();  // Check if the AI found a match
        }, 1000);
    }, 1000);
}

// Shuffle the array of cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}




function initQuizGame() {
    currentQuestion = 0;
    quizScore = 0;
    loadQuizQuestion();
}


function loadQuizQuestion() {
    if (currentQuestion < spaceQuestions.length) {
        const quizContent = document.getElementById('quizContent');
        const questionObj = spaceQuestions[currentQuestion];
        quizContent.innerHTML = `
            <p>${questionObj.question}</p>
            ${questionObj.options.map((option, index) => `
                <button class="btn btn-primary mb-2" onclick="checkQuizAnswer(${index})">${option}</button>
            `).join('')}
        `;
        document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    } else {
        // Quiz over
        document.getElementById('quizContent').innerHTML = `
            <p>Quiz completed! Your score: ${quizScore}/${spaceQuestions.length}</p>
            <button class="btn btn-success" onclick="initQuizGame()">Play Again</button>
        `;
    }
}

function checkQuizAnswer(selected) {
    const questionObj = spaceQuestions[currentQuestion];
    if (selected === questionObj.correct) {
        quizScore++;
    }
    currentQuestion++;
    loadQuizQuestion();
}



//Space shooter
let asteroidCanvas, asteroidCtx;
let ship, asteroids, beams = [];
let asteroidScore = 0;
let asteroidGameLoop;
let playerImage, enemyImage, bgImage, beamImage;
let imagesLoaded = 0;  // Counter for loaded images
let keysPressed = {};  // To keep track of multiple keys pressed
let beamSpeed = 10;

// Function to reinitialize everything when the modal is opened
function initAsteroidGame() {
    const gameModal = document.getElementById('asteroidGameModal');

    // Reset canvas when modal is opened again
    gameModal.querySelector('.modal-body').innerHTML = '<canvas id="asteroidCanvas" width="400" height="400"></canvas>';

    asteroidCanvas = document.getElementById('asteroidCanvas');
    asteroidCtx = asteroidCanvas.getContext('2d');

    // Reload images if needed
    if (!playerImage || !enemyImage || !bgImage || !beamImage) {
        loadGameAssets();  // Load the images only if they haven't been loaded before
    } else {
        startAsteroidGame();  // Start the game immediately if images are already loaded
    }
}



// Function to load the player, enemy, background, and beam images
function loadGameAssets() {
    // Reset the imagesLoaded counter
    imagesLoaded = 0;

    playerImage = new Image();  // Create new Image object for the player
    enemyImage = new Image();   // Create new Image object for the enemy
    bgImage = new Image();      // Create new Image object for the background
    beamImage = new Image();    // Create new Image object for the beam

    playerImage.src = '../../public/games/space-ship.png';  // Path to player image
    enemyImage.src = '../../public/games/asteroid.png';     // Path to enemy image
    bgImage.src = '../../public/games/space.jpg';        // Path to background image
    beamImage.src = '../../public/games/bullet.png';          // Path to beam image

    // Set image loading event listeners
    playerImage.onload = () => checkImagesLoaded();
    enemyImage.onload = () => checkImagesLoaded();
    bgImage.onload = () => checkImagesLoaded();
    beamImage.onload = () => checkImagesLoaded();  // Beam image loader
}

// Function to check if all images are loaded
function checkImagesLoaded() {
    imagesLoaded++;
    // When all four images are loaded, start the game
    if (imagesLoaded === 4) {
        startAsteroidGame();
    }
}

function startAsteroidGame() {
    ship = {
        x: asteroidCanvas.width / 2 - 20,
        y: asteroidCanvas.height - 50,  // Start 50px above the bottom
        width: 40,  // Adjust width based on your image size
        height: 40,
        speed: 5
    };

    asteroids = [];
    beams = [];
    asteroidScore = 0;
    keysPressed = {};  // Reset keysPressed object

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Clear any existing game loop before starting a new one
    if (asteroidGameLoop) clearInterval(asteroidGameLoop);

    asteroidGameLoop = setInterval(updateAsteroidGame, 20);
}

// Handle key press events
function handleKeyDown(e) {
    keysPressed[e.key] = true;

    if (e.key === ' ') {
        fireBeam();  // Fire a beam when spacebar is pressed
    }
}

// Handle key release events
function handleKeyUp(e) {
    keysPressed[e.key] = false;
}

// Function to move the ship
function moveShip() {
    if ((keysPressed['ArrowLeft'] || keysPressed['a']) && ship.x > 0) {
        ship.x -= ship.speed;
    }
    if ((keysPressed['ArrowRight'] || keysPressed['d']) && ship.x < asteroidCanvas.width - ship.width) {
        ship.x += ship.speed;
    }
    if ((keysPressed['ArrowUp'] || keysPressed['w']) && ship.y > 0) {
        ship.y -= ship.speed;
    }
    if ((keysPressed['ArrowDown'] || keysPressed['s']) && ship.y < asteroidCanvas.height - ship.height) {
        ship.y += ship.speed;
    }
}

// Function to fire a beam
function fireBeam() {
    beams.push({
        x: ship.x + ship.width / 2 - 5,  // Center the beam on the ship
        y: ship.y,
        width: 40,   // Adjust width of the beam
        height: 40,  // Adjust height of the beam
        speed: beamSpeed
    });
}

function updateAsteroidGame() {
    asteroidCtx.clearRect(0, 0, asteroidCanvas.width, asteroidCanvas.height);

    // Move the ship based on the keys pressed
    moveShip();

    // Draw the background image
    asteroidCtx.drawImage(bgImage, 0, 0, asteroidCanvas.width, asteroidCanvas.height);

    // Draw the player image
    asteroidCtx.drawImage(playerImage, ship.x, ship.y, ship.width, ship.height);

    // Create new asteroids (enemies)
    if (Math.random() < 0.02) {
        asteroids.push({
            x: Math.random() * (asteroidCanvas.width - 40),
            y: 0,
            width: 40,  // Adjust width based on the enemy icon size
            height: 40,
            speed: 2 + Math.random() * 3
        });
    }

    // Update and draw beams
    beams.forEach((beam, index) => {
        beam.y -= beam.speed;
        asteroidCtx.drawImage(beamImage, beam.x, beam.y, beam.width, beam.height);

        // Remove beam if it goes off-screen
        if (beam.y < 0) {
            beams.splice(index, 1);
        }
    });

    // Update and draw asteroids
    asteroids.forEach((asteroid, asteroidIndex) => {
        asteroid.y += asteroid.speed;

        // Draw the enemy (asteroid) image
        asteroidCtx.drawImage(enemyImage, asteroid.x, asteroid.y, asteroid.width, asteroid.height);

        // Check for collision with the player
        if (
            ship.x < asteroid.x + asteroid.width &&
            ship.x + ship.width > asteroid.x &&
            ship.y < asteroid.y + asteroid.height &&
            ship.y + ship.height > asteroid.y
        ) {
            endAsteroidGame();
        }

        // Check for collision with beams
        beams.forEach((beam, beamIndex) => {
            if (
                beam.x < asteroid.x + asteroid.width &&
                beam.x + beam.width > asteroid.x &&
                beam.y < asteroid.y + asteroid.height &&
                beam.y + beam.height > asteroid.y
            ) {
                asteroids.splice(asteroidIndex, 1);  // Remove asteroid on collision
                beams.splice(beamIndex, 1);          // Remove beam on collision
                asteroidScore++;
            }
        });

        // Remove asteroids that are off-screen
        if (asteroid.y > asteroidCanvas.height) {
            asteroids.splice(asteroidIndex, 1);
            asteroidScore++;
        }
    });

    // Display score
    asteroidCtx.fillStyle = 'white';
    asteroidCtx.font = '16px Arial';
    asteroidCtx.fillText(`Score: ${asteroidScore}`, 10, 20);
}

function endAsteroidGame() {
    clearInterval(asteroidGameLoop);
    alert(`Game Over! Your score: ${asteroidScore}`);
    totalScore += asteroidScore;  // Add to total score
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
}

// Event listener to reset the game when the modal is opened again
document.getElementById('asteroidGameModal').addEventListener('show.bs.modal', () => {
    initAsteroidGame();  // Reinitialize the game when the modal opens
});
