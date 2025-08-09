// Replace your existing projects.js file with this updated version

document.addEventListener('DOMContentLoaded', function () {
    loadProjectsContent();
    handleVisitorMessage();
    initializeModal();
});

let projectsData = [];

async function loadProjectsContent() {
    const response = await fetch('data/projects.json');
    const data = await response.json();
    projectsData = data.projects; // Store for modal use
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
    card.className = 'card';

    const imageUrl = project.image ||
        `https://via.placeholder.com/300x200/4a90e2/ffffff?text=${encodeURIComponent(project.title)}`;

    const priceInfo = project.price ? `<p class="price"><strong>Price:</strong> ${project.price}</p>` : '';
    const timelineInfo = project.timeline ? `<p class="timeline"><strong>Timeline:</strong> ${project.timeline}</p>` : '';

    card.innerHTML = `
        <figure class="card-image">
            <img src="${imageUrl}" 
                 alt="${project.alt || project.title}" 
                 loading="lazy" 
                 width="300" 
                 height="200">
        </figure>
        <div class="card-content">
            <h2>${project.title}</h2>
            ${priceInfo}
            ${timelineInfo}
            <p>${project.description}</p>
            <button class="btn-primary" onclick="learnMore('${project.title}')">Show Interest</button>
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

// Updated learnMore function to show modal
function learnMore(projectTitle) {
    const project = projectsData.find(p => p.title === projectTitle);
    if (project) {
        // Populate modal
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalImage').alt = project.alt || project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalPrice').textContent = `Price: ${project.price}`;
        document.getElementById('modalTimeline').textContent = `Timeline: ${project.timeline}`;

        // Show modal
        document.getElementById('projectModal').style.display = 'block';
    }
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.onclick = function () {
            modal.style.display = 'none';
        }
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}