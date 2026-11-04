import { newTodo, removeTodo, toggleTodo, createElement } from "./todo.js";
import { currentProject } from "./displayProjects.js";
import { formatDueDate, isOverdue } from "./index.js";

const container = document.querySelector(".todoContainer");
const todosContainer = document.querySelector(".todoCard");
const todoOpenFormBtn = document.querySelector(".todoOpenForm");
const Formcontainer = document.querySelector(".todoExpandable-container");

let formOpen = false;

todoOpenFormBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if (formOpen) return;
  formOpen = true;
  createTodoForm();
});

function createTodoForm() {
  Formcontainer.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  const form = createElement("form", "todoForm");
  form.method = "get";
  form.action = "";
  const header = createElement("h3", "", "New Todo:");
  const nameLabel = createElement("label", "", "Title:");
  nameLabel.htmlFor = "todoName";
  const nameInput = createElement("input");
  nameInput.type = "text";
  nameInput.name = "todoName";
  nameInput.id = "todoName";
  nameInput.required = true;
  const desLabel = createElement("label", "", "Description:");
  desLabel.htmlFor = "description";
  const desInput = createElement("textarea");
  desInput.name = "description";
  desInput.id = "description";
  const dateLabel = createElement("label", "", "Due Date:");
  dateLabel.htmlFor = "dueDate";
  const dateInput = createElement("input");
  dateInput.type = "date";
  dateInput.name = "dueDate";
  dateInput.id = "dueDate";
  const importanceLabel = createElement("label", "", "Mark as important");
  importanceLabel.htmlFor = "importance";
  const importanceInput = createElement("input");
  importanceInput.type = "checkbox";
  importanceInput.name = "importance";
  importanceInput.id = "importance";
  const btnWrapper = createElement("div", "formBtnWrapper");
  const submitBtn = createElement("button", "", "Create");
  submitBtn.type = "submit";
  const closeBtn = createElement("button", "todoClose", "Close");
  container.append(Formcontainer);
  Formcontainer.append(form);
  todosContainer.before(Formcontainer);
  btnWrapper.append(submitBtn, closeBtn);
  form.append(
    header,
    nameLabel,
    nameInput,
    desLabel,
    desInput,
    dateLabel,
    dateInput,
    importanceLabel,
    importanceInput,
    btnWrapper,
  );
  closeBtn.addEventListener("click", () => {
    form.remove();
    formOpen = false;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const todoName = new FormData(form).get("todoName");
    const todoDescription = new FormData(form).get("description");
    const todoDueDate = new FormData(form).get("dueDate");
    const todoPriority = new FormData(form).get("importance");
    newTodo(todoName, todoDescription, todoDueDate, todoPriority);
    displayTodos();
    form.reset();
    form.remove();
    formOpen = false;
  });
  document.addEventListener("click", () => {
    form.remove();
    formOpen = false;
  });
}

function createTodoCard(todo) {
  const card = createElement("div", "todo");
  const title = createElement("p", "", `Title: ${todo.title}.`);
  const dueDate = createElement("p", "", formatDueDate(todo.dueDate));
  const removeBtn = createElement("button", "removeTodo", "Delete");
  console.log(title);
  console.log(dueDate);
  console.log(todo.isComplete);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = todo.isComplete;

  if (todo.isComplete) card.classList.add("completed");
  if (!todo.isComplete) {
    if (isOverdue(todo.dueDate))
      (card.classList.add("overdue"), dueDate.classList.add("overdueDate"));
  }

  removeBtn.addEventListener("click", () => {
    removeTodo(todo);
    displayTodos();
  });

  checkbox.addEventListener("change", () => {
    toggleTodo(todo);
    displayTodos();
  });

  card.append(title, dueDate, checkbox); //, removeBtn
  return card;
}

function displayTodos() {
  todosContainer.textContent = "";
  currentProject().todos.forEach((todo) => {
    todosContainer.append(createTodoCard(todo));
  });
}
export { displayTodos };
