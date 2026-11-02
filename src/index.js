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

projectOpenFormBtn.addEventListener("click", () => {
  expandProjectContainer.classList.add("active");
});
projectCloseFormBtn.addEventListener("click", () => {
  expandProjectContainer.classList.remove("active");
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  expandProjectContainer.classList.remove("active");
  const projectName = new FormData(projectForm).get("newProject");
  makeProject(projectName);
  displayProject();
  projectForm.reset();
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
//to do add todo functions
export { currentProject };
