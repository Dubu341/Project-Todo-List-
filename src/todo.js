import { currentProject } from "./displayProjects.js";
class Todo {
  constructor(
    title,
    description,
    dueDate,
    priority = false,
    isComplete = false,
    id = crypto.randomUUID(),
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
    this.id = id;
  }
  changeIsComplete() {
    this.isComplete = !this.isComplete;
  }
  changePrio() {
    this.project = !this.priority;
  }
}

class Project {
  constructor(name, id = crypto.randomUUID(), todos = []) {
    this.name = name;
    this.id = id;
    this.todos = todos.map(
      (t) =>
        new Todo(
          t.title,
          t.description,
          t.dueDate,
          t.priority,
          t.isComplete,
          t.id,
        ),
    );
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
  log() {
    console.log(this.todos);
  }
}

let projects = [];

function removeProject(project) {
  projects = projects.filter((item) => item.id !== project.id);
}

function makeProject(name) {
  projects.push(new Project(name));
}

function defaultProject() {
  if (projects.length === 0) {
    makeProject("Default Project");
  }
}

function newTodo(title, description, dueDate, priority, isComplete) {
  currentProject().addTodo(
    new Todo(title, description, dueDate, priority, isComplete),
  );
}

function removeTodo(todo) {
  const project = currentProject();
  project.todos = project.todos.filter((item) => item.id !== todo.id);
}

function toggleTodo(todo) {
  todo.changeIsComplete();
}
//for display testing
makeProject("Default Project");
makeProject("Second Project");
makeProject("Third Project");
const firstProject = projects[0];
const secondProject = projects[1];
const thirdProject = projects[2];
secondProject.addTodo(
  new Todo(
    "Clean Workspace",
    "Organize your desk and remove unnecessary items.",
    "2030-12-01",
    true,
    true,
  ),
);
secondProject.addTodo(
  new Todo(
    "Update Software",
    "Check for available updates and install them.",
    "2022-05-05",
  ),
);
secondProject.addTodo(
  new Todo(
    "Organize Files",
    "Sort documents into folders and delete unnecessary files..",
    "2026-11-05",
  ),
);
firstProject.addTodo(
  new Todo(
    "Review Tasks",
    "Go through pending tasks and prioritize what needs attention.",
    "2026-11-02",
    false,
  ),
);
firstProject.addTodo(
  new Todo(
    "Backup Important Files",
    "	Create a backup of important documents and personal data.",
    "2030-11-02",
    true,
  ),
);
//for display testing

function createElement(tag, className, text) {
  let element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (text) element.textContent = text;
  return element;
}

export {
  projects,
  createElement,
  newTodo,
  makeProject,
  removeProject,
  defaultProject,
  removeTodo,
  toggleTodo,
};
