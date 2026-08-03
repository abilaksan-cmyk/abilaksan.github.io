document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
        // TODO: Find or create an error element next to the field
        // TODO: Set its text to message and make it visible
        let error = field.nextElementSibling;
        if (!error || !error.classList.contains("error-msg")) {
            error = document.createElement("span");
            error.className = "error-msg";
            field.parentNode.insertBefore(error, field.nextSibling);
        }
        error.textContent = message;
    }   

    function clearError(fieldId) {
        // TODO: Hide or clear the error message for this field
        const field = document.getElementById(fieldId);
        const error = field.nextElementSibling;
        field.style.border = "";

        if (error && error.classList.contains("error-msg")) {
            error.style.display = "none";
            error.textContent = "";
        }
    }

    function validateEmail(email) {
        // TODO: Return true if email matches a valid format, false otherwise
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // TODO: Validate name — show error if empty
         if (name === "") {
            showError("name", "Please enter your name.");
            isValid = false;
        } else {
            clearError("name");
        }
        // TODO: Validate email — show error if empty or invalid format
        if (email === "") {
            showError("email", "Please enter your email address.");
            isValid = false;
        } else if (!validateEmail(email)) {
            showError("email", "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError("email");
        }
        // TODO: Validate message — show error if fewer than 20 characters
         if (message === "") {
            showError("message", "Please enter a message.");
            isValid = false;
        } else if (message.length < 20) {
            showError("message", "Message needs to be at least 20 characters.");
            isValid = false;
        } else {
            clearError("message");
        }
        // TODO: If isValid is true, show a success message
        if (isValid) {
            form.style.display = "none";
            
            const successMessage = document.createElement("div");
            
            successMessage.innerHTML = `
                <h3>Thanks!</h3>
                <p>Your message was sent!</p>
            `;
            
            form.parentNode.insertBefore(successMessage, form);
        }
    });

    // Bonus: clear errors as the user types
    ["name", "email", "message"].forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () {
            clearError(id);
        });
    });
});