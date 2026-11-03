import { newTodo, removeTodo, toggleTodo, createElement } from "./todo.js";
import { currentProject } from "./displayProjects.js";
import { formatDueDate, isOverdue } from "./index.js";

const todosContainer = document.querySelector(".todoCard");
const todoOpenFormBtn = document.querySelector(".todoOpenForm");

const expandTodoContainer = document.querySelector(".todoExpandable-container");
const todoCloseFormBtn = document.querySelector(".todoClose");
const todoForm = document.querySelector(".todoForm");
todoOpenFormBtn.addEventListener("click", () => {
  expandTodoContainer.classList.add("active");
});

todoCloseFormBtn.addEventListener("click", () => {
  expandTodoContainer.classList.remove("active");
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

function createTodoCard(todo) {
  const card = createElement("div", "todoCard");
  const title = createElement("p", "", `Title: ${todo.title}.`);
  const dueDate = createElement("p", "", formatDueDate(todo.dueDate));
  const removeBtn = createElement("button", "removeTodo", "Delete");
  console.log(title);
  console.log(dueDate);
  console.log(todo.isComplete);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isComplete;

  if (todo.isComplete) card.classList.add("completed");
  if (!todo.isComplete) {
    if (isOverdue(todo.dueDate)) dueDate.classList.add("overdue");
  }

  removeBtn.addEventListener("click", () => {
    removeTodo(todo);
    displayTodos();
  });

  checkbox.addEventListener("change", () => {
    toggleTodo(todo);
    displayTodos();
  });

  card.append(title, dueDate, checkbox, removeBtn);
  return card;
}

function displayTodos() {
  todosContainer.textContent = "";
  currentProject().todos.forEach((todo) => {
    todosContainer.append(createTodoCard(todo));
  });
}
export { displayTodos };
