# 💼 Portfolio Website

![Logo](https://via.placeholder.com/150) <!-- Replace with your logo URL -->

Welcome to my **Portfolio Website**! This is a fully interactive and visually appealing portfolio built using modern web technologies such as **HTML**, **CSS**, and **JavaScript**. This site showcases my skills, certifications, and projects in a visually engaging and dynamic way. It also includes animations, category filters, and a visitor counter to track the number of visitors.

## 🌟 Features

- **🧑‍💻 Portfolio Overview**: Display my personal and professional information, including certifications, skills, and projects.
- **🔢 Visitor Counter**: Tracks the number of visitors and displays it using `localStorage`.
- **🎨 Dynamic Category Filtering**: Interactive buttons for filtering certifications by category (Computer Science, Data Science, Data Analytics, Software Engineering).
- **🖥️ Smooth Animations**: Hover effects, transitions, and card animations to enhance user experience.
- **✔️ Confirmation Box**: Shows a confirmation message on form submission with smooth animation.
- **📱 Responsive Design**: Optimized for all screen sizes, ensuring a smooth experience on both desktop and mobile devices.

---

## 🚀 Technologies Used

This portfolio website is built with the following technologies:

- **HTML**: Structure of the page, content, and interactive elements.
- **CSS**: Responsive layout, animations, and hover effects.
- **JavaScript**: Dynamic visitor counter, category filtering, and smooth transitions.
- **localStorage**: Persistent visitor count storage across sessions.
  
---

## 🛠️ Installation Guide

To run this portfolio website locally, follow the steps below:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio-website.git
2. Navigate to the Project Directory
bash
Copy code
cd portfolio-website
3. Open the index.html File
Open the index.html file in your preferred browser to view the website locally.

bash
Copy code
open index.html
4. Explore the Features
You can interact with the category buttons, explore certifications, and enjoy the animations and transitions.

📸 Visuals & UI
The portfolio is designed with a clean, modern look, featuring interactive elements that respond to user input, such as:

Category Buttons: Color-coded buttons for filtering certifications and projects. Each category has its own hover effects, animations, and background color transitions.
Certification Cards: Interactive cards that show your certifications with smooth animations when they are hovered over.
Example Animation:
css
Copy code
@keyframes hoverEffect {
    0% { transform: scale(1); }
    100% { transform: scale(1.05); }
}

.card:hover {
    animation: hoverEffect 0.3s ease-in-out forwards;
}
🧑‍💻 Functionality Breakdown
1. Visitor Counter
This feature increments the number of visitors on page load, and the count is stored in localStorage so the counter persists across sessions.

javascript
Copy code
// Initialize Visitor Count from localStorage
let visitorCount = localStorage.getItem('visitorCount');
if (!visitorCount) {
    visitorCount = 0; // Initialize if not set
}

// Increment Visitor Count
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);

// Display the visitor count
document.getElementById('visitorCount').value = visitorCount;
2. Category Filtering
There are buttons for different categories: Computer Science (CS), Data Science (DS), Data Analytics (DA), and Software Engineering (SE). When a category is clicked, the relevant certifications are displayed while others are hidden.

javascript
Copy code
// Function to set the active category and show the relevant certificates
function setActiveCategory(categoryId) {
    // Show only relevant certificates
    certificationCards.forEach(card => {
        if (card.classList.contains(categoryId)) {
            card.classList.add('show');
        } else {
            card.classList.remove('show');
        }
    });
}
3. Confirmation Box
When a form is successfully submitted, a confirmation box appears with a smooth fade-in effect. Users can close it by clicking the close button.

javascript
Copy code
// Function to display confirmation box when form is submitted
function showConfirmationMessage() {
    document.getElementById('confirmationBox').style.display = 'flex';
}

// Handle closing of confirmation box
const closeBtn = document.getElementById('closeBtn');
if (closeBtn) {
    closeBtn.addEventListener('click', function () {
        document.getElementById('confirmationBox').style.display = 'none';
    });
}
📱 Responsive Design
This portfolio is built to be responsive, ensuring a great user experience on both mobile and desktop devices. The layout adjusts automatically based on the screen size, using CSS media queries for a mobile-first approach.

Example Media Query:
css
Copy code
@media (max-width: 768px) {
    .category-btn {
        font-size: 14px;
    }
    
    .certification-card {
        width: 100%;
        margin-bottom: 20px;
    }
}
🎨 Custom Animations
The site includes custom animations to make the user experience more engaging:

Hover Effects on Buttons: When hovering over category buttons, the background color brightens, and the text changes color smoothly.
Smooth Transitions: Smooth transitions when switching between categories and certifications.
🌍 SEO Optimization
This portfolio is optimized for SEO to ensure it ranks well in search engines. Key strategies implemented:

Meta Tags: Added essential meta tags like description, keywords, and Open Graph tags for improved searchability.
html
Copy code
<meta name="description" content="A modern and interactive portfolio showcasing skills in web development, data science, software engineering, and more.">
<meta name="keywords" content="portfolio, web development, certifications, data science, software engineering, data analytics">
<meta property="og:title" content="Interactive Portfolio Website">
<meta property="og:description" content="A dynamic portfolio website with interactive features such as category filtering, visitor tracking, and animations.">
<meta property="og:image" content="image.jpg">
<meta property="og:url" content="omprakas.me">
Structured Content: Organized headings and clean HTML structure help search engines index the page content more effectively.
🤝 Contributing
I welcome contributions to improve and enhance this portfolio. To contribute:

Fork the repository.
Clone the fork to your local machine.
Create a new branch (git checkout -b feature-branch).
Make changes and commit (git commit -m 'Add new feature').
Push to your fork (git push origin feature-branch).
Open a Pull Request.
📝 License
This project is licensed under the MIT License. See the LICENSE file for details.

📱 Contact & Socials
Feel free to connect with me on the following platforms:

GitHub: @yourusername
LinkedIn: Your Name
Twitter: @yourhandle
Email: your.email@example.com
🚀 Live Demo
Check out the live demo of this portfolio at Demo Link to see the full functionality in action, including smooth animations, category filtering, and the visitor counter.

Happy coding! 🎉
