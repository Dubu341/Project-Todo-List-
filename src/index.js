import {
  projects,
  createElement,
  newTodo,
  makeProject,
  removeProject,
  defaultProject,
  removeTodo,
  toggleTodo,
} from "./todo.js";
import "./styles.css";
import { format, parseISO, isValid, isPast, isToday } from "date-fns";

function formatDueDate(dateString) {
  const date = parseISO(dateString);
  if (!isValid(date)) return "No due date";
  return format(date, "dd/MM/yyyy");
}

function isOverdue(dateString) {
  const date = parseISO(dateString);
  return isValid(date) && isPast(date) && !isToday(date);
}

const projectContainer = document.querySelector(".projects");
const todosContainer = document.querySelector(".todoCard");
const projectOpenFormBtn = document.querySelector(".projectOpenForm");
const todoOpenFormBtn = document.querySelector(".todoOpenForm");
const expandProjectContainer = document.querySelector(
  ".projectExpandable-container",
);

const expandTodoContainer = document.querySelector(".todoExpandable-container");
const projectCloseFormBtn = document.querySelector(".projectClose");
const todoCloseFormBtn = document.querySelector(".todoClose");
const projectForm = document.querySelector(".projectForm");
const todoForm = document.querySelector(".todoForm");
projectOpenFormBtn.addEventListener("click", () => {
  expandProjectContainer.classList.add("active");
});

projectCloseFormBtn.addEventListener("click", () => {
  expandProjectContainer.classList.remove("active");
});

todoOpenFormBtn.addEventListener("click", () => {
  expandTodoContainer.classList.add("active");
});

todoCloseFormBtn.addEventListener("click", () => {
  expandTodoContainer.classList.remove("active");
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  expandProjectContainer.classList.remove("active");
  const projectName = new FormData(projectForm).get("newProject");
  makeProject(projectName);
  displayProject();
  projectForm.reset();
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  expandTodoContainer.classList.remove("active");
  const todoName = new FormData(todoForm).get("todoName");
  const todoDescription = new FormData(todoForm).get("description");
  const todoDueDate = new FormData(todoForm).get("dueDate");
  const todoPriority = new FormData(todoForm).get("importance");
  newTodo(todoName, todoDescription, todoDueDate, todoPriority);
  displayTodos();
  todoForm.reset();
});

let selectedProject = projects[0];

function currentProject() {
  return selectedProject;
}

function displayProject() {
  projectContainer.textContent = "";
  projects.forEach((project) => {
    const projectDiv = createElement("div", "project");
    const removeProjectBtn = createElement("button", "removeProject", "Delete");

    projectDiv.append(project.name);

    projectDiv.addEventListener("click", () => {
      selectedProject = project;
      console.log(selectedProject.name, project);
      displayTodos();
    });

    removeProjectBtn.addEventListener("click", () => {
      removeProject(project);
      defaultProject(); //checks if no project in projects is left then makes one
      selectedProject = projects[0];
      displayProject();
      displayTodos();
    });

    projectContainer.append(projectDiv, removeProjectBtn);
  });
}
displayProject();

newTodo(
  "Meeting",
  "team sync to review progress and next steps",
  "1999-11-12",
  "a",
  true,
);

function createTodoCard(todo) {
  const card = createElement("div", "todoCard");
  const title = createElement("p", "", `Title: ${todo.title}.`);
  const dueDate = createElement("p", "", formatDueDate(todo.dueDate));
  const removeBtn = createElement("button", "removeTodo", "Delete");
  console.log(title);
  console.log(dueDate);
  console.log(todo.isComplete);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isComplete;

  if (todo.isComplete) card.classList.add("completed");
  if (isOverdue(todo.dueDate)) dueDate.classList.add("overdue");

  removeBtn.addEventListener("click", () => {
    removeTodo(todo);
    displayTodos();
  });

  checkbox.addEventListener("change", () => {
    toggleTodo(todo);
    displayTodos();
  });

  card.append(title, dueDate, checkbox, removeBtn);
  return card;
}

function displayTodos() {
  todosContainer.textContent = "";
  currentProject().todos.forEach((todo) => {
    todosContainer.append(createTodoCard(todo));
  });
}
displayTodos();
export { currentProject };
