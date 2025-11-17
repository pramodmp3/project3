document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const navItems = document.querySelectorAll(".nav-item");

  // --- 1. Mobile Menu Toggle (Hamburger) ---
  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.contains("active");

    // Toggle 'active' classes for main menu and hamburger
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Close all dropdowns when the main menu is closed
    if (!isOpen) {
      // Open: Apply staggered animation delay
      navItems.forEach((item, index) => {
        // Apply a slight delay to each item for the staggered fade/slide effect
        item.style.transitionDelay = `${index * 0.05}s`;
      });
    } else {
      // Close: Remove delay and close all dropdowns
      navItems.forEach((item) => {
        item.style.transitionDelay = "0s"; // Reset delay on close
      });
      closeAllDropdowns();
    }
  });

  // --- 2. Dropdown Toggle Logic (Desktop & Mobile) ---
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click from bubbling up (e.g., to the main nav item)

      const parentItem = toggle.closest(".nav-item");
      const dropdownMenu = parentItem.querySelector(".dropdown-menu");

      // Check if the current dropdown is already open
      const isMenuOpen = dropdownMenu.classList.contains("open");

      // Close all other *mobile* dropdowns if opening a new one
      // Desktop hover handles its own state
      if (window.innerWidth <= 992 && !isMenuOpen) {
        closeAllDropdowns(parentItem);
      }

      // Toggle the current dropdown and icon
      toggle.classList.toggle("active", !isMenuOpen);
      dropdownMenu.classList.toggle("open", !isMenuOpen);
    });
  });

  // --- 3. Close Logic Function ---
  function closeAllDropdowns(excludeItem = null) {
    dropdownToggles.forEach((toggle) => {
      const parentItem = toggle.closest(".nav-item");
      const dropdownMenu = parentItem.querySelector(".dropdown-menu");

      if (parentItem !== excludeItem) {
        toggle.classList.remove("active");
        dropdownMenu.classList.remove("open");
      }
    });
  }

  // --- 4. Close mobile menu when a link is clicked ---
  document.querySelectorAll(".nav-link, .dropdown-item").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        // If the main menu is open on mobile, close it
        if (navMenu.classList.contains("active")) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          closeAllDropdowns();
        }
      }
    });
  });

  // --- 5. Window Resize Event for Desktop/Mobile Transition ---
  let isMobileView = window.innerWidth <= 992;
  window.addEventListener("resize", () => {
    const newIsMobileView = window.innerWidth <= 992;

    // If transitioning from mobile to desktop or vice versa
    if (isMobileView !== newIsMobileView) {
      // Ensure mobile menu is closed and styles are reset when switching to desktop
      if (!newIsMobileView) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        closeAllDropdowns();
      }
      isMobileView = newIsMobileView;
    }
  });
});
