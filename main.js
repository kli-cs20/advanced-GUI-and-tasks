// My Tasks Basic

// HTML Elements
let taskInputEl = document.getElementById("task-input");
let tasksEl = document.getElementById('tasks');

// Global Variables
let tasks = loadTasks();
displayAll();

// Go Btn - Menu Listener
taskInputEl.addEventListener('keydown', taskSubmitHandler);

function taskSubmitHandler(e) {
  if (e.code === "Enter") {
    // Add Submitted Task
    let userTask = taskInputEl.value;
    tasks.push(newTask(userTask));
    saveTasks();
    displayAll();
    taskInputEl.value = "";
  }
}

// MENU FUNCTIONS
function toggleTask() {
  let index = +prompt("Enter # of task: ");
  let task = tasks[index];
  if (task.completed === "") {
    task.completed = "completed";
  } else {
    task.completed = "";
  }
  saveTasks();
  displayAll();
}

function removeTask() {
  let index = +prompt("Enter # of task: ");
  if (index >= 0 && index < tasks.length) {
    // VALID INDEX -> remove
    tasks.splice(index, 1);
  } else {
    alert("Invalid task #");
  }
  saveTasks();
  displayAll();
}

// Clear all tasks
function clearAll() {
  tasks = [];
  
  saveTasks();
  displayAll();
}

// HELPER FUNCTIONS
// Return new task object
function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: ""
  };
}

// Display all tasks in global tasks array
function displayAll() {
  for (let i = 0; i < tasks.length; i++) {
    tasksEl.appendChild(getTaskHTML(tasks[i], i));
  }
}

// Get html for task
function getTaskHTML(task, i) {
  // Use JavaScript to build Task <div>

  // Check Box Element
  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  
  // Task Description Text Node
  let textEl = document.createTextNode(task.description);

  // Remove Button
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Remove";

  // Add Everythin to a div element
  let divEl = document.createElement("div");

  divEl.appendChild(checkboxEl);
  divEl.appendChild(textEl);
  divEl.appendChild(buttonEl);

  return divEl;
}

// Save global tasks in local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  let taskStr = localStorage.getItem("tasks");
  return JSON.parse(taskStr) ?? [];
}