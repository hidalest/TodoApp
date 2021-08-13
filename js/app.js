"use strict";

const body = document.querySelector("body");
const darkModeToggle = document.querySelector(".image--darkMode");
const checkBoxBtn = document.querySelector(".form__check-input");
const form = document.querySelector(".form");
const taskInput = document.querySelector(".form--new-task");
const sectionTasks = document.querySelector(".section--tasks");
const taskResume = document.querySelector(".tasks--resume");
const taskMenu = document.querySelector(".tasks--menu");

darkModeToggle.addEventListener("click", (e) => {
  body.classList.toggle("dark-body");
  const button = darkModeToggle.getAttribute("src");
  if (button.indexOf("/images/icon-moon.svg") == 0) {
    darkModeToggle.setAttribute("src", "/images/icon-sun.svg");
  } else {
    darkModeToggle.setAttribute("src", "/images/icon-moon.svg");
  }

  form.classList.toggle("dark-content");
  taskInput.classList.toggle("dark-content");
  sectionTasks.classList.toggle("dark-content");
  taskResume.classList.toggle("dark-content");
  taskMenu.classList.toggle("dark-content");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkBoxBtn.checked = true;

  setInterval(() => {
    checkBoxBtn.checked = false;
    taskInput.value = "";
  }, 1000);
});
