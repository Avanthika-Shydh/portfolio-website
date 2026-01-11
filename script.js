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
   Navbar Subtle Shadow on Scroll
   (Light theme friendly)
================================ */
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
  } else {
    nav.style.boxShadow = "none";
  }
});
