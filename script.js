const storedData = localStorage.getItem("my-tasks");
const tasks = storedData ? JSON.parse(storedData) : [
    { task: "Learn JS", isDone: false }
];

const taskList = document.getElementById("my-task-list");
const addButton = document.getElementById("task-add-btn");
const taskInput = document.getElementById("task-input");

function addTask(taskText) {
    const text = taskText;
    const task = { task: text, isDone: false };
    tasks.push(task);

    const listItem = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = text;
    listItem.append(taskSpan);

    const deleteBtn = document.createElement("Button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    listItem.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        listItem.remove();
    });

    listItem.addEventListener("click", () => {
        task.isDone = !task.isDone;
        if (task.isDone) {
            taskSpan.style.textDecoration = "line-through";
        } else {
            taskSpan.style.textDecoration = "none";
        }
        saveData();
    });

    taskList.appendChild(listItem);
    saveData();
};


addButton.addEventListener("click", () => {
    addTask(taskInput.value);
    taskInput.value = "";
});

tasks.forEach( (item) => {
    const listItem = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = item.task;
    listItem.appendChild(taskSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        listItem.remove();

        const index = tasks.indexOf(item);
        if (index > -1) {
            tasks.splice(index, 1);
        }
        saveData();
    });

    listItem.appendChild(deleteBtn);

    if (item.isDone) {
        taskSpan.style.textDecoration = "line-through";
    }

    listItem.addEventListener("click", () => {
        item.isDone = !item.isDone;
        if (item.isDone) {
            taskSpan.style.textDecoration = "line-through";
        } else {
            taskSpan.style.textDecoration = "none";
        }
        saveData();
    });

    taskList.appendChild(listItem);
});

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask(taskInput.value);
        taskInput.value = "";
    }
});

function saveData() {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
}