
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") document.body.classList.add("dark-theme");

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    });

    document.getElementById("lang-en").addEventListener("click", () => loadLanguage("en"));
    document.getElementById("lang-zh").addEventListener("click", () => loadLanguage("zh"));
    loadLanguage(localStorage.getItem("lang") || "zh");
});

function loadLanguage(lang) {
    fetch('/assets/i18n/' + lang + '.json')
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                el.textContent = data[key] || key;
            });
            localStorage.setItem("lang", lang);
        });
}
