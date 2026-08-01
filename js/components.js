function loadComponent(selector, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error("Could not load " + filePath);
            return response.text();
        })
        .then(html => {
            document.querySelector(selector).innerHTML = html;
            // Re-running theme toggle setup
            // (the button now exists in the DOM)
            if(selector === "#header-placeholder") {
                const savedTheme = localStorage.getItem("theme");
                document.body.setAttribute("data-theme", savedTheme);
                
                //Bootstrap navbar theme switch 
                const navbar = document.getElementById("myNav");
                if (navbar) {
                    navbar.setAttribute("data-bs-theme", savedTheme);
                }
                
                //Switching Bootstrap buttons for each theme
                const toggleBtn = document.getElementById("theme-toggle");
                if (toggleBtn) {
                    if (savedTheme === "dark") {
                        toggleBtn.className = "btn btn-light";
                        toggleBtn.textContent = "Light Mode";
                    } else {
                        toggleBtn.className = "btn btn-dark";
                        toggleBtn.textContent = "Dark Mode";
                    }
                    
                    toggleBtn.addEventListener("click", function() {
                        const currentTheme = document.body.getAttribute("data-theme");
                        const updatedTheme = currentTheme === "dark" ? "light" : "dark";
                        
                        document.body.setAttribute("data-theme", updatedTheme);
                        
                        //Updated Bootstrap navbar theme switch
                        const navbar = document.getElementById("myNav");
                        if (navbar) {
                            navbar.setAttribute("data-bs-theme", updatedTheme);
                        }
                        
                        //Updating Bootstrap buttons for each theme
                        if (updatedTheme === "dark") {
                            this.className = "btn btn-light";
                            this.textContent = "Light Mode";
                        } else {
                            this.className = "btn btn-dark";
                            this.textContent = "Dark Mode";
                        }
                        
                        localStorage.setItem("theme", updatedTheme);
                    });
                }
            }
        })
        .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("#header-placeholder", "components/header.html");
    loadComponent("#footer-placeholder", "components/footer.html");
});
