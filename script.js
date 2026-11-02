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

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if(installBtn) installBtn.style.display = "block";
});

if(installBtn) {
    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        deferredPrompt = null;
        installBtn.style.display = "none";
    });
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/todo/sw.js") 
            .then(reg => console.log("Service Worker Registered", reg))
            .catch(err => console.error("Service Worker Failed", err));
    });
}