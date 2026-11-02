import { currentProject } from "./index.js";
class Todo {
  constructor(
    title,
    description,
    dueDate,
    priority,
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
const firstProject = projects[0];
const secondProject = projects[1];
secondProject.addTodo(new Todo("test", "testtesttest", "2030-12-01", "high"));
secondProject.addTodo(new Todo("test1", "testtesttest1", "2022-05-05", "high"));
firstProject.addTodo(new Todo("test1", "testtesttest1", "2026-11-02", "high"));
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
