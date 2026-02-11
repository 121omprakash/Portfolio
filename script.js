AOS.init({ duration: 1000, once: true });
VanillaTilt.init(document.querySelectorAll('.tilt'), {
    max: 25,
    speed: 400,
    glare: true,
    'max-glare': 0.5
});


// Progress Bar for Scroll Position
function updateProgressBar() {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPosition = window.scrollY;
  const scrollPercentage = (scrollPosition / totalHeight) * 100;
  const progressBar = document.getElementById('scroll-progress-bar');
  progressBar.style.width = `${scrollPercentage}%`;
}

// Profile Picture Hover Effect
const profilePic = document.getElementById("profile-pic");
const progressBar = document.getElementById("progress-bar");
const images = ["images/android-chrome-512x512.png", "images/profile_picture.png"];
let currentImageIndex = 0;
let progress = 0;
let interval;
let isHovering = false;

// Start progress animation on hover
function startProgress() {
  progress = 0;
  progressBar.style.transition = "none";
  progressBar.style.background = "conic-gradient(rgba(231, 240, 237, 0) 0deg, #ddd 0deg)";
  progressBar.style.transition = "background 2s linear";

  interval = setInterval(() => {
    progress += 1;
    progressBar.style.background = `conic-gradient(rgba(231, 240, 237, 0) ${progress * 3.6}deg, #00bfff 30deg)`;
    if (progress === 100) {
      clearInterval(interval);
      changeProfilePic();
    }
  }, 35);
}

// Change profile picture after progress completes
function changeProfilePic() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  profilePic.src = images[currentImageIndex];
  progressBar.style.opacity = 0;
  isHovering = true;
}

// Profile picture hover event listeners
profilePic.addEventListener("mouseenter", () => {
  if (!isHovering) {
    isHovering = true;
    progressBar.style.opacity = 1;
    startProgress();
  }
});

profilePic.addEventListener("mouseleave", () => {
  isHovering = false;
  clearInterval(interval);
  progress = 0;
  progressBar.style.transition = "none";
  progressBar.style.background = "conic-gradient(rgba(231, 240, 237, 0) 0deg, #00bfff 30deg)";
  progressBar.style.transition = "background 2s linear";
  progressBar.style.opacity = 0;
});

// Initialize Particle.js for background particles
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#007bff' },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    move: { enable: true, speed: 2, direction: 'none', random: false }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
    modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
  }
});

// Initialize AOS for animations
AOS.init({ duration: 1000, once: true });

// Initialize Vanilla Tilt for card tilt effects
VanillaTilt.init(document.querySelectorAll('.tilt'), {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 0.5
});

// Typed.js for animated text in hero section
new Typed('.typed-text', {
  strings: ['Data Scientist', 'Software Engineer', 'AWS AI/ML Scholar', 'Problem Solver'],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Theme Toggle for Light/Dark Mode
const themeToggle = document.querySelector('#theme-toggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.setAttribute('data-theme',
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  );
  themeToggle.innerHTML = `<i class="fas fa-${document.documentElement.getAttribute('data-theme') === 'dark' ? 'sun' : 'moon'}"></i>`;
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('active');
  });
});

// Project Filters

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active filter
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        const filter = button.getAttribute('data-filter');
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.classList.add('aos-animate');
            } else {
                card.style.display = 'none';
                card.classList.remove('aos-animate');
            }
        });
    });
});

// Project Modal Positioning
// Project Modal
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        const modalContent = modal.querySelector('.modal-content');

        // Show the modal
        modal.style.display = 'flex';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        // Focus modal for accessibility
        modalContent.setAttribute('tabindex', '-1');
        modalContent.focus();
    });
});

// Close modal when clicking the close button
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        modal.style.display = 'none';
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
});

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
});

// Close modal with Escape key for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }
});
// Visitor Counter
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);
document.getElementById('visitorCount').value = visitorCount;

// Form Submission Confirmation
function showConfirmationMessage() {
  document.getElementById('confirmationBox').style.display = 'flex';
}

window.onload = function () {
  if (window.location.hash === '#confirmationBox') {
    showConfirmationMessage();
  }
};

const closeBtn = document.getElementById('closeBtn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    document.getElementById('confirmationBox').style.display = 'none';
    window.location.assign("https://121omprakash.github.io/Portfolio");
  });
}

// Certification Category Filters
const buttons = document.querySelectorAll('.category-btn');
const certificationCards = document.querySelectorAll('.certification-card');
const categoryColors = {
  all: 'red',
  cs: '#0bdeb4c2',
  ds: '#93C5FD',
  da: '#83f988',
  se: '#AAF0D1'
};
const categoryTextColors = {
  all: '#ffffff',
  cs: '#ffffff',
  ds: '#ffffff',
  da: '#ffffff',
  se: '#ffffff'
};
const categoryHoverTextColors = {
  all: '#ffffff',
  cs: '#ffffff',
  ds: '#0288D1',
  da: '#ffffff',
  se: '#0288D1'
};

function setActiveCategory(categoryId) {
  buttons.forEach(button => {
    button.classList.remove('active');
    button.style.backgroundColor = '';
    button.style.color = '';
    button.style.transition = 'background-color 0.3s, color 0.3s';
  });
  certificationCards.forEach(card => {
    card.classList.remove('show');
    card.style.backgroundColor = '';
    card.style.color = '';
    card.style.transition = 'color 0.3s ease';
  });

  const clickedButton = document.querySelector(`#${categoryId}`);
  clickedButton.classList.add('active');
  const activeColor = categoryColors[categoryId];
  clickedButton.style.backgroundColor = activeColor;
  clickedButton.style.color = categoryTextColors[categoryId];

  certificationCards.forEach(card => {
    if (card.classList.contains(categoryId)) {
      card.classList.add('show');
      card.style.backgroundColor = activeColor;
      card.style.color = categoryTextColors[categoryId];
      card.addEventListener('mouseenter', () => {
        card.style.color = categoryHoverTextColors[categoryId];
      });
      card.addEventListener('mouseleave', () => {
        card.style.color = categoryTextColors[categoryId];
      });
    }
  });
}

setActiveCategory('all');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'all') {
      setActiveCategory('all');
      certificationCards.forEach(card => {
        card.classList.add('show');
        card.style.backgroundColor = '';
        card.style.color = '';
      });
    } else {
      setActiveCategory(button.id);
    }
  });

  button.addEventListener('mouseenter', () => {
    if (!button.classList.contains('active')) {
      const hoverColor = categoryColors[button.id];
      const hoverTextColor = categoryHoverTextColors[button.id];
      button.style.backgroundColor = lightenDarkenColor(hoverColor, 20);
      button.style.color = hoverTextColor;
      button.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.2)`;
      button.style.transform = 'scale(1.05)';
      button.style.transition = 'all 0.3s ease';
    }
  });

  button.addEventListener('mouseleave', () => {
    if (!button.classList.contains('active')) {
      button.style.backgroundColor = '';
      button.style.color = '';
      button.style.boxShadow = '';
      button.style.transform = 'scale(1)';
    }
  });
});

// Color Lighten/Darken Utility
function lightenDarkenColor(color, percent) {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  r = Math.min(255, Math.max(0, r + (r * percent / 100)));
  g = Math.min(255, Math.max(0, g + (g * percent / 100)));
  b = Math.min(255, Math.max(0, b + (b * percent / 100)));
  return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const ipInput        = document.getElementById("userIP");
    const locationInput  = document.getElementById("location");
    const uaInput        = document.getElementById("userAgent");
    const visitTimeInput = document.getElementById("visitTime");
    const latInput       = document.getElementById("latitude");
    const lonInput       = document.getElementById("longitude");
    const tzInput        = document.getElementById("timezone");

    // User agent (no permission)
    if (uaInput) {
        uaInput.value = navigator.userAgent; // [web:16]
    }

    // Visit time (no permission)
    if (visitTimeInput) {
        visitTimeInput.value = new Date().toISOString(); // [web:8]
    }

    // Timezone (no permission)
    if (tzInput) {
        tzInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone; // [web:11]
    }

    // IP + rough location via IP geolocation API (no browser permission, but uses third‑party service)
    if (ipInput || locationInput) {
        fetch("https://ipapi.co/json/")  // or ipinfo.io, geoapify, etc. [web:5][web:23][web:26][web:29]
            .then(res => res.json())
            .then(data => {
                if (ipInput && data.ip) {
                    ipInput.value = data.ip;
                }
                if (locationInput) {
                    const parts = [data.city, data.region, data.country_name].filter(Boolean);
                    locationInput.value = parts.join(", ");
                }
                // Optional: if you want *approx* lat/lon from IP (still no browser permission):
                if (latInput && data.latitude)  latInput.value = data.latitude;
                if (lonInput && data.longitude) lonInput.value = data.longitude;
            })
            .catch(err => {
                console.warn("IP/location fetch error:", err);
            });
    }
});

// Custom Cursor Effect
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  const mouseX = e.pageX;
  const mouseY = e.pageY;
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
});

const interactiveElements = document.querySelectorAll("button, .hoverable, .summary, .skills, .contact-form, .awards, .coding-profiles, .about, .education, .certifications, .experience, .projects, .header");
interactiveElements.forEach(element => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hole");
  });
  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hole");
  });
});

// Section Glow Effect on Scroll
const sections = document.querySelectorAll('.header, .summary, .skills-list, .edu-entry, .certifications, .exp-entry, .project, .contact-form, .coding-profiles, .ach');
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.546
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-glow');
    } else {
      entry.target.classList.remove('section-glow');
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Social Icon Hover Effect for Touch and Click
const socialIcons = document.querySelectorAll('.social-icon');
function simulateHoverStart(event) {
  event.target.classList.add('hovered');
}
function simulateHoverEnd(event) {
  event.target.classList.remove('hovered');
}

socialIcons.forEach(icon => {
  icon.addEventListener('touchstart', simulateHoverStart);
  icon.addEventListener('touchend', simulateHoverEnd);
  icon.addEventListener('click', simulateHoverStart);
  icon.addEventListener('mouseout', simulateHoverEnd);
});

// Scroll Progress Bar with RequestAnimationFrame
let ticking = false;
window.addEventListener('scroll', function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      updateProgressBar();
      ticking = false;
    });
    ticking = true;
  }
});

// Parallax Effect for .parallax-bg Elements
const parallaxBgs = document.querySelectorAll('.parallax-bg');
window.addEventListener('scroll', () => {
    parallaxBgs.forEach(bg => {
        const speed = 0.5;
        const yPos = -(window.scrollY * speed);
        bg.style.transform = `translateY(${yPos}px)`;
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-progress-bar').style.width = `${scrollPercent}%`;
});

//for project modal
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';

        if (window.innerWidth <= 480) {
            const projectCard = button.closest('.project-card');
            const cardRect = projectCard.getBoundingClientRect();
            const modalContent = modal.querySelector('.modal-content');
            const offset = 10; // Small gap above the project card
            modalContent.style.top = `${cardRect.top - modalContent.offsetHeight - offset + window.scrollY}px`;
        }
    });
});

document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});












