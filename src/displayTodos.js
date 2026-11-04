import { newTodo, removeTodo, toggleTodo, createElement } from "./todo.js";
import { currentProject } from "./displayProjects.js";
import { formatDueDate, isOverdue } from "./index.js";
import editSVG from "../images/editSVG.svg";

const container = document.querySelector(".todoContainer");
const todosContainer = document.querySelector(".todoCard");
const todoOpenFormBtn = document.querySelector(".todoOpenForm");
const Formcontainer = document.querySelector(".todoExpandable-container");

let formOpen = false;

todoOpenFormBtn.addEventListener("click", (event) => {
  if (formOpen) return;
  formOpen = true;
  event.stopPropagation();
  createTodoForm();
});

function createTodoForm(todo) {
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

  closeBtn.addEventListener("click", () => {
    form.remove();
    formOpen = false;
  });
  document.addEventListener("click", () => {
    form.remove();
    formOpen = false;
  });
  if (todo) {
    header.textContent = "";
    btnWrapper.classList.remove("formBtnWrapper");
    btnWrapper.classList.add("updateBtnWrapper");
    form.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    form.classList.remove("todoForm");
    form.classList.add("updateTodoForm");
    form.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    document.addEventListener("click", () => {
      formOpen = false;
    });
    closeBtn.addEventListener("click", () => {
      formOpen = false;
    });
    nameInput.value = todo.title;
    desInput.value = todo.description;
    dateInput.value = todo.dueDate;
    importanceInput.checked = todo.priority;
    submitBtn.textContent = "update";
    closeBtn.remove();
    const removeBtn = createElement("button", "removeTodo", "Delete");
    removeBtn.addEventListener("click", () => {
      removeTodo(todo);
      displayTodos();
      formOpen = false;
    });
    btnWrapper.append(submitBtn, removeBtn);
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
    return form;
  }

  if (!todo) {
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
  }
}

function createTodoCard(todo) {
  const card = createElement("div", "todo");
  const title = createElement("p", "", `Title: ${todo.title}`);
  const dueDate = createElement("p", "dueDate", formatDueDate(todo.dueDate));
  const desc = createElement(
    "p",
    "todoDescription",
    `${todo.description}`,
  );
  const updateBtn = createElement("img", "updateTodo");
  updateBtn.src = editSVG;
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
    if (todo.priority) card.classList.add("highPrio");
  }

  checkbox.addEventListener("change", () => {
    toggleTodo(todo);
    displayTodos();
  });
  updateBtn.addEventListener("click", (event) => {
    if (formOpen) return;
    formOpen = true;
    event.stopPropagation();
    const updateTodo = createTodoForm(todo);
    card.append(updateTodo);
    updateTodo.addEventListener("submit", (event) => {
      event.preventDefault();
      const newTitle = new FormData(updateTodo).get("todoName");
      const newDes = new FormData(updateTodo).get("description");
      const newDate = new FormData(updateTodo).get("dueDate");
      const newPrio = new FormData(updateTodo).get("importance");
      todo.title = newTitle;
      todo.description = newDes;
      todo.dueDate = newDate;
      todo.priority = newPrio;
      formOpen = false;
      displayTodos();
    });
  });
  card.addEventListener("click", (event) => {
    if (formOpen) return;
    formOpen = true;
    event.stopPropagation();
    card.append(desc);
  });
  document.addEventListener("click", () => {
    formOpen = false;
    desc.remove();
  });
  card.append(title, dueDate, checkbox, updateBtn);
  return card;
}

function displayTodos() {
  todosContainer.textContent = "";
  currentProject().todos.forEach((todo) => {
    todosContainer.append(createTodoCard(todo));
  });
}
export { displayTodos };
