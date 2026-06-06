/* ================================
   Smooth Scroll for Navigation
================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

function initSkillMapping() {
  const skillTags = document.querySelectorAll(".skill-tags span");
  const projectCards = document.querySelectorAll(".project-card");

  skillTags.forEach(tag => {
    tag.addEventListener("mouseenter", () => {
      const skillName = tag.textContent.trim().toLowerCase();
      projectCards.forEach(card => {
        const cardTags = Array.from(card.querySelectorAll(".project-tags span"))
          .map(s => s.textContent.trim().toLowerCase());
        if (cardTags.includes(skillName)) {
          card.classList.add("highlight");
          card.classList.remove("dimmed");
        } else {
          card.classList.add("dimmed");
          card.classList.remove("highlight");
        }
      });
    });

    tag.addEventListener("mouseleave", () => {
      projectCards.forEach(card => {
        card.classList.remove("highlight");
        card.classList.remove("dimmed");
      });
    });
  });
}

function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  });
}

/* ================================
   Project Modal Logic (Global)
================================ */
const projectsData = {
  traffic: {
    title: "AI-Driven Traffic Monitoring System",
    image: "assets/avi/projects/traffic/overview_v2.png",
    description: "Engineered an AI-based traffic monitoring system leveraging YOLOv8 object detection and CARLA simulation. The system predicts real-time congestion and enables adaptive traffic control in 6G-enabled smart cities. Implemented proactive voice and SMS alert mechanisms, advancing safe, efficient, and autonomous urban mobility. Presented this work as a research paper titled at ICISCoIS 2026, PSG College of Technology.",
    tech: ["Python", "YOLOv8", "PyTorch", "OpenCV", "CARLA Simulator"]
  },
  crime: {
    title: "Crime Type Prediction Using Random Forest Classifier",
    image: "assets/avi/projects/crime/overview.png",
    description: "Built a machine learning classification model to predict the type of crime most likely to occur in Indian districts. Worked with a dataset of 9000 rows and 29 features, applying extensive data preprocessing, feature engineering, district-wise categorical encoding, and hyperparameter tuning. Achieved 95% accuracy, evaluated with accuracy, precision, recall, and F1-score metrics.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest Classifier"]
  },
  route: {
    title: "Optimal Route Finder Using Google Maps API",
    image: "assets/avi/projects/route/overview.png",
    description: "Developed a path-optimization program that utilizes the Google Maps API to fetch and evaluate multiple driving routes between a given origin and destination. The system compares routes based on distance, estimated travel time, live traffic data, and road conditions. It then selects and outputs the most optimal route for the user based on a weighted evaluation of all factors.",
    tech: ["Python", "Google Maps API", "REST APIs", "JSON Handling", "Data Parsing"]
  },
  embedded: {
    title: "Digital Clock and Event Scheduler Using ARM Microcontroller",
    image: "assets/avi/projects/embedded/overview.png",
    description: "Developed a complete embedded digital clock system on the NUCLEO-F401RE ARM microcontroller with an external Real-Time Clock module. Features include real-time display, alarms, countdown timer, stopwatch, and scheduled event notifications. Integrated PC connectivity using UART for monitoring and control operations.",
    tech: ["Embedded C", "ARM Cortex-M4", "Keil uVision", "Real-Time Clock (RTC)", "UART Communication"]
  },
  gesture: {
    title: "Gesture-Based Door Access System",
    image: "assets/avi/projects/gesture/overview.png",
    description: "Implemented a secure door-access mechanism using a PIC16F877A microcontroller. The system detects hand gestures using ultrasonic sensors, activates the display, and requests a password. Upon correct authentication, the system triggers a servo motor to unlock the door. Includes buzzer alerts and LCD prompts for user guidance.",
    tech: ["Embedded C", "PIC16F877A", "MPLAB X", "Ultrasonic Sensors", "Servo Motor Control"]
  },
  face: {
    title: "Facial Recognition–Based Hall Booking",
    image: "assets/avi/projects/face/overview.png",
    description: "Developing a smart hall-booking application where users book college halls by selecting a date and duration. During booking, the system captures the user’s facial data. On the event day, the hall lights and power systems turn on only after facial verification using a Raspberry Pi. Ensures authenticated access, prevents misuse, and enables automated power control.",
    tech: ["Python", "OpenCV", "Raspberry Pi", "IoT Integration", "SQLite / Firebase"]
  },
  retail: {
    title: "Retail Analytics for Optimizing Staffing and Sales",
    image: "assets/avi/projects/retail/overview.png",
    description: "Delivered a business analytics project for a clothing retail store by collecting and analyzing real-world data on sales, footfall, and competitor pricing. Identified operational challenges such as peak-hour understaffing, price competitiveness gaps, and the shift toward online shopping. Provided data-driven recommendations that improved staffing efficiency and enhanced customer experience.",
    tech: ["Python", "Pandas", "Scikit-learn", "Excel", "Business Analytics"]
  },
  robot: {
    title: "Smart Lab Management and Robotic-Arm Simulation System",
    image: "assets/avi/projects/robot/overview.png",
    description: "Engineered a scalable backend orchestration platform for autonomous chemical storage, retrieval, and robotic task execution using FastAPI and relational database architecture. Implemented workflow orchestration, task lifecycle management, real-time execution simulation, and 3D rack visualization to enhance operational reliability, traceability, and intelligent resource coordination.",
    tech: ["Python", "FastAPI", "SQL", "3D Visualization", "REST API's", "Scalable Backend Architecture"]
  },
  portal: {
    title: "Placement Portal Application",
    image: "assets/avi/projects/portal/overview.png",
    description: "Developed a role-based placement management platform using Flask and SQLAlchemy, enabling seamless interaction between students, companies, and administrators. Designed a normalized relational database schema, implemented secure authentication and authorization workflows, automated application tracking, and built approval pipelines to streamline recruitment operations and ensure data integrity.",
    tech: ["Python", "Flask", "SQLAlchemy", "SQLite", "HTML/CSS", "Bootstrap", "Jinja2", "RESTful Architecture", "DataBase Design", "Authentication & Authorization"]
  }
};

// Global variables for Modal access
let modalOverlay, modalTitle, modalDesc, modalTechList, closeModalBtn;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize these immediately as they are in static HTML
  modalOverlay = document.getElementById('projectModal');
  modalTitle = document.getElementById('modalTitle');
  modalDesc = document.getElementById('modalDescription');
  modalTechList = document.getElementById('modalTechList');
  closeModalBtn = document.getElementById('closeModalBtn');

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  /* ================================
   Scroll to Top Logic
  ================================ */
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ================================
     Resume Preview Modal
  ================================ */
  const resumeModal = document.getElementById('resumeModal');
  if (resumeModal) {
    window.closeResumePreview = function () {
      resumeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    };
    window.openResumePreview = function () {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        window.closeResumePreview();
      }
    });
  }
});

// Exposed Global Function for HTML onclick
window.openProject = function (projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  if (modalTitle) modalTitle.textContent = project.title;
  if (modalDesc) modalDesc.textContent = project.description;

  if (modalTechList) {
    modalTechList.innerHTML = '';
    project.tech.forEach(tech => {
      const li = document.createElement('li');
      li.textContent = tech;
      modalTechList.appendChild(li);
    });
  }
  const modalImage = document.getElementById("modalProjectImage");
  if (modalImage && project.image) {
    modalImage.src = project.image;
  }

  if (modalOverlay) {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

function closeProjectModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ================================
   Splash Screen Logic
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");

  // Wait for loading animation to finish (approx 2.5s)
  setTimeout(() => {
    splash.classList.add("fade-out");

    // Remove from DOM after transition (0.8s) to prevent blocking interactions
    setTimeout(() => {
      splash.style.display = "none";
    }, 800);
  }, 2500);

  // START SECTION LOADER
  loadAllSections();
});

/* ================================
   Section Loader Logic
================================ */
async function loadAllSections() {
  const sections = [
    { id: 'navbar-container', file: 'sections/navbar.html' },
    { id: 'hero-container', file: 'sections/hero.html' },
    { id: 'about-container', file: 'sections/about.html' },
    { id: 'skills-container', file: 'sections/skills.html' },
    { id: 'education-container', file: 'sections/education.html' },
    { id: 'certifications-container', file: 'sections/certifications.html' },
    { id: 'projects-container', file: 'sections/projects.html' },
    { id: 'faq-container-main', file: 'sections/faq.html' },
    { id: 'contact-container-main', file: 'sections/contact.html' },
    { id: 'footer-container', file: 'sections/footer.html' }
  ];

  try {
    // Load all in parallel for speed, but preserve order in DOM (placeholders handle order)
    await Promise.all(sections.map(section => loadSection(section.id, section.file)));

    // Initialize interactive elements AFTER content is loaded
    initNavigation();
    initScrollReveal();
    initSkillMapping();
    initFAQ();

    console.log("All sections loaded successfully.");
  } catch (error) {
    console.error("Error loading sections:", error);
    if (window.location.protocol === 'file:') {
      alert("Note: This website uses modular components. Because you are opening it directly from a file folder (file://), your browser might block loading these files for security. \n\nPlease use a local server (like Live Server in VS Code) to view the full site.");
    }
  }
}

async function loadSection(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const response = await fetch(filePath);
  if (!response.ok) throw new Error(`Failed to load ${filePath}: ${response.statusText}`);

  const html = await response.text();
  container.innerHTML = html;
}

/* ================================
   Initialization Wrappers
   (Moved logic into functions to call after load)
================================ */

function initNavigation() {
  /* ================================
     Smooth Scroll for Navigation
  ================================ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ================================
     Navbar Scrolled State
  ================================ */
  const nav = document.querySelector(".navbar");
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  /* ================================
     Mobile Hamburger Menu
  ================================ */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");

  if (hamburger && navLinks) {
    function closeMenu() {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";
    }

    function toggleMenu() {
      const isActive = navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "";
    }

    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    links.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
        closeMenu();
      }
    });
  }
}

function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
}


