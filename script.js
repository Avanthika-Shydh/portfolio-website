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
    image: "assets/avi/projects/traffic/overview_v3.png",
    description: "Designed and evaluated an end-to-end intelligent traffic monitoring system using YOLOv8 object detection and LiDAR fusion within the CARLA simulation environment. Engineered deep learning models to predict real-time vehicle congestion patterns and dynamically adjust signal durations. Developed automated alert pipelines with integrated voice and SMS notification APIs for critical incident responses. The research was published and presented at the international conference ICISCoIS 2026 at PSG College of Technology.",
    tech: ["Python", "YOLOv8", "PyTorch", "OpenCV", "CARLA Simulator"]
  },
  crime: {
    title: "Crime Type Prediction Using Random Forest Classifier",
    image: "assets/avi/projects/crime/overview.png",
    description: "Engineered a high-performance machine learning pipeline using a Random Forest Classifier to predict localized crime type occurrences across various Indian districts. Performed robust feature engineering, target encoding, class imbalance handling, and grid-search hyperparameter optimization on a comprehensive dataset of 9,000 records. Achieved a classification accuracy of 95%, rigorously validated using precision, recall, and F1-score metrics to ensure reliability.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest Classifier"]
  },
  route: {
    title: "Optimal Route Finder Using Google Maps API",
    image: "assets/avi/projects/route/overview_v2.png",
    description: "Developed a route-optimization application that integrates with Google Maps APIs to fetch, parse, and evaluate multi-modal driving routes dynamically. Implemented a weighted decision-making algorithm that analyzes live traffic flows, historical congestion patterns, distance, and road conditions. The system computes and recommends the absolute optimal route, substantially reducing travel time and fuel consumption.",
    tech: ["Python", "Google Maps API", "REST APIs", "JSON Handling", "Data Parsing"]
  },
  embedded: {
    title: "Digital Clock and Event Scheduler Using ARM Microcontroller",
    image: "assets/avi/projects/embedded/overview_v2.png",
    description: "Designed and built a multi-functional embedded digital clock and scheduler system on the STM32 NUCLEO-F401RE (ARM Cortex-M4) microcontroller. Configured peripheral hardware interfaces including timers, interrupts, and I2C communication with an external Real-Time Clock (RTC) module. Developed features for real-time display, multi-alarm scheduling, stopwatch, and implemented serial communication via UART for host PC control and status monitoring.",
    tech: ["Embedded C", "ARM Cortex-M4", "Keil uVision", "Real-Time Clock (RTC)", "UART Communication"]
  },
  gesture: {
    title: "Gesture-Based Door Access System",
    image: "assets/avi/projects/gesture/overview_v2.png",
    description: "Engineered a contactless gesture-controlled authentication and door locking system powered by a PIC16F877A microcontroller. Developed low-level drivers in Embedded C to interface ultrasonic distance sensors, a character LCD, and a piezoelectric buzzer. The system interprets distance thresholds as directional gestures to wake the interface, verify passcode input, and actuate a servo-controlled locking mechanism.",
    tech: ["Embedded C", "PIC16F877A", "MPLAB X", "Ultrasonic Sensors", "Servo Motor Control"]
  },
  face: {
    title: "Facial Recognition–Based Hall Booking",
    image: "assets/avi/projects/face/overview_v5.png",
    description: "Developing an IoT-enabled smart hall reservation and energy management system integrating OpenCV facial recognition on a Raspberry Pi. The system automates reservation validation by verifying user identity at the venue, subsequently triggering relay circuits to power lighting and HVAC systems. This eliminates energy waste, unauthorized usage, and streamlines facility operations.",
    tech: ["Python", "OpenCV", "Raspberry Pi", "IoT Integration", "SQLite / Firebase"]
  },
  retail: {
    title: "Retail Analytics for Optimizing Staffing and Sales",
    image: "assets/avi/projects/retail/overview_v2.png",
    description: "Conducted a comprehensive retail analytics study for a physical clothing brand, analyzing real-world data points across footfall patterns, seasonal sales, and local competitor pricing. Utilized Python (Pandas/NumPy) for exploratory data analysis, revealing critical operational inefficiencies like peak-hour staffing gaps. Delivered actionable, data-backed strategies that optimized staffing schedules and improved overall profit margins.",
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
    { id: 'experience-container', file: 'sections/experience.html' },
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


