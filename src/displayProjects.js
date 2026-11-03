import { displayTodos } from "./displayTodos.js";
import {
  createElement,
  projects,
  makeProject,
  removeProject,
  defaultProject,
} from "./todo.js";
import editSVG from "../images/editSVG.svg";

const projectContainer = document.querySelector(".projects");
const projectOpenFormBtn = document.querySelector(".projectOpenForm");
const expandProjectContainer = document.querySelector(
  ".projectExpandable-container",
);
const projectCloseFormBtn = document.querySelector(".projectClose");
const projectForm = document.querySelector(".projectForm");

projectOpenFormBtn.addEventListener("click", () => {
  expandProjectContainer.classList.add("active");
  projectForm.querySelector("input").focus();
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

function createUpdateProjectForm(project) {
  const editNameForm = createElement("form", "", "");
  editNameForm.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  editNameForm.classList.add("editProjectForm");
  editNameForm.id = "newName";
  editNameForm.method = "get";
  editNameForm.action = "";
  const nameInput = createElement("input");
  nameInput.type = "text";
  nameInput.name = "newName";
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
let closeOpenProjectForm = null;

document.addEventListener("click", (event) => {
  if (!closeOpenProjectForm) return;
  closeOpenProjectForm();
});
function displayProject() {
  closeOpenProjectForm = null;
  projectContainer.textContent = "";
  projects.forEach((project) => {
    const projectDiv = createElement("div", "project");
    const projectName = createElement("p", "", project.name);
    const editProjectBtn = createElement("img", "editProject", "");
    editProjectBtn.src = editSVG;
    const editForm = createUpdateProjectForm(project);
    const input = editForm.querySelector("input");

    if (project.id === currentProject().id) {
      projectDiv.classList.add("selectedProject");
    }

    projectDiv.append(projectName, editProjectBtn);

    projectDiv.addEventListener("click", () => {
      selectedProject = project;
      console.log(selectedProject.name, project);
      displayTodos();
      displayProject();
    });

    function closeThisForm() {
      editForm.replaceWith(projectName);
      projectName.after(editProjectBtn);
      closeOpenProjectForm = null;
    }

    editProjectBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      editProjectBtn.remove();
      input.value = project.name;
      if (closeOpenProjectForm) closeOpenProjectForm();
      projectName.replaceWith(editForm);
      input.focus();
      closeOpenProjectForm = closeThisForm;
    });
    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newName = new FormData(editForm).get("newName");
      project.name = newName;
      displayProject();
    });
    projectContainer.append(projectDiv);
  });
}

export { currentProject, displayProject };
