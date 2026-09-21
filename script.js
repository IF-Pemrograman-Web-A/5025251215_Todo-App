let todos = [
    {
        name: "Jogging",
        description: "Pace 8 ga masalah yang penting keringetan",
        status: "Pending"
    },
    {
        name: "Bersihin Kos",
        description: "Sapu sapu, Ngepel, Sikat wc",
        status: "Completed"
    },
    {
        name: "Kelas Matdis",
        description: "Baangun jam 8 biar ga telat",
        status: "Completed"
    },
    {
        name: "Tugas bikin web Todo list",
        description: "Deadline 14 september jam 8 malam",
        status: "Pending"
    }
];


let selectedTask = 0;


const taskList = document.getElementById("taskList");

const addForm = document.getElementById("addForm");
const taskName = document.getElementById("taskName");
const taskDescription = document.getElementById("taskDescription");

const detailForm = document.getElementById("detailForm");
const detailName = document.getElementById("detailName");
const detailDescription = document.getElementById("detailDescription");
const detailStatusSelect = document.getElementById("detailStatusSelect");
const detailStatus = document.getElementById("detailStatus");

const deleteButton = document.getElementById("deleteButton");
const modeButton = document.getElementById("modeButton");


function showTasks() {

    taskList.innerHTML = "";

    todos.forEach(function(todo, index) {

        const task = document.createElement("div");

        task.className = "task";


        const statusClass = todo.status === "Completed"
            ? "done"
            : "pending";


        task.innerHTML = `
            <div>
                <input 
                    type="checkbox" 
                    class="check-task"
                    ${todo.status === "Completed" ? "checked" : ""}
                >

                <b>${todo.name}</b>

                <p>${todo.description}</p>
            </div>

            <div class="task-actions">

                <span class="${statusClass}">
                    ${todo.status}
                </span>

                <button type="button" class="edit-button">
                    Edit
                </button>

                <button type="button" class="delete-task">
                    Delete
                </button>

            </div>
        `;


        taskList.appendChild(task);


        const checkbox = task.querySelector(".check-task");


        checkbox.addEventListener("change", function() {

            if (checkbox.checked) {
                todos[index].status = "Completed";
            } else {
                todos[index].status = "Pending";
            }

            showTasks();
            showDetail(index);

        });


        const editButton = task.querySelector(".edit-button");


        editButton.addEventListener("click", function() {

            showDetail(index);

        });


        const deleteTask = task.querySelector(".delete-task");


        deleteTask.addEventListener("click", function() {

            todos.splice(index, 1);


            if (selectedTask >= todos.length) {
                selectedTask = todos.length - 1;
            }


            showTasks();


            if (todos.length > 0) {

                showDetail(selectedTask);

            } else {

                detailName.value = "";
                detailDescription.value = "";
                detailStatusSelect.value = "Pending";
                detailStatus.textContent = "Pending";

            }

        });

    });
}


function showDetail(index) {

    if (todos.length === 0) {
        return;
    }


    selectedTask = index;


    const todo = todos[index];


    detailName.value = todo.name;
    detailDescription.value = todo.description;
    detailStatusSelect.value = todo.status;
    detailStatus.textContent = todo.status;


    if (todo.status === "Completed") {

        detailStatus.style.backgroundColor = "#b9ddc4";

    } else {

        detailStatus.style.backgroundColor = "#f5df9b";

    }

}


addForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = taskName.value.trim();
    const description = taskDescription.value.trim();


    if (name === "" || description === "") {

        alert("Nama dan deskripsi tugas harus diisi.");

        return;
    }


    const newTodo = {
        name: name,
        description: description,
        status: "Pending"
    };


    todos.push(newTodo);


    taskName.value = "";
    taskDescription.value = "";


    showTasks();


    showDetail(todos.length - 1);

});


detailForm.addEventListener("submit", function(event) {

    event.preventDefault();


    if (todos.length === 0) {
        return;
    }


    todos[selectedTask].name = detailName.value;
    todos[selectedTask].description = detailDescription.value;
    todos[selectedTask].status = detailStatusSelect.value;


    showTasks();
    showDetail(selectedTask);

});


deleteButton.addEventListener("click", function() {

    if (todos.length === 0) {
        return;
    }


    todos.splice(selectedTask, 1);


    if (selectedTask >= todos.length) {
        selectedTask = todos.length - 1;
    }


    showTasks();


    if (todos.length > 0) {

        showDetail(selectedTask);

    } else {

        detailName.value = "";
        detailDescription.value = "";
        detailStatusSelect.value = "Pending";
        detailStatus.textContent = "Pending";

    }

});


modeButton.addEventListener("click", function() {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        modeButton.textContent = "Light Mode";

    } else {

        modeButton.textContent = "Dark Mode";

    }

});


showTasks();
showDetail(0);
