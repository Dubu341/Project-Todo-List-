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

function makeProject(name) {
  projects.push(new Project(name));
}

function addTodo(title, description, dueDate, priority, isComplete) {
  currentProject().addTodo(
    new Todo(title, description, dueDate, priority, isComplete),
  );
}

makeProject("First Project");
makeProject("Second Project");

function createElement(tag, className, text) {
  let element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (text) element.textContent = text;
  return element;
}

export { projects, createElement, addTodo, makeProject };
