document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Hero Section Entrance Animations (JS) ---

  const headlineElement = document.getElementById("headline-text");
  const headlineText = "Manufacturing the Future of Medicine";
  const subheadlineElement = document.querySelector(".subheadline");
  const ctaButton = document.querySelector(".cta-button");
  const heroImageContainer = document.querySelector(".hero-image-container");

  // Text Typing/Entrance Effect
  function typeText(element, text, delay = 75) {
    let i = 0;
    element.style.opacity = 1;

    // Set a minimum height before starting to prevent jump
    element.style.minHeight = element.offsetHeight + "px";
    element.textContent = ""; // Clear for typing effect

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          resolve();
        }
      }, delay);
    });
  }

  // Sequence the hero entrance animations
  async function animateHero() {
    // 1. Headline typing
    await typeText(headlineElement, headlineText, 60);

    // 2. Subheadline fade-in
    subheadlineElement.style.transition = "opacity 1s ease 0.2s";
    subheadlineElement.style.opacity = 1;

    // 3. CTA button slide-up/fade-in
    ctaButton.style.transition =
      "opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s";
    ctaButton.style.opacity = 1;
    ctaButton.style.transform = "translateY(0)";

    // 4. Hero image fade-in
    heroImageContainer.style.transition =
      "opacity 1s ease 1s, transform 1s ease 1s";
    heroImageContainer.style.opacity = 1;
    heroImageContainer.style.transform = "translateY(0)";
  }

  // Set initial states for JS controlled elements (overriding CSS opacity: 0)
  headlineElement.style.opacity = 0;
  subheadlineElement.style.opacity = 0;
  ctaButton.style.opacity = 0;
  ctaButton.style.transform = "translateY(20px)";
  heroImageContainer.style.opacity = 0;
  heroImageContainer.style.transform = "translateY(20px)";

  animateHero();

  // --- 2. Scroll Animations (Intersection Observer) ---

  const cardsToAnimate = document.querySelectorAll(
    ".card-animated, .info-card-animated"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay =
            parseFloat(element.getAttribute("data-animation-delay")) || 0;

          // Use a timeout to apply the delay before adding the 'show' class
          setTimeout(() => {
            element.classList.add("show");
          }, delay * 1000);

          observer.unobserve(element);
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.2, // Trigger when 20% of the item is visible
    }
  );

  cardsToAnimate.forEach((card) => {
    observer.observe(card);
  });

  // --- 3. Client Carousel Animation (JS) ---

  const carousel = document.getElementById("client-carousel");
  const logos = carousel.querySelectorAll(".client-logo");

  // Duplicate logos for seamless scrolling
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    carousel.appendChild(clone);
  });

  // Apply the CSS animation for continuous scroll
  carousel.style.animation = "scrollClients 30s linear infinite";

  // Pause animation on hover
  carousel.addEventListener("mouseenter", () => {
    carousel.style.animationPlayState = "paused";
  });
  carousel.addEventListener("mouseleave", () => {
    carousel.style.animationPlayState = "running";
  });

  console.log("Stackly Home Page scripts initialized.");
});
