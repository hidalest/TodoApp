"use strict";

const body = document.querySelector("body");
const darkModeToggle = document.querySelector(".image--darkMode");
const checkBoxBtn = document.querySelector(".checkbox--group-input");
const form = document.querySelector(".form");
const taskInput = document.querySelector(".form--new-task");
const sectionTasks = document.querySelector(".section--tasks");
const taskResume = document.querySelector(".tasks--resume");
const taskMenu = document.querySelector(".tasks--menu");
const counter = document.querySelector(".tasks--left");
const btnActive = document.querySelectorAll(".tasks--menu-active");
const btnCompleted = document.querySelectorAll(".tasks--menu-completed");
const btnAll = document.querySelectorAll(".tasks--menu-all");
const btnClear = document.querySelector(".tasks--clear");

class Task {
  isActive = true;
  id = Date.now();
  constructor(taskDescription) {
    this.taskDescription = taskDescription;
  }
}

// const task1 = new Task("Comer Galletas");
// console.log(task1);

class App {
  tasks = [];
  constructor() {
    form.addEventListener("submit", this.addNewTask.bind(this));
    darkModeToggle.onclick = this.darkModeToggle;
    sectionTasks.onclick = this.markTask.bind(this);

    Array.from(btnActive).forEach(
      (b) =>
        (b.onclick = (e) => {
          this.showFilteredEl("active", b);
        })
    );

    Array.from(btnCompleted).forEach(
      (b) =>
        (b.onclick = (e) => {
          this.showFilteredEl("completed", b);
        })
    );
    Array.from(btnAll).forEach(
      (b) =>
        (b.onclick = (e) => {
          this.showFilteredEl("all", b);
        })
    );

    btnClear.onclick = this.clearCompleted.bind(this);
    this.filterTasks(true);
    this.getLocalStorage();
  }

  addNewTask(e) {
    e.preventDefault();
    e.stopPropagation();

    let error = false;

    if (taskInput.value === "") {
      form.classList.add("error");
      error = true;
    } else form.classList.remove("error");

    if (error) return;

    const task = new Task(taskInput.value);
    this.tasks.unshift(task);
    taskInput.value = "";
    this.insertNewTask(task);
    this.setLocalStorage();

    return false;
  }

  insertNewTask(t) {
    // this.#activeTasks();
    const div1 = document.createElement("div");
    div1.classList.add("task");
    div1.setAttribute("data-id", t.id);
    div1.innerHTML = `<div class="task--info">
      <label class="checkbox--group">
      <input type="checkbox" class="checkbox--group-input" />
      <span class="checkbox--group-button"></span>
      </label>

      <p>${t.taskDescription}</p>
      </div>

      <div class="task--close">
      <i class="fas fa-times fa-2x"></i>
      </div>`;
    sectionTasks.prepend(div1);

    this.filterTasks(true);
  }

  refreshTaskContainer(tasks) {
    // sectionTasks is the container of the tasks
    sectionTasks.innerHTML = "";
    tasks.forEach((t) => {
      const html = `
      <div class="task" data-id=${t.id}>
      <div class="task--info">
      <label class="checkbox--group">
      <input type="checkbox" class="checkbox--group-input" />
      <span class="checkbox--group-button"></span>
      </label>
      <p>${t.taskDescription}</p>
      </div>
      <div class="task--close">
      <i class="fas fa-times fa-2x"></i>
      </div>
      </div>
      `;
      sectionTasks.insertAdjacentHTML("beforeend", html);
    });
  }

  darkModeToggle(e) {
    body.classList.toggle("dark-body");
    const button = darkModeToggle.getAttribute("src");
    if (button.indexOf("./images/icon-moon.svg") == 0) {
      darkModeToggle.setAttribute("src", "./images/icon-sun.svg");
    } else {
      darkModeToggle.setAttribute("src", "./images/icon-moon.svg");
    }

    form.classList.toggle("dark-content");
    taskInput.classList.toggle("dark-content");
    sectionTasks.classList.toggle("dark-content");
    taskResume.classList.toggle("dark-content");
    taskMenu.classList.toggle("dark-content");
  }

  filterTasks(status) {
    const active = this.tasks.filter((task) => task.isActive === status);

    if (status) counter.innerHTML = `${active.length} items left`;
    else counter.innerHTML = `${active.length} items done`;

    return active;
  }

  showFilteredEl(status, btn) {
    const allEl = document.querySelectorAll(".task");
    const activeEl = document.querySelectorAll(".task:not(.task--done)");
    const completedEl = document.querySelectorAll(".task--done");
    allEl.forEach((el) => el.classList.remove("hide"));

    if (status === "active") {
      completedEl.forEach((el) => el.classList.add("hide"));
    }
    if (status === "completed") {
      activeEl.forEach((el) => el.classList.add("hide"));
    }
    if (status === "all") {
      allEl.forEach((el) => el.classList.remove("hide"));
    }

    document.querySelectorAll(".task--menu-item").forEach((btn) => {
      btn.classList.remove("tasks--menu-actual");
    });
    btn.classList.add("tasks--menu-actual");
  }

  clearCompleted() {
    const cTasks = this.tasks.filter((el) => el.isActive !== false);
    this.tasks = cTasks;
    this.refreshTaskContainer(this.tasks);
    this.setLocalStorage();

    console.log(cTasks);
  }

  markTask(e) {
    const taskEl = e.target.closest(".task");
    const check = taskEl.querySelector(".checkbox--group-input");
    const nTask = this.tasks.find((el) => el.id == taskEl.dataset.id);
    if (!taskEl) return;

    taskEl.classList.toggle("task--selected");
    taskEl.classList.toggle("task--done");
    check.checked == false ? (check.checked = true) : (check.checked = false);

    if (check.checked) {
      taskEl.classList.add("task--done");
      taskEl.classList.add("task--selected");
    } else {
      taskEl.classList.remove("task--done");
      taskEl.classList.remove("task--selected");
    }

    nTask.isActive == true ? (nTask.isActive = false) : (nTask.isActive = true);

    this.filterTasks(true);
  }

  setLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);
    if (!data) return;
    this.tasks = data;
    this.tasks.forEach((el) => this.insertNewTask(el));
  }

  reset() {
    localStorage.removeItem("tasks");
  }
}

const app = new App();
