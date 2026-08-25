document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".volunteer-form");
    const cvInput = document.getElementById("inputGroupFile02");
    const submitButton = form.querySelector('button[type="submit"]');
    const cvLabel = document.querySelector(
        'label[for="inputGroupFile02"]'
    );


    // 1. Show selected CV filename
    cvInput.addEventListener("change", function () {

        if (cvInput.files.length > 0) {
            cvLabel.textContent = cvInput.files[0].name;
        } else {
            cvLabel.textContent = "Upload your CV";
        }

    });


    // 2. Change button to "Submitting..."
    // 3. Clear form after submission starts
    form.addEventListener("submit", function () {

        submitButton.textContent = "Submitting...";
        submitButton.disabled = true;

        // Let the browser/Formly capture the form data first,
        // then clear the fields.
        setTimeout(function () {

            form.reset();

            // Restore CV label
            cvLabel.textContent = "Upload your CV";

        }, 0);

    });

});