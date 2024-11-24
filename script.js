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

<script>
// Handle form submission and display the modal
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Use FormSubmit API to submit form data
    const form = this;
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    })
    .then(response => {
        if (response.ok) {
            // Display modal if submission is successful
            document.getElementById("thankYouModal").style.display = "flex";
            document.body.classList.add("modal-active"); // Add blur effect to the background
        } else {
            alert("There was an error submitting the form. Please try again later.");
        }
    })
    .catch(error => {
        alert("There was an error submitting the form. Please try again later.");
    });
});

// Close the modal when the "OK" button is clicked
document.getElementById("closeModalBtn").addEventListener("click", function() {
    document.getElementById("thankYouModal").style.display = "none";
    document.body.classList.remove("modal-active"); // Remove blur effect
    // Optionally, reset the form fields after closing the modal
    document.getElementById("contactForm").reset();
});
</script>
