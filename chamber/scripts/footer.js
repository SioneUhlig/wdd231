const year = document.querySelector("#yearjs");
const today = new Date();

year.innerHTML = `<span class="highlight">${today.getFullYear()} Dallas Chamber of Commerce </span>`;

const lastModified = document.lastModified;
document.querySelector('#lastmodified').textContent += lastModified;