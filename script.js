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
});

/* ================================
   Scroll Reveal Animation
================================ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});


/* ================================
   Navbar Scrolled State
================================ */
const nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});


/* ================================
   Mobile Hamburger Menu
================================ */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

function closeMenu() {
  navLinks.classList.remove("active");
  hamburger.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

function toggleMenu() {
  const isActive = navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");

  if (isActive) {
    document.body.style.overflow = "hidden"; // Lock scrolling
  } else {
    document.body.style.overflow = "";
  }
}

hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent immediate close from document click
  toggleMenu();
});

links.forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// Close on resize if returning to desktop view
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
    closeMenu();
  }
});

/* ================================
   Project Modal Logic
================================ */
const projectsData = {
  traffic: {
    title: "AI-Driven Traffic Monitoring System",
    description: "Engineered an AI-based traffic monitoring system leveraging YOLOv8 object detection and CARLA simulation. The system predicts real-time congestion and enables adaptive traffic control in 6G-enabled smart cities. Implemented proactive voice and SMS alert mechanisms, advancing safe, efficient, and autonomous urban mobility. Presented this work as a research paper titled at ICISCoIS 2026, PSG College of Technology.",
    tech: ["Python", "YOLOv8", "PyTorch", "OpenCV", "CARLA Simulator"]
  },
  crime: {
    title: "Crime Type Prediction Using Random Forest Classifier",
    description: "Built a machine learning classification model to predict the type of crime most likely to occur in Indian districts. Worked with a dataset of 9000 rows and 29 features, applying extensive data preprocessing, feature engineering, district-wise categorical encoding, and hyperparameter tuning. Achieved 95% accuracy, evaluated with accuracy, precision, recall, and F1-score metrics.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest Classifier"]
  },
  route: {
    title: "Optimal Route Finder Using Google Maps API",
    description: "Developed a path-optimization program that utilizes the Google Maps API to fetch and evaluate multiple driving routes between a given origin and destination. The system compares routes based on distance, estimated travel time, live traffic data, and road conditions. It then selects and outputs the most optimal route for the user based on a weighted evaluation of all factors.",
    tech: ["Python", "Google Maps API", "REST APIs", "JSON Handling", "Data Parsing"]
  },
  embedded: {
    title: "Digital Clock and Event Scheduler Using ARM Microcontroller",
    description: "Developed a complete embedded digital clock system on the NUCLEO-F401RE ARM microcontroller with an external Real-Time Clock module. Features include real-time display, alarms, countdown timer, stopwatch, and scheduled event notifications. Integrated PC connectivity using UART for monitoring and control operations.",
    tech: ["Embedded C", "ARM Cortex-M4", "Keil uVision", "Real-Time Clock (RTC)", "UART Communication"]
  },
  gesture: {
    title: "Gesture-Based Door Access System",
    description: "Implemented a secure door-access mechanism using a PIC16F877A microcontroller. The system detects hand gestures using ultrasonic sensors, activates the display, and requests a password. Upon correct authentication, the system triggers a servo motor to unlock the door. Includes buzzer alerts and LCD prompts for user guidance.",
    tech: ["Embedded C", "PIC16F877A", "MPLAB X", "Ultrasonic Sensors", "Servo Motor Control"]
  },
  face: {
    title: "Facial Recognition–Based Hall Booking",
    description: "Developing a smart hall-booking application where users book college halls by selecting a date and duration. During booking, the system captures the user’s facial data. On the event day, the hall lights and power systems turn on only after facial verification using a Raspberry Pi. Ensures authenticated access, prevents misuse, and enables automated power control.",
    tech: ["Python", "OpenCV", "Raspberry Pi", "IoT Integration", "SQLite / Firebase"]
  },
  retail: {
    title: "Retail Analytics for Optimizing Staffing and Sales",
    description: "Delivered a business analytics project for a clothing retail store by collecting and analyzing real-world data on sales, footfall, and competitor pricing. Identified operational challenges such as peak-hour understaffing, price competitiveness gaps, and the shift toward online shopping. Provided data-driven recommendations that improved staffing efficiency and enhanced customer experience.",
    tech: ["Python", "Pandas", "Scikit-learn", "Excel", "Business Analytics"]
  }
};

const modalOverlay = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDescription');
const modalTechList = document.getElementById('modalTechList');
const closeModalBtn = document.getElementById('closeModalBtn');

function openProject(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  modalTitle.textContent = project.title;
  modalDesc.textContent = project.description;

  // Clear previous tech tags
  modalTechList.innerHTML = '';

  // Add new tech tags
  project.tech.forEach(tech => {
    const li = document.createElement('li');
    li.textContent = tech;
    modalTechList.appendChild(li);
  });

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProjectModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Close button click
closeModalBtn.addEventListener('click', closeProjectModal);

// Close on click outside
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeProjectModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeProjectModal();
  }
});

/* ================================
   Skill-to-Project Mapping
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const skillTags = document.querySelectorAll(".skill-tags span");
  const projectCards = document.querySelectorAll(".project-card");

  skillTags.forEach(tag => {
    // Add hover listener
    tag.addEventListener("mouseenter", () => {
      const skillName = tag.textContent.trim().toLowerCase();

      projectCards.forEach(card => {
        // Get all tags inside this card
        const cardTags = Array.from(card.querySelectorAll(".project-tags span"))
          .map(s => s.textContent.trim().toLowerCase());

        // Check if map contains skill (partial match or exact)
        // Using exact match for cleaner results, but robust enough for case
        if (cardTags.includes(skillName)) {
          card.classList.add("highlight");
          card.classList.remove("dimmed");
        } else {
          card.classList.add("dimmed");
          card.classList.remove("highlight");
        }
      });
    });

    // Remove effects on mouse leave
    tag.addEventListener("mouseleave", () => {
      projectCards.forEach(card => {
        card.classList.remove("highlight");
        card.classList.remove("dimmed");
      });
    });
  });
});

/* ================================
   Scroll to Top Logic
================================ */
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

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

/* ================================
   FAQ Accordion Logic
================================ */
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;

    // Optional: Close others when one opens (Accordion style)
    // document.querySelectorAll('.faq-item').forEach(i => {
    //   if (i !== item) i.classList.remove('active');
    // });

    item.classList.toggle('active');
  });
});

/* ================================
   Resume Preview Modal
================================ */
const resumeModal = document.getElementById('resumeModal');

function openResumePreview() {
  resumeModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeResumePreview() {
  resumeModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close on outside click
resumeModal.addEventListener('click', (e) => {
  if (e.target === resumeModal) {
    closeResumePreview();
  }
});
