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

// Check if the URL contains `success=true` to show the confirmation message
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        // Show success message when the form is submitted successfully
        showConfirmationMessage();
    }
}

// Handle closing of confirmation box
const closeBtn = document.getElementById('closeBtn');
if (closeBtn) {
    closeBtn.addEventListener('click', function () {
        document.getElementById('confirmationBox').style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.category-btn');
    const certificationCards = document.querySelectorAll('.certification-card');
    const categoryColors = {
        all: '#FF4F79',       // Pink for All button
        cs: '#FF6347',        // Tomato Red for Computer Science
        ds: '#00BFFF',        // Deep Sky Blue for Data Science
        da: '#32CD32',        // Lime Green for Data Analytics
        se: '#FFD700'         // Gold for Software Engineering
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
        ds: '#ffffff',        // White text color on hover for DS button
        da: '#ffffff',        // White text color on hover for DA button
        se: '#ffffff'         // White text color on hover for SE button
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
                button.style.backgroundColor = hoverColor;
                button.style.color = hoverTextColor; // Set hover text color
            }
        });

        button.addEventListener('mouseleave', function () {
            if (!button.classList.contains('active')) {
                button.style.backgroundColor = ''; // Reset to parent color
                button.style.color = ''; // Reset text color
            }
        });
    });
});
