const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');
const totalCreditsSpan = document.getElementById('total-credits');
const courseModal = document.getElementById('courseModal');
const modalContent = document.getElementById('modalContent');

const courses = [
    {
        subject: "WDD",
        number: "130",
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to the World Wide Web and to careers in web site design and development.",
        technology: ["HTML", "CSS"]
    },
    {
        subject: "WDD",
        number: "131",
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course builds on prior experience in Web Fundamentals and programming.",
        technology: ["HTML", "CSS", "JavaScript"]
    },
    {
        subject: "WDD",
        number: "231",
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course focuses on user experience, accessibility, compliance, and performance optimization.",
        technology: ["HTML", "CSS", "JavaScript"]
    },
    {
        subject: "CSE",
        number: "110",
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce students to programming and basic programming concepts.",
        technology: ["Python"]
    },
    {
        subject: "CSE",
        number: "111",
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students learn to write, call, debug, and test their own functions.",
        technology: ["Python"]
    },
    {
        subject: "CSE",
        number: "210",
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces the notion of classes and objects.",
        technology: ["C#"]
    }
];

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});


filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        let visibleCredits = 0;

        courseCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const credits = parseInt(card.getAttribute('data-credits'));

            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                visibleCredits += credits;
            } else {
                card.style.display = 'none';
            }
        });

        totalCreditsSpan.textContent = visibleCredits;
    });
});

function displayCourseDetails(course) {
    modalContent.innerHTML = `
        <button id="closeModal">X</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseModal.showModal();

    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener("click", () => {
        courseModal.close();
    });
}

courseCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        displayCourseDetails(courses[index]);
    });
});

courseModal.addEventListener('click', (e) => {
    if (e.target === courseModal) {
        courseModal.close();
    }
});