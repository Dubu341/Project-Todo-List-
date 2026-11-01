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
  removeTodo() {}
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

function newTodo(title, description, dueDate, priority, isComplete) {
  currentProject().addTodo(
    new Todo(title, description, dueDate, priority, isComplete),
  );
}

//for display testing
makeProject("First Project");
makeProject("Second Project");
const firstProject = projects[0];
const secondProject = projects[1];
secondProject.addTodo(new Todo("test", "testtesttest", "11/11/1111", "high"));
secondProject.addTodo(new Todo("test1", "testtesttest1", "22/11/1111", "high"));
firstProject.addTodo(new Todo("test1", "testtesttest1", "22/11/1111", "high"));
//for display testing

function createElement(tag, className, text) {
  let element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (text) element.textContent = text;
  return element;
}

export { projects, createElement, newTodo, makeProject };
