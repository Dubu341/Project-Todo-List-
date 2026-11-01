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



export { Project, Todo };
