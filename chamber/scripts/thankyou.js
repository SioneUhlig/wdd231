const params = new URLSearchParams(window.location.search);

// Get the summary grid element
const summaryGrid = document.getElementById('summary-grid');

// Get the required form data
const firstName = params.get('firstName') || 'Not provided';
const lastName = params.get('lastName') || 'Not provided';
const email = params.get('email') || 'Not provided';
const phone = params.get('phone') || 'Not provided';
const organization = params.get('organization') || 'Not provided';
const timestamp = params.get('timestamp') || 'Not available';

// Display the data
summaryGrid.innerHTML = `
    <div class="summary-item">
        <div class="summary-label">First Name:</div>
        <div class="summary-value">${firstName}</div>
    </div>
    <div class="summary-item">
        <div class="summary-label">Last Name:</div>
        <div class="summary-value">${lastName}</div>
    </div>
    <div class="summary-item">
        <div class="summary-label">Email Address:</div>
        <div class="summary-value">${email}</div>
    </div>
    <div class="summary-item">
        <div class="summary-label">Phone Number:</div>
        <div class="summary-value">${phone}</div>
    </div>
    <div class="summary-item">
        <div class="summary-label">Organization:</div>
        <div class="summary-value">${organization}</div>
    </div>
    <div class="summary-item">
        <div class="summary-label">Application Submitted:</div>
        <div class="summary-value">${new Date(timestamp).toLocaleString()}</div>
    </div>
`;