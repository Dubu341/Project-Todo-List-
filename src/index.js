import {
  projects,
  createElement,
  newTodo,
  makeProject,
  removeProject,
  defaultProject,
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
    projectDiv.setAttribute("data-id", project.id);

    projectDiv.addEventListener("click", () => {
      selectedProject = project;
      console.log(selectedProject.name, project);
      displayTodos();
    });

    removeProjectBtn.addEventListener("click", () => {
      let projectId = projectDiv.getAttribute("data-id");
      removeProject(projectId);
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

function displayTodos() {
  todosContainer.textContent = "";
  currentProject().todos.forEach((todo) => {
    const todoCard = createElement("div", "todoCard");
    const todoTitle = createElement("p", "");
    const todoDueDate = createElement("p");
    const removeTodo = createElement("button", "removeTodo", "Delete");
    const completed = document.createElement("input");
    completed.type = "checkbox";

    completed.checked = todo.isComplete;

    if (todo.isComplete === true) {
      todoCard.classList.add("completed");
    }

    todoTitle.textContent = `Title: ${todo.title}.`;
    todoDueDate.textContent = formatDueDate(todo.dueDate);
    if (isOverdue(todo.dueDate)) {
      todoDueDate.classList.add("overdue");
    }

    todosContainer.append(todoCard);
    todoCard.append(todoTitle, todoDueDate, completed, removeTodo);

    todoCard.setAttribute("data-id", todo.id);

    removeTodo.addEventListener("click", () => {
      let todoId = todoCard.getAttribute("data-id");
      currentProject().todos = currentProject().todos.filter(
        (item) => item.id != todoId,
      );
      displayTodos();
    });
    
    completed.addEventListener("change", () => {
      let todoId = todoCard.getAttribute("data-id");
      let todoIndex = currentProject().todos.findIndex(
        (item) => item.id == todoId,
      );
      currentProject().todos[todoIndex].changeIsComplete();

      displayTodos();
    });
  });
}
displayTodos();
export { currentProject };
