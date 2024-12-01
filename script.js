document.addEventListener("DOMContentLoaded", function () {
    displayVisitorNumber(); // Call function to display the visitor number after DOM is ready
});

// Initialize Visitor Count from localStorage
let visitorCount = localStorage.getItem('visitorCount');
if (!visitorCount) {
    visitorCount = 0; // Initialize if not set
}

// Increment Visitor Count
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);

// Populate Visitor Count in the hidden input field
document.getElementById('visitorCount').value = visitorCount;

// Function to display confirmation box when the form is successfully submitted
function showConfirmationMessage() {
    document.getElementById('confirmationBox').style.display = 'flex';
}

// Check if the URL contains `#confirmationBox` to show the confirmation message
window.onload = function () {
    // If the URL has the hash "#confirmationBox", show the confirmation box
    if (window.location.hash === '#confirmationBox') {
        showConfirmationMessage();
    }
}

// Handle closing of confirmation box
const closeBtn = document.getElementById('closeBtn');
if (closeBtn) {
    closeBtn.addEventListener('click', function () {
        document.getElementById('confirmationBox').style.display = 'none';
        window.location.assign("https://omprakas.me");
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.category-btn');
    const certificationCards = document.querySelectorAll('.certification-card');
    const categoryColors = {
        all: 'red',       // Pink for All button
        cs: '#0bdeb4c2',        // Bright Red-Orange for Computer Science
        ds: '#93C5FD',        // Muted Purple for Data Science
        da: '#83f988',        // Green for Data Analytics
        se: '#AAF0D1'         // Bright Blue for Software Engineering
    };

    // Text colors corresponding to each category
    const categoryTextColors = {
        all: '#ffffff',       // White text color for All button
        cs: '#ffffff',        // White text color for CS button
        ds: '#ffffff',        // White text color for DS button
        da: '#ffffff',        // White text color for DA button
        se: '#ffffff'         // White text color for SE button
    };

    const categoryHoverTextColors = {
        all: '#ffffff',       // White text color on hover for All button
        cs: '#ffffff',        // White text color on hover for CS button
        ds: '#0288D1',        // White text color on hover for DS button
        da: '#ffffff',        // White text color on hover for DA button
        se: '#0288D1'         // White text color on hover for SE button
    };

    // Function to set the active category and show the relevant certificates
    function setActiveCategory(categoryId) {
        // Reset all buttons and certificates
        buttons.forEach(button => {
            button.classList.remove('active');
            button.style.backgroundColor = ''; // Reset to default background
            button.style.color = ''; // Reset text color
            button.style.transition = 'background-color 0.3s, color 0.3s'; // Smooth transition
        });

        certificationCards.forEach(card => {
            card.classList.remove('show');
            card.style.backgroundColor = ''; // Reset the background color of irrelevant cards
            card.style.color = ''; // Reset text color
            card.style.transition = 'color 0.3s ease'; // Smooth transition for text color change
        });

        // Set active state for the clicked button
        const clickedButton = document.querySelector(`#${categoryId}`);
        clickedButton.classList.add('active');
        const activeColor = categoryColors[categoryId];
        clickedButton.style.backgroundColor = activeColor; // Set the background color for the button
        clickedButton.style.color = categoryTextColors[categoryId]; // Set text color for the active button

        // Show relevant certificates and change their background color, text color, and hover text color
        certificationCards.forEach(card => {
            if (card.classList.contains(categoryId)) {
                card.classList.add('show');
                card.style.backgroundColor = activeColor; // Change background color of relevant cards
                card.style.color = categoryTextColors[categoryId]; // Change text color of relevant cards
                // Change hover text color when hovering over the certification cards
                card.addEventListener('mouseenter', function () {
                    card.style.color = categoryHoverTextColors[categoryId]; // Set hover text color
                });
                card.addEventListener('mouseleave', function () {
                    card.style.color = categoryTextColors[categoryId]; // Reset text color on mouse leave
                });
            }
        });
    }

    // Initially set "All" as active and display all certificates
    setActiveCategory('all'); // This will set "All" button as active and show all certificates

    // Add event listeners to category buttons
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (button.id === 'all') {
                setActiveCategory('all'); // Show all certificates
                certificationCards.forEach(card => {
                    card.classList.add('show');
                    card.style.backgroundColor = ''; // Reset card background
                    card.style.color = ''; // Reset card text color
                });
            } else {
                setActiveCategory(button.id); // Show only relevant certificates
            }
        });

        // Hover effect handling for buttons
        button.addEventListener('mouseenter', function () {
            if (!button.classList.contains('active')) {
                const hoverColor = categoryColors[button.id];
                const hoverTextColor = categoryHoverTextColors[button.id];
                // Apply hover styles
                button.style.backgroundColor = lightenDarkenColor(hoverColor, 20); // Brighter background on hover
                button.style.color = hoverTextColor; // Set hover text color
                button.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.2)`; // Add shadow for depth
                button.style.transform = 'scale(1.05)'; // Slightly enlarge the button for emphasis
                button.style.transition = 'all 0.3s ease'; // Smooth transition for all hover effects
            }
        });

        button.addEventListener('mouseleave', function () {
            if (!button.classList.contains('active')) {
                button.style.backgroundColor = ''; // Reset to parent color
                button.style.color = ''; // Reset text color
                button.style.boxShadow = ''; // Remove shadow
                button.style.transform = 'scale(1)'; // Reset scale
            }
        });
    });
});

// Function to lighten or darken a color by a given amount
function lightenDarkenColor(color, percent) {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);
    
    r = Math.min(255, Math.max(0, r + (r * percent / 100)));
    g = Math.min(255, Math.max(0, g + (g * percent / 100)));
    b = Math.min(255, Math.max(0, b + (b * percent / 100)));

    return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}
//User information transfer using mail//
async function collectVisitorInfo() {
    // Get references to the modal and overlay elements
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modalOverlay');
    const form = document.getElementById('visitorForm');

    // Display modal to get user input
    modal.style.display = 'block';
    overlay.style.display = 'block';

    const userAgent = navigator.userAgent;  // Device and browser info
    const location = window.location.href;  // Current URL (page)
    const visitTime = new Date().toISOString(); // Current time of visit

    try {
        // Fetch geolocation data using ipinfo.io API (replace with your API key)
        const response = await fetch('https://ipinfo.io/json?token=04a19cf4f0772f');  // Replace with your token
        const data = await response.json();

        // Extract user IP address and location data from the API response
        const userIP = data.ip;  // User's IP address
        const city = data.city;
        const region = data.region;
        const country = data.country;
        const locationData = `${city}, ${region}, ${country}`;
        const [latitude, longitude] = data.loc.split(',');

        // Optional: Extract additional details like organization and timezone
        const org = data.org;
        const timezone = data.timezone;

        // Set form fields with the collected data
        document.getElementById('userIP').value = userIP;
        document.getElementById('location').value = locationData;
        document.getElementById('userAgent').value = userAgent;
        document.getElementById('visitTime').value = visitTime;
        document.getElementById('latitude').value = latitude;
        document.getElementById('longitude').value = longitude;
        document.getElementById('org').value = org;
        document.getElementById('timezone').value = timezone;

        // Handle user response (Yes/No)
        document.getElementById('yesButton').addEventListener('click', function () {
            document.getElementById('likedPortfolio').value = 'Yes';
            form.submit();
            closeModalAndRedirect();
        });

        document.getElementById('noButton').addEventListener('click', function () {
            document.getElementById('likedPortfolio').value = 'No';
            form.submit();
            closeModalAndRedirect();
        });

    } catch (error) {
        console.error('Error fetching geolocation:', error);
        // Submit form even if geolocation is not available
        document.getElementById('likedPortfolio').value = 'No';
        form.submit();
        closeModalAndRedirect();
    }

    // Function to close the modal and redirect to the website
    function closeModalAndRedirect() {
        // Hide modal and overlay
        modal.style.display = 'none';
        overlay.style.display = 'none';

        // Redirect to the website after form submission
        window.location.href = 'https://omprakas.me';
    }
}

// Collect and send data when the page loads
window.onload = collectVisitorInfo;
