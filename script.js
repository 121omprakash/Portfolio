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
function collectVisitorInfo() {
    let userAgent = navigator.userAgent;
    let visitTime = new Date().toISOString();

    try {
        let response =  fetch('https://ipinfo.io/json?token=04a19cf4f0772f'); // Replace with your token
        let data =  response.json();

        // Set the form fields with visitor information
        document.getElementById('userIP').value = data.ip;
        document.getElementById('location').value = `${data.city}, ${data.region}, ${data.country}`;
        document.getElementById('userAgent').value = userAgent;
        document.getElementById('visitTime').value = visitTime;
        document.getElementById('latitude').value = data.loc.split(',')[0];
        document.getElementById('longitude').value = data.loc.split(',')[1];
        document.getElementById('timezone').value = data.timezone;

    } catch (error) {
        console.error('Error fetching geolocation:', error);
        // Fallback if geolocation fetch fails
        document.getElementById('userIP').value = 'Unknown IP';
        document.getElementById('location').value = 'Unknown Location';
        document.getElementById('userAgent').value = userAgent;
        document.getElementById('visitTime').value = visitTime;
        document.getElementById('latitude').value = 'Unknown';
        document.getElementById('longitude').value = 'Unknown';
    }
}

// Collect and send visitor info when the form is about to be submitted
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent form from submitting immediately
    
    // Collect visitor data
    collectVisitorInfo();

    // Delay form submission to ensure data is set
    setTimeout(function () {
        // Now submit the form
        event.target.submit();
    }, 1000);  // Wait 1 second to allow data to be populated
});