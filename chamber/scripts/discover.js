document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, starting to load content...');
    loadDiscoverContent();
    handleVisitorMessage();
});

async function loadDiscoverContent() {
    console.log('Loading discover content...');
    try {
        const response = await fetch('data/discover.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data fetched successfully:', data);
        displayLocations(data.locations);

    } catch (error) {
        console.error('Error loading data:', error);
        const container = document.getElementById('discover-container');
        container.innerHTML = '<p class="error">Error loading attractions. Please check that the data/discover.json file exists and try again.</p>';
    }
}

function displayLocations(locations) {
    console.log('Displaying locations:', locations);
    const container = document.getElementById('discover-container');

    if (!container) {
        console.error('Container element not found!');
        return;
    }

    container.innerHTML = '';

    if (!locations || locations.length === 0) {
        container.innerHTML = '<p class="error">No locations found to display.</p>';
        return;
    }

    locations.forEach((location, index) => {
        console.log(`Creating card for location ${index + 1}:`, location.name);
        const card = createLocationCard(location);
        container.appendChild(card);

        card.style.animationDelay = `${index * 0.1}s`;
    });

    console.log('All cards added to container');
}

function createLocationCard(location) {
    const card = document.createElement('div');
    card.className = 'location-card';

    let imageUrl = location.image || location.photo_url;

    if (location.image && !location.image.startsWith('http')) {
        imageUrl = location.image.startsWith('images/') ? location.image : `images/${location.image}`;
    }
    if (!imageUrl) {
        imageUrl = `https://via.placeholder.com/300x200/4a90e2/ffffff?text=${encodeURIComponent(location.name)}`;
    }

    const costInfo = location.cost ? `<p class="cost"><strong>Cost:</strong> ${location.cost}</p>` : '';

    card.innerHTML = `
        <figure class="location-image">
            <img src="${imageUrl}" 
                 alt="${location.name}" 
                 loading="lazy" 
                 width="300" 
                 height="200"
                 onload="console.log('Image loaded successfully:', '${location.name}')"
                 onerror="handleImageError(this, '${location.name}')">
        </figure>
        <div class="location-info">
            <h2>${location.name}</h2>
            <address>${location.address}</address>
            ${costInfo}
            <p>${location.description}</p>
            <button class="learn-more-btn" onclick="learnMore('${location.name.replace(/'/g, "\\'")}')">Learn More</button>
        </div>
    `;

    return card;
}

function handleImageError(img, locationName) {
    console.warn(`Image failed to load for: ${locationName}`);
    console.warn(`Failed URL: ${img.src}`);

    const location = img.closest('.location-card');
    const originalSrc = img.src;

    if (!originalSrc.includes('placeholder')) {
        img.src = `https://via.placeholder.com/300x200/4a90e2/ffffff?text=${encodeURIComponent(locationName)}`;
    } else {
        img.style.display = 'none';
        img.parentElement.style.background = 'linear-gradient(45deg, #4a90e2, #63b3ed)';
        img.parentElement.innerHTML = `<div style="color: white; font-weight: bold; font-size: 1.2rem;">${locationName}</div>`;
    }
}

function handleVisitorMessage() {
    const messageElement = document.getElementById('visitor-message');

    if (!messageElement) {
        console.error('Visitor message element not found!');
        return;
    }

    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');

    let message = '';

    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (timeDifference < (1000 * 60 * 60 * 24)) {
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