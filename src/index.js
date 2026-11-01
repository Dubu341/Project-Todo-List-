import {
  projects,
  createElement,
  newTodo,
  makeProject,
  removeProject,
  defaultProject,
} from "./todo.js";
import "./styles.css";

const projectContainer = document.querySelector(".projects");
const todosContainer = document.querySelector(".todoContainer");
const openFormBtn = document.querySelector(".openForm");
const expandProjectContainer = document.querySelector(".expandable-container");
const closeFormBtn = document.querySelector(".close");
const form = document.querySelector("form");

openFormBtn.addEventListener("click", () => {
  expandProjectContainer.classList.add("active");
});
closeFormBtn.addEventListener("click", () => {
  expandProjectContainer.classList.remove("active");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  expandProjectContainer.classList.remove("active");
  const projectName = new FormData(form).get("newProject");
  makeProject(projectName);
  displayProject();
  form.reset();
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
      defaultProject();
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
  "11/12/1999",
  "a",
  true,
);

function displayTodos() {
  todosContainer.textContent = "";
  currentProject().todos.forEach((todo) => {
    const todoCard = createElement("div", "todoCard");
    const removeTodo = createElement("button", "removeTodo", "Delete");

    todosContainer.append(todoCard);
    todoCard.append(todo.title, todo.dueDate, removeTodo);

    todoCard.setAttribute("data-id", todo.id);

    removeTodo.addEventListener("click", () => {
      let todoId = todoCard.getAttribute("data-id");
      currentProject().todos = currentProject().todos.filter(
        (item) => item.id != todoId,
      );
      displayTodos();
    });
  });
}
displayTodos();

export { currentProject };
