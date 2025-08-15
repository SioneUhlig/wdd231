document.addEventListener('DOMContentLoaded', function () {
    populateOrderSummary();
});

function populateOrderSummary() {
    const urlParams = new URLSearchParams(window.location.search);
    const summaryGrid = document.getElementById('summary-grid');

    if (!summaryGrid) {
        console.error('Summary grid element not found');
        return;
    }

    summaryGrid.innerHTML = '';

    const formFields = {
        'user-name': 'Name',
        'user-email': 'Email Address',
        'user-phone': 'Phone Number',
        'project-type': 'Project Type',
        'budget': 'Budget Range',
        'timeline': 'Desired Timeline',
        'written_comment': 'Project Description'
    };

    let hasData = false;
    for (let key in formFields) {
        if (urlParams.get(key)) {
            hasData = true;
            break;
        }
    }

    if (!hasData) {
        summaryGrid.innerHTML = '<p>No order information found. Please <a href="contactus.html">submit a new request</a>.</p>';
        return;
    }

    for (let [fieldName, displayLabel] of Object.entries(formFields)) {
        const value = urlParams.get(fieldName);

        if (value && value.trim() !== '') {
            const summaryItem = createSummaryItem(displayLabel, formatFieldValue(fieldName, value));
            summaryGrid.appendChild(summaryItem);
        }
    }

    const timestamp = new Date().toLocaleString();
    const timestampItem = createSummaryItem('Submitted', timestamp);
    summaryGrid.appendChild(timestampItem);
}

function createSummaryItem(label, value) {
    const item = document.createElement('div');
    item.className = 'summary-item';

    const labelDiv = document.createElement('div');
    labelDiv.className = 'summary-label';
    labelDiv.textContent = label + ':';

    const valueDiv = document.createElement('div');
    valueDiv.className = 'summary-value';
    valueDiv.textContent = value;

    item.appendChild(labelDiv);
    item.appendChild(valueDiv);

    return item;
}

function formatFieldValue(fieldName, value) {
    switch (fieldName) {
        case 'project-type':
            return formatProjectType(value);
        case 'budget':
            return formatBudget(value);
        case 'timeline':
            return formatTimeline(value);
        default:
            return value;
    }
}

function formatProjectType(value) {
    const types = {
        'furniture': 'Custom Furniture',
        'kitchen': 'Kitchen Items',
        'storage': 'Storage Solutions',
        'decorative': 'Decorative Pieces',
        'repair': 'Repair/Restoration',
        'other': 'Other'
    };
    return types[value] || value;
}

function formatBudget(value) {
    const budgets = {
        'under-100': 'Under $100',
        '100-300': '$100 - $300',
        '300-500': '$300 - $500',
        '500-1000': '$500 - $1,000',
        '1000-2000': '$1,000 - $2,000',
        'over-2000': 'Over $2,000'
    };
    return budgets[value] || value;
}

function formatTimeline(value) {
    const timelines = {
        'asap': 'As soon as possible',
        '1-month': 'Within 1 month',
        '2-3-months': '2-3 months',
        '3-6-months': '3-6 months',
        'flexible': 'Flexible'
    };
    return timelines[value] || value;
}