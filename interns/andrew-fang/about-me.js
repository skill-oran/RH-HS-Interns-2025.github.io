document.addEventListener("DOMContentLoaded", function () {
    console.log("Andrew Fang's portfolio");

    const footer = document.querySelector("footer p");
    footer.style.fontStyle = "italic";
    footer.style.transition = "color 0.5s ease";

    footer.addEventListener("mouseover", () => {
        footer.style.color = "yellow";
    });

    footer.addEventListener("mouseout", () => {
        footer.style.color = "aliceblue";
    });

    const toggleButton = document.getElementById("mode-toggle");
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
