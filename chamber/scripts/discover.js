document.addEventListener('DOMContentLoaded', function () {
    loadDiscoverContent();
    handleVisitorMessage();
});

async function loadDiscoverContent() {
    try {
        const response = await fetch('data/discover.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayLocations(data.locations);
    } catch (error) {
        console.error('Error loading discover content:', error);
        const container = document.getElementById('discover-container');
        container.innerHTML = '<p>Unable to load attractions. Please try again later.</p>';
    }
}

function displayLocations(locations) {
    const container = document.getElementById('discover-container');
    container.innerHTML = '';

    locations.forEach(location => {
        const card = createLocationCard(location);
        container.appendChild(card);
    });
}

function createLocationCard(location) {
    const card = document.createElement('div');
    card.className = 'location-card';

    const imageUrl = location.image || location.photo_url ||
        `https://via.placeholder.com/300x200/4a90e2/ffffff?text=${encodeURIComponent(location.name)}`;

    const costInfo = location.cost ? `<p class="cost"><strong>Cost:</strong> ${location.cost}</p>` : '';

    card.innerHTML = `
        <figure class="location-image">
            <img src="${imageUrl}" 
                 alt="${location.name}" 
                 loading="lazy" 
                 width="300" 
                 height="200">
        </figure>
        <div class="location-info">
            <h2>${location.name}</h2>
            <address>${location.address}</address>
            ${costInfo}
            <p>${location.description}</p>
            <button class="learn-more-btn" onclick="learnMore('${location.name}')">Learn More</button>
        </div>
    `;

    return card;
}

function handleVisitorMessage() {
    const messageElement = document.getElementById('visitor-message');
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    let message = '';

    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysDifference = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            message = 'Back so soon! Awesome!';
        } else if (daysDifference === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${daysDifference} days ago.`;
        }
    }

    messageElement.textContent = message;
    localStorage.setItem('lastVisit', now.toString());
}

function learnMore(locationName) {
    alert(`Thank you for your interest in ${locationName}! Contact the Dallas Chamber of Commerce for more information.`);
}