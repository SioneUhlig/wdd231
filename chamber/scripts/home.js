async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        const container = document.getElementById('spotlight-container');
        container.innerHTML = '<p>Unable to load member spotlights.</p>';
    }
}

function displaySpotlights(members) {
    const qualifiedMembers = members.filter(member =>
        member.membershipLevel === 2 || member.membershipLevel === 3
    );

    const selectedMembers = getRandomMembers(qualifiedMembers, 3);

    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    selectedMembers.forEach(member => {
        const spotlightCard = createSpotlightCard(member);
        container.appendChild(spotlightCard);
    });
}

function getRandomMembers(members, count) {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createSpotlightCard(member) {
    const card = document.createElement('div');
    card.className = 'spotlight-card';

    const badge = getMembershipBadge(member.membershipLevel);

    card.innerHTML = `
        <div class="spotlight-image">
            <img src="${member.image}" 
                 alt="${member.name}" 
                 width="300" 
                 height="200"
                 loading="lazy">
        </div>
        <div class="spotlight-info">
            <h3>${member.name}</h3>
            <p><em>${member.tagline}</em></p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Website</a></p>
            <div class="membership-level">${badge}</div>
        </div>
    `;

    return card;
}

function getMembershipBadge(level) {
    if (level === 3) {
        return '<span class="badge gold">Gold Member</span>';
    } else if (level === 2) {
        return '<span class="badge silver">Silver Member</span>';
    } else {
        return '<span class="badge member">Member</span>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadSpotlights();
});