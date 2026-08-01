document.addEventListener("DOMContentLoaded", function () {
    
    const toggleBtn = document.getElementById("theme-toggle");
 
    function applyTheme(theme) {
        document.body.setAttribute("data-theme", theme);

        //Bootstrap navbar theme switch 
        const navbar = document.getElementById("myNav");
        if (navbar) {
            navbar.setAttribute("data-bs-theme", theme);
        }
       
        //Switching Bootstrap buttons for each theme
        if (theme === "dark") {
            toggleBtn.className = "btn btn-light";
            toggleBtn.textContent = "Light Mode";
        } else {
            toggleBtn.className = "btn btn-dark";
            toggleBtn.textContent = "Dark Mode";
        }
 
        //Save the selected theme to localStorage
        localStorage.setItem("theme", theme);
 
    }
 
    function loadSavedTheme() {
        // Read the saved theme from localStorage
        const savedTheme = localStorage.getItem("theme");

        // If a value exists, call applyTheme() with it
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme("dark"); // If nothing is saved, fall back to a default theme (e.g., "light")
        }
    }
 
    toggleBtn.addEventListener("click", function () {
        // Determine the current theme and toggle to the opposite one 
        const currentTheme = document.body.getAttribute("data-theme");
        const updatedTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(updatedTheme);
 
    });
 
    loadSavedTheme(); // Run on every page load
});