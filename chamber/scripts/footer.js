
(function () {
    const yearElement = document.querySelector("#yearjs");
    const lastModifiedElement = document.querySelector('#lastmodified');

    if (yearElement) {
        const today = new Date();
        yearElement.innerHTML = `<span class="highlight">${today.getFullYear()}© Dallas Chamber of Commerce </span>`;
    }

    if (lastModifiedElement) {
        const lastModified = document.lastModified;
        lastModifiedElement.textContent = `Last Modification: ${lastModified}`;
    }
})();