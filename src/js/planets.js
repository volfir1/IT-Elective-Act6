const planets = [
    {
        name: "Mercury",
        image: "../../public/img/mercury.jpg",
        description: "Mercury is the smallest planet in our solar system and closest to the Sun.",
        additionalInfo: "Mercury is very hot during the day but super cold at night. This is because it doesn't have much air to keep it warm like a blanket. Mercury has no moons and no rings. It's covered in craters, like our Moon!"
    },
    {
        name: "Venus",
        image: "../../public/img/venus.jpg",
        description: "Venus is often called Earth's twin because of their similar size and mass.",
        additionalInfo: "Venus has thick clouds that trap heat. It's hotter than any other planet, even Mercury, which is closer to the Sun! Venus's day is longer than its year, which means it spins very slowly. Venus spins backward compared to most planets, and it has no moons or rings."
    },
    {
        name: "Earth",
        image: "../../public/img/earth.webp",
        description: "Earth is the only planet known to harbor life and is our home in the vast universe.",
        additionalInfo: "Our Earth is very special because it has water in liquid form and air which are essential for life as we know it. It's the perfect place for plants, animals, and humans to live. Earth has one moon, which helps control our oceans' tides. It's the only planet not named after a god or goddess!"
    },
    {
        name: "Mars",
        image: "../../public/img/mars.jpg",
        description: "Mars is known as the Red Planet due to its reddish appearance.",
        additionalInfo: "Mars is red because it has lots of iron rust, just like rusty metal turns red. Mars has mountains and valleys, and it might have had water a long time ago. It has two small, potato-shaped moons called Phobos and Deimos. Mars also has the largest volcano in the solar system, called Olympus Mons!"
    },
    {
        name: "Jupiter",
        image: "../../public/img/jupiter.webp",
        description: "Jupiter is the largest planet in our solar system and has a Great Red Spot.",
        additionalInfo: "Jupiter is so big that you could fit all the other planets inside it! The Great Red Spot is actually a huge storm, bigger than the entire Earth, and it's been going for hundreds of years. Jupiter has at least 79 moons! The four largest are called the Galilean moons: Io, Europa, Ganymede, and Callisto."
    },
    {
        name: "Saturn",
        image: "../../public/img/saturn.jpg",
        description: "Saturn is known for its beautiful ring system, which is visible from Earth.",
        additionalInfo: "Saturn's rings are made of ice and rock. They are very thin and wide. Saturn is very light; if there were a bathtub big enough, Saturn would float! It has 82 known moons, with the largest one called Titan. Titan is bigger than the planet Mercury and has its own atmosphere!"
    },
    {
        name: "Uranus",
        image: "../../public/img/uranus.png",
        description: "Uranus is an ice giant and the third-largest planet in our solar system.",
        additionalInfo: "Uranus is tipped over on its side, so it rolls around the Sun like a ball. It's very cold and has a blue-green color because of the methane gas in its atmosphere. Uranus has 27 known moons, all named after characters from the works of William Shakespeare and Alexander Pope. It also has faint rings!"
    },
    {
        name: "Neptune",
        image: "../../public/img/neptune.png",
        description: "Neptune is the windiest planet in our solar system and has a Great Dark Spot.",
        additionalInfo: "Neptune is very far from the Sun, which makes it one of the coldest planets. Its strong winds are the fastest in the solar system, and the Great Dark Spot is a giant storm, kind of like Jupiter's Great Red Spot. Neptune has 14 known moons, with the largest one called Triton. Triton is special because it orbits Neptune backwards!"
    }
];
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

function showPlanetDetails(planet) {
    const modal = new bootstrap.Modal(document.getElementById('planetModal'));
    document.getElementById('planetModalLabel').textContent = planet.name;
    document.getElementById('modalImage').src = planet.image;
    document.getElementById('planetDescription').textContent = planet.description;
    document.getElementById('additionalInfo').textContent = planet.additionalInfo;
    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    populatePlanets();
    
    document.getElementById('planetContainer').addEventListener('click', (e) => {
        const planetCard = e.target.closest('.planet-card');
        if (planetCard) {
            const planetName = planetCard.dataset.planet;
            const planet = planets.find(p => p.name === planetName);
            showPlanetDetails(planet);
        }
    });
});