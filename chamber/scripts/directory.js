const memberDirectory = document.getElementById('member-directory');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');

gridViewBtn.addEventListener('click', showGridView);
listViewBtn.addEventListener('click', showListView);

function showGridView() {
    memberDirectory.className = 'member-grid';
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
}

function showListView() {
    memberDirectory.className = 'member-list';
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
}

async function loadMembers() {
    try {
        memberDirectory.innerHTML = '<p class="loading">Loading member directory...</p>';

        const response = await fetch('data/members.json');
        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error('Error loading members:', error);
        memberDirectory.innerHTML = '<p>Unable to load member directory. Please try again later.</p>';
    }
}

function displayMembers(members) {
    memberDirectory.innerHTML = '';

    members.forEach(member => {
        const memberCard = createMemberCard(member);
        memberDirectory.appendChild(memberCard);
    });
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';

    const badge = getMembershipBadge(member.membershipLevel);

    card.innerHTML = `
        <div class="member-image">
            <img src="${member.image}" alt="${member.name}" 
                 onerror="this.style.display='none'">
        </div>
        <div class="member-info">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
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

document.addEventListener('DOMContentLoaded', loadMembers);
