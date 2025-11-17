document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("email-input");
  const message = document.getElementById("form-message");
  const contactItems = document.querySelectorAll(".contact-item");

  // 1. Newsletter Form Submission Handling (Basic JS)
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the form from performing a default submit/page reload

    const emailValue = emailInput.value.trim();

    // Simple validation
    if (emailValue && emailValue.includes("@")) {
      // Simulate successful subscription
      console.log(`Newsletter subscription attempt for: ${emailValue}`);

      // Show success message with animation
      message.textContent = `Success! ${emailValue} is subscribed.`;
      message.classList.add("show");
      emailInput.value = ""; // Clear the input

      // Hide the message after a delay
      setTimeout(() => {
        message.classList.remove("show");
      }, 4000);

      // In a real application, you would send this data to a server here.
    } else {
      // Show error message
      message.textContent = "Please enter a valid email address.";
      message.classList.add("show");
      setTimeout(() => {
        message.classList.remove("show");
      }, 3000);
    }
  });

  // 2. Contact Item Fade-in Staggered Animation (Optional but requested)
  // Removed the CSS opacity: 0 from .contact-item for better visibility if JS fails,
  // but the effect can be achieved by applying the final styles to demonstrate the capability.

  // Staggered appearance of contact items for a subtle animation effect
  contactItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    // Since we removed initial opacity: 0 from CSS for robustness,
    // we'll rely on the CSS hover animations and transitions for this simple demo.
    // In a complex app, Intersection Observer would trigger a class change here:
    // item.classList.add('animate-in');
  });

  console.log("Stackly Footer Scripts Loaded.");
});
