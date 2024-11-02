// Planets data
const planets = [
    { name: "Mercury", image: "./public/img/mercury.jpg", description: "Mercury is the smallest planet in our solar system and closest to the Sun." },
    { name: "Venus", image: "./public/img/venus.jpg", description: "Venus is often called Earth's twin because of their similar size and mass." },
    { name: "Earth", image: "./public/img/earth.webp", description: "Earth is the only planet known to harbor life and is our home in the vast universe." },
    { name: "Mars", image: "./public/img/mars.jpg", description: "Mars is known as the Red Planet due to its reddish appearance." },
    { name: "Jupiter", image: "./public/img/jupiter.webp", description: "Jupiter is the largest planet in our solar system and has a Great Red Spot." },
    { name: "Saturn", image: "./public/img/saturn.jpg", description: "Saturn is known for its beautiful ring system, which is visible from Earth." },
    { name: "Uranus", image: "./public/img/uranus.png", description: "Uranus is an ice giant and the third-largest planet in our solar system." },
    { name: "Neptune", image: "./public/img/neptune.png", description: "Neptune is the windiest planet in our solar system and has a Great Dark Spot." }
];

// Dynamically create planet cards
function createPlanetCard(planet) {
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4';
    col.innerHTML = `
        <div class="planet-card" data-planet="${planet.name}">
            <img src="${planet.image}" alt="${planet.name}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${planet.name}</h5>
            </div>
        </div>
    `;
    return col;
}

function populatePlanets() {
    const container = document.getElementById('planetContainer');
    planets.forEach(planet => {
        container.appendChild(createPlanetCard(planet));
    });
}

// Display planet details in the modal
function showPlanetDetails(planet) {
    const modal = new bootstrap.Modal(document.getElementById('planetModal'));
    document.getElementById('planetModalLabel').textContent = planet.name;
    document.getElementById('modalImage').src = planet.image;
    document.getElementById('planetDescription').textContent = planet.description;
    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    const planetContainer = document.getElementById('planetContainer');
    if (planetContainer) {
        populatePlanets();
        
        planetContainer.addEventListener('click', (e) => {
            const planetCard = e.target.closest('.planet-card');
            if (planetCard) {
                const planetName = planetCard.dataset.planet;
                const planet = planets.find(p => p.name === planetName);
                showPlanetDetails(planet);
            }
        });
    }
});

// Check quiz answer
function checkAnswer(answer) {
    const feedback = document.getElementById('quiz-feedback');
    if (answer === 2) {
        feedback.textContent = "Correct! Mars is the Red Planet.";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Try Again! Mars is the Red Planet.";
        feedback.style.color = "red";
    }
}

// Wiki facts categories
const wikiFacts = {
    stars: [
        "🌟 Stars are giant balls of hot gases, primarily hydrogen and helium!",
        "🌟 Our Sun is a star, and it's the closest one to Earth.",
        "🌟 There are estimated to be over 100 billion stars in our galaxy alone!"
    ],
    blackholes: [
        "🕳️ A black hole is a region of space where gravity is so strong that nothing, not even light, can escape from it!",
        "🕳️ Black holes are formed when massive stars collapse at the end of their life cycle.",
        "🕳️ The largest black holes are called 'supermassive black holes' and are found at the centers of most galaxies."
    ],
    astronauts: [
        "👨‍🚀 The first person to travel to space was Yuri Gagarin in 1961.",
        "👨‍🚀 Neil Armstrong was the first person to walk on the Moon in 1969.",
        "👨‍🚀 Astronauts wear special spacesuits that provide oxygen, regulate temperature, and protect them from radiation."
    ],
    galaxies: [
        "🌌 A galaxy is a huge collection of gas, dust, and billions of stars and their solar systems.",
        "🌌 The Milky Way is the galaxy that contains our Solar System.",
        "🌌 There are more galaxies in the universe than there are grains of sand on all the beaches on Earth!"
    ]
};

// Display facts for the selected category
function showWikiCategory(category) {
    const contentElement = document.getElementById('wiki-content');
    const facts = wikiFacts[category];
    const factHtml = facts.map(fact => `<p>${fact}</p>`).join('');
    contentElement.innerHTML = factHtml;
}

// Planet facts for carousel
const planetFacts = { 
    mercury: [ 
        "🌑 Mercury is the smallest planet in our Solar System!", 
        "🌑 A day on Mercury lasts 59 Earth days!", 
        "🌑 Mercury has no moons or rings!"
    ], 
    venus: [ 
        "🌕 Venus is the hottest planet in the Solar System!", 
        "🌕 A day on Venus is longer than a year on Venus!", 
        "🌕 Venus rotates in the opposite direction to most planets!"
    ], 
    earth: [ 
        "🌍 Earth is the only planet known to support life!", 
        "🌍 About 71% of Earth's surface is covered by water!", 
        "🌍 Earth's atmosphere protects us from meteoroids and harmful solar radiation!"
    ], 
    mars: [ 
        "🪐 Mars is often called the 'Red Planet' due to its reddish appearance!", 
        "🪐 Mars has the largest volcano in the Solar System—Olympus Mons!", 
        "🪐 Mars has two small moons, Phobos and Deimos!"
    ], 
    jupiter: [ 
        "🪐 Jupiter is the largest planet in our Solar System!", 
        "🪐 Jupiter has 79 known moons, the most of any planet!", 
        "🪐 The Great Red Spot on Jupiter is a giant storm that has lasted for hundreds of years!"
    ], 
    saturn: [ 
        "🪐 Saturn is famous for its stunning ring system!", 
        "🪐 Saturn has more than 80 moons, with Titan being the largest!", 
        "🪐 Saturn is the least dense planet—it would float in water if there were a bathtub big enough!"
    ], 
    uranus: [ 
        "🪐 Uranus rotates on its side, making it unique in the Solar System!", 
        "🪐 Uranus has a faint ring system!", 
        "🪐 Uranus is the coldest planet, with temperatures as low as -224°C!"
    ], 
    neptune: [ 
        "🪐 Neptune is the windiest planet in the Solar System!", 
        "🪐 A year on Neptune lasts 165 Earth years!", 
        "🪐 Neptune has 14 known moons, with Triton being the largest!"
    ]
};

// Carousel for interactive planet facts
let currentCategory = 'earth'; // Default category
let currentFactIndex = 0; // Start with the first fact

function nextFact() {
    const factText = document.querySelector('.fact-card p');
    const categoryFacts = planetFacts[currentCategory];
    currentFactIndex = (currentFactIndex + 1) % categoryFacts.length;
    factText.textContent = categoryFacts[currentFactIndex];
}

// Change fact category
function changeCategory(newCategory) {
    currentCategory = newCategory;
    currentFactIndex = 0; // Reset fact index
    nextFact(); // Display the first fact from the new category
}

// Initialize facts carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    nextFact();
});
