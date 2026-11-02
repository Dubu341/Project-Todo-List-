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
import editSVG from "../images/editSVG.svg";
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

function createUpdateProjectForm(project) {
  const editNameForm = createElement("form", "hidden", "");
  editNameForm.classList.add("editProjectForm");
  editNameForm.classList.add("editForm");
  editNameForm.id = "newName";
  editNameForm.method = "get";
  editNameForm.action = "";
  const nameInput = createElement("input");
  nameInput.type = "text";
  nameInput.name = "newName";
  nameInput.placeholder = project.name;
  nameInput.required = true;
  const submitBtn = createElement("button", "", "Update");
  submitBtn.type = "submit";
  const removeProjectBtn = createElement("button", "", "Delete");
  removeProjectBtn.type = "button";
  removeProjectBtn.addEventListener("click", () => {
    removeProject(project);
    defaultProject(); //checks if no project in projects is left then makes one
    selectedProject = projects[0];
    displayProject();
    displayTodos();
  });
  editNameForm.append(nameInput, submitBtn, removeProjectBtn);

  return editNameForm;
}

function displayProject() {
  projectContainer.textContent = "";
  projects.forEach((project) => {
    const projectDiv = createElement("div", "project");
    const projectName = createElement("p", "", project.name);
    const editProjectBtn = createElement("img", "removeProject", "");
    editProjectBtn.src = editSVG;
    const editForm = createUpdateProjectForm(project);

    projectDiv.append(projectName, editProjectBtn, editForm);

    projectName.addEventListener("click", () => {
      selectedProject = project;
      console.log(selectedProject.name, project);
      displayTodos();
    });

    editProjectBtn.addEventListener("click", () => {
      document
        .querySelectorAll(".editProjectForm:not(.hidden)")
        .forEach((form) => {
          if (form !== editForm) {
            form.classList.add("hidden");
          }
        });
      editForm.classList.toggle("hidden");
      if (!editForm.classList.contains("hidden")) {
        editForm.querySelector("input").focus();
      }
    });
    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newName = new FormData(editForm).get("newName");
      project.name = newName;
      editForm.classList.add("hidden");
      displayProject();
    });

    projectContainer.append(projectDiv);
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
  if (!todo.isComplete) {
    if (isOverdue(todo.dueDate)) dueDate.classList.add("overdue");
  }

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
//button that opens details
// opens a form
// form has the values as default
// has update button and close button
