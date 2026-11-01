import { projects, createElement, addTodo } from "./todo.js";
import "./styles.css";

const projectContainer = document.querySelector(".projects");
const openFormBtn = document.querySelector(".openForm");
const expandProjectContainer = document.querySelector(".expandable-container");
const closeFormBtn = document.querySelector(".close");

openFormBtn.addEventListener("click", () => {
  expandProjectContainer.classList.add("active");
});
closeFormBtn.addEventListener("click", () => {
  expandProjectContainer.classList.remove("active");
});


let selectedProject = projects[0];

function currentProject() {
  return selectedProject;
}

function displayProject() {
  projectContainer.textContent = "";
  projects.forEach((project) => {
    const projectDiv = createElement("div", "project");
    projectDiv.append(project.name);

    projectDiv.addEventListener("click", () => {
      selectedProject = project;
      console.log(selectedProject.name, project);
    });
    projectContainer.append(projectDiv);
  });
}
displayProject();

addTodo(
  "Meeting",
  "team sync to review progress and next steps",
  "11/12/1999",
  "a",
  true,
);

export { currentProject, selectedProject };
