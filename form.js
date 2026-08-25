const form = document.getElementById("form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Check required fields
    if (!firstName || !lastName || !email || !message) {
        showMessage("Please fill in all required fields.", "error");
        return;
    }

    // Save original button text
    const originalText = submitBtn.textContent;

    // Loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    // Combine first and last name
    formData.set("name", `${firstName} ${lastName}`);

    try {
        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (response.ok && data.success) {

            showMessage(
                "Thank you! Your message has been sent successfully.",
                "success"
            );

            // Clear form
            form.reset();

        } else {

            showMessage(
                data.message || "Something went wrong. Please try again.",
                "error"
            );
        }

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to send your message. Please check your internet connection and try again.",
            "error"
        );

    } finally {

        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});


// Message function
function showMessage(message, type) {

    // Remove previous message
    const oldMessage = document.querySelector(".form-message");

    if (oldMessage) {
        oldMessage.remove();
    }

    // Create message
    const messageBox = document.createElement("div");

    messageBox.className = `form-message ${type}`;
    messageBox.textContent = message;

    // Put message above the button
    submitBtn.parentNode.insertBefore(messageBox, submitBtn);

    // Automatically remove after 5 seconds
    setTimeout(() => {
        messageBox.remove();
    }, 5000);
}