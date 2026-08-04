document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blogContainer");

  fetch("data/posts.json")
    .then(response => response.json())
    .then(posts => {

      // Sorting posts from newest to oldest
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("col-md-6");

        //Displaying date in reader-friendly format
        const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });

        // TODO: Populate postElement with the post data
        //Using Bootstrap to build blog cards and read more button

        postElement.innerHTML = `
            <div class="card h-100 bg-primary border-0 shadow-sm rounded-4">
                <div class="card-body d-flex flex-column">

                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="badge bg-primary">${post.category}</span>
                        ${index === 0 ? '<span class="badge bg-success">Latest Post</span>' : ''}
                    </div>

                    <h2 class="card-title h4 fw-bold mb-2">${post.title}</h2>

                    <p class="post-meta text-muted small mb-3">
                        <i class="bi bi-calendar-event me-1"></i> ${formattedDate}
                    </p>

                    <p class="card-text mb-3">${post.summary}</p>

                    <div class="full-content d-none mb-3">
                        <p class="card-text">${post.content}</p>
                    </div>

                    <button class="btn btn-outline-dark mt-auto read-more-btn">
                        Read More
                    </button>

                </div>
            </div>
        `;

        const button = postElement.querySelector(".read-more-btn");
        const content = postElement.querySelector(".full-content");

        button.addEventListener("click", function () {
          content.classList.toggle("d-none");

          if (content.classList.contains("d-none")) {
            button.textContent = "Read More";
          } else {
            button.textContent = "Show Less";
          }
        });

        blogList.appendChild(postElement);
      });
    })
    .catch(error => console.error("Error loading posts:", error));
});