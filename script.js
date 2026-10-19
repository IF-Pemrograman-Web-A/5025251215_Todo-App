const DB_NAME = "TodoAppDB";
const DB_VERSION = 1;
const STORE_NAME = "todos";
const MODE_KEY = "todo-theme";
let db;
let selectedTaskId = null;

const request = indexedDB.open(DB_NAME, DB_VERSION);
request.onerror = (event) => console.error("Database error: " + event.target.errorCode);
request.onsuccess = (event) => {
    db = event.target.result;
    showTasks();
};
request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
};

const taskList = document.getElementById("taskList");
const addForm = document.getElementById("addForm");
const detailForm = document.getElementById("detailForm");
const deleteButton = document.getElementById("deleteButton");
const modeButton = document.getElementById("modeButton");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");
const detailImage = document.getElementById("detailImage");

function getAllTodos() {
    return new Promise((resolve) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
    });
}

function saveTodo(todo) {
    return new Promise((resolve) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const req = store.put(todo);
        req.onsuccess = () => resolve();
    });
}

function deleteTodoDB(id) {
    return new Promise((resolve) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
    });
}

async function showTasks() {
    taskList.innerHTML = "";
    const todos = await getAllTodos();

    if (todos.length === 0) {
        taskList.innerHTML = "<p>Belum ada tugas.</p>";
        clearDetail();
        return;
    }

    todos.forEach(function (todo) {
        const task = document.createElement("div");
        task.className = "task";
        task.setAttribute("role", "listitem");

        const statusClass = todo.status === "Completed" ? "done" : "pending";
        let imgHtml = todo.image ? `<img src="${todo.image}" alt="Gambar ${todo.name}">` : "";

        task.innerHTML = `
            <div class="task-content">
                ${imgHtml}
                <div>
                    <input type="checkbox" class="check-task" ${todo.status === "Completed" ? "checked" : ""} aria-label="Tandai selesai">
                    <b>${todo.name}</b>
                    <p>${todo.description}</p>
                </div>
            </div>
            <div class="task-actions">
                <span class="${statusClass}">${todo.status}</span>
                <button type="button" class="edit-button" aria-label="Edit tugas ${todo.name}">Edit</button>
                <button type="button" class="delete-task" aria-label="Hapus tugas ${todo.name}">Delete</button>
            </div>
        `;

        taskList.appendChild(task);

        task.querySelector(".check-task").addEventListener("change", async (e) => {
            todo.status = e.target.checked ? "Completed" : "Pending";
            await saveTodo(todo);
            showTasks();
            if(selectedTaskId === todo.id) showDetail(todo.id);
        });

        task.querySelector(".edit-button").addEventListener("click", () => {
            showDetail(todo.id);
        });

        task.querySelector(".delete-task").addEventListener("click", async () => {
            await deleteTodoDB(todo.id);
            if (selectedTaskId === todo.id) clearDetail();
            showTasks();
        });
    });
}

async function showDetail(id) {
    if (!id) return;
    const todos = await getAllTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    selectedTaskId = id;
    document.getElementById("detailName").value = todo.name;
    document.getElementById("detailDescription").value = todo.description;
    document.getElementById("detailStatusSelect").value = todo.status;
    document.getElementById("detailStatus").textContent = todo.status;
    document.getElementById("detailStatus").style.backgroundColor = todo.status === "Completed" ? "#b9ddc4" : "#f5df9b";

    if (todo.image) {
        detailImage.src = todo.image;
        imagePreviewContainer.style.display = "block";
    } else {
        imagePreviewContainer.style.display = "none";
    }
}

function clearDetail() {
    selectedTaskId = null;
    detailForm.reset();
    document.getElementById("detailStatus").textContent = "Pending";
    document.getElementById("detailStatus").style.backgroundColor = "#f5df9b";
    imagePreviewContainer.style.display = "none";
}

addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const name = document.getElementById("taskName").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const notifyTime = document.getElementById("taskNotifyTime").value;
    const imageFile = document.getElementById("taskImage").files[0];

    function createTodo(imageBase64) {
        const newTodo = { name, description, status: "Pending", image: imageBase64, notifyTime };
        saveTodo(newTodo).then(() => {
            addForm.reset();
            showTasks();
            if (notifyTime) {
                requestNotificationPermission(notifyTime, name);
            }
        });
    }

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (event) => createTodo(event.target.result);
        reader.readAsDataURL(imageFile);
    } else {
        createTodo(null);
    }
});

detailForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!selectedTaskId) return;

    const todos = await getAllTodos();
    const todo = todos.find(t => t.id === selectedTaskId);
    
    todo.name = document.getElementById("detailName").value;
    todo.description = document.getElementById("detailDescription").value;
    todo.status = document.getElementById("detailStatusSelect").value;

    await saveTodo(todo);
    showTasks();
    showDetail(selectedTaskId);
});

deleteButton.addEventListener("click", async function() {
    if (!selectedTaskId) return;
    if(confirm("Yakin mau hapus tugas ini?")) {
        await deleteTodoDB(selectedTaskId);
        clearDetail();
        showTasks();
    }
});

function applyMode(mode) {
    if (mode === "dark") {
        document.body.classList.add("dark");
        modeButton.textContent = "🌙 Dark Mode";
        modeButton.setAttribute("aria-label", "Ganti ke Light Mode");
    } else {
        document.body.classList.remove("dark");
        modeButton.textContent = "🌞 Light Mode";
        modeButton.setAttribute("aria-label", "Ganti ke Dark Mode");
    }
    localStorage.setItem(MODE_KEY, mode);
}

const savedMode = localStorage.getItem(MODE_KEY) || "light";
applyMode(savedMode);

modeButton.addEventListener("click", function () {
    const current = document.body.classList.contains("dark") ? "dark" : "light";
    applyMode(current === "dark" ? "light" : "dark");
});

async function requestNotificationPermission(notifyTime, taskName) {
    if (!("Notification" in window)) {
        alert("Browser ini tidak mendukung notifikasi desktop.");
        return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const now = new Date().getTime();
        const target = new Date(notifyTime).getTime();
        const delay = target - now;

        if (delay > 0) {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'SCHEDULE_NOTIFICATION',
                    delay: delay,
                    title: 'Pengingat Tugas!',
                    body: `Jangan lupa kerjakan: ${taskName}`
                });
            }
            alert(`Notifikasi dijadwalkan dalam ${Math.round(delay/60000)} menit.`);
        } else {
            alert("Waktu notifikasi sudah lewat atau tidak valid.");
        }
    } else {
        alert("Izin notifikasi ditolak. Tugas tetap disimpan tanpa notifikasi.");
    }
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(reg => console.log("Service Worker Registered", reg))
            .catch(err => console.error("Service Worker Failed", err));
    });
}
