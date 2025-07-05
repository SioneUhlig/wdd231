const year = document.querySelector("#yearjs");
const today = new Date();

year.innerHTML = `<span class="highlight">${today.getFullYear()} • Sione Uhlig • Texas, USA </span>`;

const lastModified = document.lastModified;
document.querySelector('#lastmodified').textContent += lastModified;