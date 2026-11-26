const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("theme");
const prefersDarkMode =
    savedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches;

function setDarkMode(enabled) {
    document.body.classList.toggle("dark-mode", enabled);

    if (!themeToggle || !themeIcon) {
        return;
    }

    themeToggle.setAttribute("aria-pressed", String(enabled));
    themeIcon.textContent = enabled ? "\u2600" : "\u263E";
}

setDarkMode(savedTheme === "dark" || prefersDarkMode);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const enabled = !document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", enabled ? "dark" : "light");
        setDarkMode(enabled);
    });
}
