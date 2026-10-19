const MODE_KEY = "todo-theme";
const modeButton = document.getElementById("modeButton");

function applyMode(mode) {
    if (mode === "dark") {
        document.body.classList.add("dark");
        modeButton.textContent = "🌙 Dark Mode";
    } else {
        document.body.classList.remove("dark");
        modeButton.textContent = "🌞 Light Mode";
    }
    localStorage.setItem(MODE_KEY, mode);
}

const savedMode = localStorage.getItem(MODE_KEY) || "light";
if(modeButton) applyMode(savedMode);

if(modeButton) {
    modeButton.addEventListener("click", function () {
        const current = document.body.classList.contains("dark") ? "dark" : "light";
        applyMode(current === "dark" ? "light" : "dark");
    });
}