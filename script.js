// =========================================================================
// 1. ASYNCHRONOUS DATA FETCHING (TIMELINE & SKILLS RENDERING)
// =========================================================================
async function loadTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  try {
    const response = await fetch("Data/timeline.json");
    if (!response.ok) throw new Error("Failed to load timeline data.");
    const timelineData = await response.json();

    const timelineHTML = timelineData.map((item, index) => {
      const isEven = index % 2 === 0;
      const sideClass = isEven ? "left" : "right";
      const aosAnimation = isEven ? "fade-right" : "fade-left";

      return `
        <div class="timeline-item ${sideClass}" data-aos="${aosAnimation}">
            <div class="timeline-card tilt">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
      `;
    }).join("");

    container.innerHTML = timelineHTML;

    // Initialize/Refresh modules dependent on dynamic DOM entries
    if (typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(container.querySelectorAll('.tilt'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5
      });
    }
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  } catch (error) {
    console.error("Error rendering timeline:", error);
  }
}

async function loadSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  try {
    const response = await fetch("Data/skill.json");
    if (!response.ok) throw new Error("Failed to load skills data.");
    const skillsData = await response.json();

    const skillsHTML = skillsData.map(skill => `
      <div class="skill tilt">
          <img src="${skill.icon}" alt="${skill.name}">
          <p>${skill.name}</p>
          <div class="sprogress-bar">
              <div class="progress" style="--progress: ${skill.progress};"></div>
          </div>
      </div>
    `).join("");

    container.innerHTML = skillsHTML;

    // Initialize VanillaTilt for the freshly rendered dynamic skills
    if (typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(container.querySelectorAll('.tilt'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5
      });
    }
  } catch (error) {
    console.error("Error rendering skills layout:", error);
  }
}
async function loadProjects() {
  const gridContainer = document.querySelector(".projects-grid");
  const sectionContainer = document.getElementById("projects");
  if (!gridContainer || !sectionContainer) return;

  try {
    const response = await fetch("Data/project.json");
    if (!response.ok) throw new Error("Failed to load projects data.");
    const projectsData = await response.json();

    // 1. Generate HTML for Project Cards
    const gridHTML = projectsData.map(project => `
      <div class="project-card tilt" data-category="${project.category}">
          <img src="${project.image}" alt="${project.title}">
          <h3>${project.title}</h3>
          <p>${project.shortDescription}</p>
          <button class="btn open-modal" data-modal="${project.id}">View Details</button>
      </div>
    `).join("");

    gridContainer.innerHTML = gridHTML;

    // 2. Generate and append HTML for Modals (to avoid clearing structural containers)
    // Remove any previously injected modals first to prevent duplication
    sectionContainer.querySelectorAll('.modal').forEach(el => el.remove());

    projectsData.forEach(project => {
      const modalDiv = document.createElement("div");
      modalDiv.className = "modal";
      modalDiv.id = project.id;

      modalDiv.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h3>${project.title}</h3>
            <div class="project-details">
                <p><strong>Overview:</strong> ${project.details.overview}</p>
                <p><strong>Technology/Skills:</strong> ${project.details.technologies}</p>
                <p><strong>Key Features:</strong>
                    <ul>
                        ${project.details.features.map(feat => `<li>${feat}</li>`).join("")}
                    </ul>
                </p>
                <p><strong>Challenges Faced:</strong> ${project.details.challenges}</p>
                <p><strong>Future Enhancements:</strong>
                    <ul>
                        ${project.details.futureEnhancements.map(enh => `<li>${enh}</li>`).join("")}
                    </ul>
                </p>
                <p><strong>Links:</strong></p>
                ${project.links.authInfo ? `<p><strong>User:</strong> ${project.links.authInfo.user} &nbsp; <strong>Password:</strong> ${project.links.authInfo.password}</p>` : ''}
                ${project.links.liveDemo ? `<a href="${project.links.liveDemo}" target="_blank" class="btn">Live Demo / View Project</a>` : ''}
                ${project.links.github ? `<a href="${project.links.github}" target="_blank" class="btn">View on GitHub</a>` : ''}
            </div>
        </div>
      `;
      sectionContainer.appendChild(modalDiv);
    });

    // 3. Re-initialize VanillaTilt for newly added elements
    if (typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(gridContainer.querySelectorAll('.tilt'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5
      });
    }

    // 4. Attach Event Listeners for Dynamic Modals
    setupModalEvents(sectionContainer);

  } catch (error) {
    console.error("Error rendering projects layout:", error);
  }
}

// Helper function to manage modal behaviors cleanly
function setupModalEvents(container) {
  container.addEventListener("click", (e) => {
    // Open Modal
    if (e.target.classList.contains("open-modal")) {
      const modalId = e.target.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "block"; // Customize logic based on your CSS framework
    }
    
    // Close Modal via close button
    if (e.target.classList.contains("modal-close")) {
      e.target.closest(".modal").style.display = "none";
    }
  });

  // Close modal when clicking outside content area
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
}

// =========================================================================
// 2. THIRD-PARTY INITIALIZATIONS
// =========================================================================
// Initialize AOS for animations (Unified configuration)
AOS.init({ duration: 1000, once: true });

// Initialize Vanilla Tilt for predefined static layout elements
VanillaTilt.init(document.querySelectorAll('.tilt:not(#timeline-container .tilt):not(#skills-container .tilt)'), {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 0.5
});

// Typed.js for animated text in hero section
if (typeof Typed !== 'undefined') {
  new Typed('.typed-text', {
    strings: ['Data Scientist', 'Software Engineer', 'AWS AI/ML Scholar', 'Problem Solver'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
}

// Initialize Particle.js for background particles
if (typeof particlesJS !== 'undefined') {
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
}

// =========================================================================
// 3. CORE INTERFACES & SCROLL CONTROLS
// =========================================================================
function updateProgressBar() {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight <= 0) return;
  const scrollPosition = window.scrollY;
  const scrollPercentage = (scrollPosition / totalHeight) * 100;
  const progressBar = document.getElementById('scroll-progress-bar');
  if (progressBar) {
    progressBar.style.width = `${scrollPercentage}%`;
  }
}

// Optimized unified scroll handler using requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateProgressBar();
      
      // Navbar scroll behavior
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      
      ticking = false;
    });
    ticking = true;
  }
});

// Parallax Effect for .parallax-bg Elements
window.addEventListener('scroll', () => {
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  const scrollTop = window.scrollY;
  parallaxBgs.forEach(bg => {
    const speed = 0.5;
    const yPos = -(scrollTop * speed);
    bg.style.transform = `translateY(${yPos}px)`;
  });
});

// =========================================================================
// 4. PROFILE IMAGE INTERACTION (HOVER EFFECT)
// =========================================================================
const profilePic = document.getElementById("profile-pic");
const progressBar = document.getElementById("progress-bar");
const images = ["images/android-chrome-512x512.avif", "images/profile_picture.avif"];
let currentImageIndex = 0;
let progress = 0;
let interval;
let isHovering = false;

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

function changeProfilePic() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  profilePic.src = images[currentImageIndex];
  progressBar.style.opacity = 0;
  isHovering = true;
}

if (profilePic && progressBar) {
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
}

// =========================================================================
// 5. NAVIGATION AND UTILITIES
// =========================================================================
// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Theme Toggle for Light/Dark Mode
const themeToggle = document.querySelector('#theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = `<i class="fas fa-${currentTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
  });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (navLinks) navLinks.classList.remove('active');
  });
});

// =========================================================================
// 6. FILTERS (PROJECTS & CERTIFICATIONS)
// =========================================================================
// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

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

// Certification Category Filters
const buttons = document.querySelectorAll('.category-btn');
const certificationCards = document.querySelectorAll('.certification-card');
const categoryColors = { all: 'red', cs: '#0bdeb4c2', ds: '#93C5FD', da: '#83f988', se: '#AAF0D1' };
const categoryTextColors = { all: '#ffffff', cs: '#ffffff', ds: '#ffffff', da: '#ffffff', se: '#ffffff' };
const categoryHoverTextColors = { all: '#ffffff', cs: '#ffffff', ds: '#0288D1', da: '#ffffff', se: '#0288D1' };

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
  if (!clickedButton) return;
  
  clickedButton.classList.add('active');
  const activeColor = categoryColors[categoryId];
  clickedButton.style.backgroundColor = activeColor;
  clickedButton.style.color = categoryTextColors[categoryId];

  certificationCards.forEach(card => {
    if (card.classList.contains(categoryId)) {
      card.classList.add('show');
      card.style.backgroundColor = activeColor;
      card.style.color = categoryTextColors[categoryId];
    }
  });
}

// Initialize Active Category
if (buttons.length > 0) {
  setActiveCategory('all');
  certificationCards.forEach(card => card.classList.add('show'));
}

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
      button.style.backgroundColor = lightenDarkenColor(hoverColor, 20);
      button.style.color = categoryHoverTextColors[button.id];
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

// =========================================================================
// 7. PROJECT MODAL PHASES
// =========================================================================
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const modalContent = modal.querySelector('.modal-content');

    if (window.innerWidth <= 480) {
      modal.style.display = 'block';
      const projectCard = button.closest('.project-card');
      if (projectCard && modalContent) {
        const cardRect = projectCard.getBoundingClientRect();
        const offset = 10;
        modalContent.style.top = `${cardRect.top - modalContent.offsetHeight - offset + window.scrollY}px`;
      }
    } else {
      modal.style.display = 'flex';
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      if (modalContent) {
        modalContent.setAttribute('tabindex', '-1');
        modalContent.focus();
      }
    }
  });
});

function closeModal(modal) {
  if (!modal) return;
  modal.style.display = 'none';
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeModal(closeBtn.closest('.modal'));
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.style.display === 'flex' || modal.style.display === 'block') {
        closeModal(modal);
      }
    });
  }
});

// =========================================================================
// 8. DOM CONTENT LOADED ASSIGNMENTS (METRICS & EFFECTS)
// =========================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Load Async JSON Data Components
  loadTimeline();
  loadSkills();

  // Metrics, IP, Forms
  const ipInput = document.getElementById("userIP");
  const locationInput = document.getElementById("location");
  const uaInput = document.getElementById("userAgent");
  const visitTimeInput = document.getElementById("visitTime");
  const latInput = document.getElementById("latitude");
  const lonInput = document.getElementById("longitude");
  const tzInput = document.getElementById("timezone");

  if (uaInput) uaInput.value = navigator.userAgent;
  if (visitTimeInput) visitTimeInput.value = new Date().toISOString();
  if (tzInput) tzInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (ipInput || locationInput) {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        if (ipInput && data.ip) ipInput.value = data.ip;
        if (locationInput) {
          const parts = [data.city, data.region, data.country_name].filter(Boolean);
          locationInput.value = parts.join(", ");
        }
        if (latInput && data.latitude) latInput.value = data.latitude;
        if (lonInput && data.longitude) lonInput.value = data.longitude;
      })
      .catch(err => console.warn("IP/location fetch error:", err));
  }

  // Visitor Counter
  let visitorCount = localStorage.getItem('visitorCount') || 0;
  visitorCount++;
  localStorage.setItem('visitorCount', visitorCount);
  const visitorCountEl = document.getElementById('visitorCount');
  if (visitorCountEl) visitorCountEl.value = visitorCount;

  if (window.location.hash === '#confirmationBox') {
    const confBox = document.getElementById('confirmationBox');
    if (confBox) confBox.style.display = 'flex';
  }

  const closeBtn = document.getElementById('closeBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const confBox = document.getElementById('confirmationBox');
      if (confBox) confBox.style.display = 'none';
      window.location.assign("https://121omprakash.github.io/Portfolio");
    });
  }

  // Custom Cursor
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
  });

  const interactiveElements = document.querySelectorAll("button, .hoverable, .summary, .skills, .contact-form, .awards, .coding-profiles, .about, .education, .certifications, .experience, .projects, .header");
  interactiveElements.forEach(element => {
    element.addEventListener("mouseenter", () => cursor.classList.add("cursor-hole"));
    element.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hole"));
  });

  // Section Glow Effect on Scroll
  const sections = document.querySelectorAll('.header, .summary, .skills-list, .edu-entry, .certifications, .exp-entry, .project, .contact-form, .coding-profiles, .ach');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-glow');
      } else {
        entry.target.classList.remove('section-glow');
      }
    });
  }, { root: null, rootMargin: "0px", threshold: 0.546 });

  sections.forEach(section => sectionObserver.observe(section));
});

// Social Icon Touch Interactions
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
  icon.addEventListener('touchstart', (e) => e.target.classList.add('hovered'));
  icon.addEventListener('touchend', (e) => e.target.classList.remove('hovered'));
  icon.addEventListener('click', (e) => e.target.classList.add('hovered'));
  icon.addEventListener('mouseout', (e) => e.target.classList.remove('hovered'));
});