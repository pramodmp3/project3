document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownItems = document.querySelectorAll(".nav-item.dropdown");

  const isMobileView = () => window.innerWidth <= 1024;

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");

    if (!navMenu.classList.contains("active")) {
      dropdownItems.forEach((item) => item.classList.remove("open"));
    }
  });

  // Mobile dropdown toggle
  dropdownItems.forEach((item) => {
    const link = item.querySelector(".nav-link");

    link.addEventListener("click", (e) => {
      if (!isMobileView()) return; // desktop: normal behavior

      const clickX = e.offsetX;
      const linkWidth = link.offsetWidth;

      // Click on right side (icon)
      if (clickX > linkWidth - 40) {
        e.preventDefault(); // prevent navigation
        const isOpen = item.classList.contains("open");

        // Close other dropdowns
        dropdownItems.forEach((other) => {
          if (other !== item) other.classList.remove("open");
        });

        item.classList.toggle("open", !isOpen);
      }
      // else: click on text, allow navigation
    });
  });

  // Reset menu on resize
  window.addEventListener("resize", () => {
    if (!isMobileView()) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      dropdownItems.forEach((item) => item.classList.remove("open"));
    }
  });
});
