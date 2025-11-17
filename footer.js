document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletter-form");
  const submitButton = document.getElementById("newsletter-submit");
  const originalText = submitButton.textContent;
  const originalShadow = submitButton.style.boxShadow;

  // Add a simple interaction for the newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable button and provide visual feedback
      submitButton.disabled = true;
      submitButton.textContent = "Subscribing...";
      submitButton.style.backgroundColor = "#18774e"; // Darker green feedback
      submitButton.style.boxShadow = "none";

      // Simulate network delay
      setTimeout(() => {
        // Reset to original state
        submitButton.textContent = "Subscribed!";
        submitButton.style.backgroundColor = "var(--neon-green)";
        submitButton.style.boxShadow = "var(--neon-shadow-lite)"; // Reset to original subtle glow

        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.boxShadow = originalShadow; // Reset the box shadow
          submitButton.disabled = false;
          newsletterForm.reset();
        }, 1000);

        // You would typically send data to a server here.
        console.log(
          "Newsletter submitted with email:",
          document.getElementById("email-input").value
        );
      }, 2000);
    });
  }
});
