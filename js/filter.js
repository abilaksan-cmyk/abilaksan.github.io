document.addEventListener("DOMContentLoaded", function () {
    const noResults = document.getElementById("no-results");
    const categoryButtons = document.querySelectorAll(".category-btn");

    // Adjust the selector to match your card markup
    const cards = document.querySelectorAll(".project-card");

    function filterCards(query) {
        query = query.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(function (card) {
            // TODO: Read the title and category (or description) from the card
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            const description = card.querySelector(".card-text").textContent.toLowerCase();

            // TODO: Show the card if query matches title OR category/description, hide it otherwise
            if (title.includes(query) || description.includes(query)) {
                card.style.display = ""; 
                visibleCount++; 
            } else {
                card.style.display = "none"; 
            }
        });

        // TODO: Show noResults element if visibleCount === 0, hide it otherwise
        if (visibleCount === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    }

    // Filter with Category buttons
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");

            // Active button 
            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            this.classList.add("active");

            filterCards(category);
        });
    });
});
