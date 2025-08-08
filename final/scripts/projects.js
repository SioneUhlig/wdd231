document.addEventListener('DOMContentLoaded', function () {
    loadProjectsContent();
    handleVisitorMessage();
});

async function loadProjectsContent() {
    const response = await fetch('data/projects.json');
    const data = await response.json();
    displayProjects(data.projects); 
}

function displayProjects(projects) {
    const container = document.getElementById('discover-container');
    container.innerHTML = '';

    projects.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const imageUrl = project.image ||
        `https://via.placeholder.com/300x200/4a90e2/ffffff?text=${encodeURIComponent(project.title)}`;

    const priceInfo = project.price ? `<p class="price"><strong>Price:</strong> ${project.price}</p>` : '';
    const timelineInfo = project.timeline ? `<p class="timeline"><strong>Timeline:</strong> ${project.timeline}</p>` : '';

    card.innerHTML = `
        <figure class="project-image">
            <img src="${imageUrl}" 
                 alt="${project.alt || project.title}" 
                 loading="lazy" 
                 width="300" 
                 height="200">
        </figure>
        <div class="project-info">
            <h2>${project.title}</h2>
            ${priceInfo}
            ${timelineInfo}
            <p>${project.description}</p>
            <button class="learn-more-btn" onclick="learnMore('${project.title}')">Show Interest</button>
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

function learnMore(projectTitle) {
    alert(`Thank you for your interest in the "${projectTitle}"! Contact us for more details.`);
}