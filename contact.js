// Utility: small helper for adding/removing classes
const add = (el, cls) => el.classList.add(cls);
const remove = (el, cls) => el.classList.remove(cls);

// Entrance animations on scroll: map and info cards
// Uses IntersectionObserver to add subtle animation classes when visible
document.addEventListener("DOMContentLoaded", () => {
  const mapWrap = document.querySelector(".map-wrap");
  const infoCard = document.querySelector(".info-card");
  const mapCard = document.querySelector(".map-card");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          entry.target.style.opacity = "1";
        }
      });
    },
    { threshold: 0.15 }
  );

  // Map/info subtle reveal: they already have initial animations; we pause until in view
  [mapWrap, infoCard, mapCard].forEach((el) => {
    if (!el) return;
    el.style.animationPlayState = "paused";
    el.style.opacity = "0";
    io.observe(el);
  });

  // Animated placeholders: nudge text when focusing
  const inputs = document.querySelectorAll(
    ".contact-form input[type='text'], .contact-form input[type='email'], .contact-form input[type='tel'], .contact-form input[type='file'], .contact-form textarea"
  );
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.placeholder = input.placeholder ? " " + input.placeholder : "";
    });
    input.addEventListener("blur", () => {
      input.placeholder = input.placeholder?.trim();
    });
  });

  // Simulated form submission with validation and animated success/error message
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const showStatus = (type, message) => {
    status.textContent = message;
    status.className = `form-status ${type} show`;
    // Hide after a delay
    setTimeout(() => {
      remove(status, "show");
      add(status, "hide");
      setTimeout(() => {
        status.className = "form-status";
        status.textContent = "";
      }, 320);
    }, 2400);
  };

  // Show error under field
  const fieldError = (field, show, message) => {
    const errorEl = field.parentElement.querySelector(".error-msg");
    if (!errorEl) return;
    if (message) errorEl.textContent = message;
    errorEl.style.display = show ? "block" : "none";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    let valid = true;

    // Basic validations (demo)
    if (!name) {
      valid = false;
      fieldError(form.name, true, "Please enter your name.");
    } else fieldError(form.name, false);

    if (!validateEmail(email)) {
      valid = false;
      fieldError(form.email, true, "Please enter a valid email.");
    } else fieldError(form.email, false);

    // Optional phone: if present, do a light check
    if (phone && phone.replace(/\D/g, "").length < 10) {
      valid = false;
      fieldError(form.phone, true, "Please enter a valid phone number.");
    } else fieldError(form.phone, false);

    if (!subject) {
      valid = false;
      fieldError(form.subject, true, "Subject can’t be empty.");
    } else fieldError(form.subject, false);

    if (!message) {
      valid = false;
      fieldError(form.message, true, "Message can’t be empty.");
    } else fieldError(form.message, false);

    // Neon pulse on button to indicate action
    const btn = form.querySelector(".neon-btn");
    btn.style.animation = "pulseGlow 1.6s ease-in-out infinite";

    if (!valid) {
      showStatus("error", "Please fix the errors and try again.");
      btn.style.animation = ""; // stop animation after feedback
      return;
    }

    // Simulate async submission
    btn.disabled = true;
    btn.textContent = "Sending...";
    setTimeout(() => {
      // Reset visual state
      btn.disabled = false;
      btn.textContent = "Send Message";
      btn.style.animation = "";

      // Clear form (demo)
      form.reset();

      // Success toast animation
      showStatus("success", "Message sent successfully!");
    }, 1200);
  });
});
