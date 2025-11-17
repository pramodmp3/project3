document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

    mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("open");
    overlay.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", !isExpanded);

    body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  };

  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Dropdown arrow click
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    const arrow = toggle.querySelector(".dropdown-arrow");
    const dropdown = document.getElementById(
      toggle.getAttribute("data-dropdown")
    );

    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = dropdown.classList.contains("open");

      // Close others
      document.querySelectorAll(".dropdown-mobile.open").forEach((open) => {
        if (open !== dropdown) {
          open.classList.remove("open");
          open.previousElementSibling.classList.remove("active");
          open.previousElementSibling.setAttribute("aria-expanded", "false");
        }
      });

      dropdown.classList.toggle("open");
      toggle.classList.toggle("active");
      toggle.setAttribute("aria-expanded", dropdown.classList.contains("open"));
    });

    // Text click navigates normally
    toggle.addEventListener("click", (e) => {
      if (e.target.closest(".dropdown-arrow")) return;
      if (mobileMenu.classList.contains("open")) toggleMenu();
    });
  });

  // Close mobile menu on normal link click
  document
    .querySelectorAll(".nav-mobile a:not(.dropdown-toggle)")
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("open")) toggleMenu();
      });
    });
});
