document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("mode-toggle");
    const body = document.body;
    const preview = document.getElementById("interest-preview");
    const previewImage = document.getElementById("preview-image");
    const previewDescription = document.getElementById("preview-description");

    document.getElementById("current-year").textContent = new Date().getFullYear();

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        toggleButton.querySelector('.fa-moon').style.display = 'none';
        toggleButton.querySelector('.fa-sun').style.display = 'inline';
    }

    toggleButton.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        const isDarkMode = body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        
        const moonIcon = toggleButton.querySelector('.fa-moon');
        const sunIcon = toggleButton.querySelector('.fa-sun');
        if (isDarkMode) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline';
        } else {
            moonIcon.style.display = 'inline';
            sunIcon.style.display = 'none';
        }
    });

    document.querySelectorAll(".interests-list li").forEach(item => {
        item.addEventListener("mouseover", () => {
            const imagePath = item.getAttribute("data-image");
            const description = item.getAttribute("data-description");
            previewImage.src = imagePath;
            previewImage.style.display = "block";
            previewDescription.textContent = description;
            previewDescription.style.display = "block";
        });

        item.addEventListener("mouseout", () => {
            previewImage.style.display = "none";
            previewDescription.style.display = "none";
        });
    });
});
