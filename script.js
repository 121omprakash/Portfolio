document.addEventListener("DOMContentLoaded", function () {
    displayVisitorNumber(); // Call function to display the visitor number after DOM is ready
});

// Visitor Counter Function
function displayVisitorNumber() {
    const visitorNumberElement = document.querySelector('#visitor-number');  // Select the correct element
    
    // Get the current visitor count from localStorage, or initialize it to 0 if not set
    let visitorCount = localStorage.getItem('visitorCount');
    
    if (!visitorCount) {
        visitorCount = 0;  // Initialize visitor count to 0 if it's the first visit
    }

    // Increment the visitor count
    visitorCount++;

    // Update localStorage with the new visitor count
    localStorage.setItem('visitorCount', visitorCount);

    // Display the visitor count in the visitor-number span
    if (visitorNumberElement) {
        visitorNumberElement.textContent = `Visitor #${visitorCount}`;
    }
}
