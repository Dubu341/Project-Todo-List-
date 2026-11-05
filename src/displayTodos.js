import {
  newTodo,
  removeTodo,
  toggleTodo,
  createElement,
  projects,
} from "./todo.js";
import { currentProject } from "./displayProjects.js";
import { formatDueDate, isOverdue } from "./index.js";
import editSVG from "../images/editSVG.svg";
import { saveProjects } from "./storage.js";

const container = document.querySelector(".todoContainer");
const todosContainer = document.querySelector(".todoCard");
const todoOpenFormBtn = document.querySelector(".todoOpenForm");
const Formcontainer = document.querySelector(".todoExpandable-container");

let closeOpenForm = null;
document.addEventListener("click", () => {
  if (closeOpenForm) closeOpenForm();
});
Formcontainer.addEventListener("click", (event) => {
  event.stopPropagation();
});

todoOpenFormBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if (closeOpenForm) closeOpenForm();
  createTodoForm();
});

function createTodoForm(todo) {
  const form = createElement("form", "todoForm");
  form.method = "get";
  form.action = "";
  form.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  const header = createElement("h3", "", "New Todo:");
  const nameLabel = createElement("label", "", "Title:");
  nameLabel.htmlFor = "todoName";
  const nameInput = createElement("input");
  nameInput.type = "text";
  nameInput.name = "todoName";
  nameInput.id = "todoName";
  nameInput.maxLength = 20;
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
  closeBtn.type = "button";

  function closeThisForm() {
    form.remove();
    closeOpenForm = null;
  }
  closeBtn.addEventListener("click", closeThisForm);

  if (todo) {
    header.textContent = "";
    btnWrapper.classList.remove("formBtnWrapper");
    btnWrapper.classList.add("updateBtnWrapper");
    form.classList.remove("todoForm");
    form.classList.add("updateTodoForm");
    form.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    nameInput.value = todo.title;
    desInput.value = todo.description;
    dateInput.value = todo.dueDate;
    importanceInput.checked = todo.priority;
    submitBtn.textContent = "update";
    const removeBtn = createElement("button", "removeTodo", "Delete");
    removeBtn.type = "button";
    removeBtn.addEventListener("click", () => {
      removeTodo(todo);
      closeThisForm();
      displayTodos();
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
    closeOpenForm = closeThisForm;
    return form;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    newTodo(
      data.get("todoName"),
      data.get("description"),
      data.get("dueDate"),
      data.get("importance"),
    );
    displayTodos();
    closeThisForm();
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
  closeOpenForm = closeThisForm;
}

function createTodoCard(todo) {
  const card = createElement("div", "todo");
  const title = createElement("p", "", `Title: ${todo.title}`);
  const dueDate = createElement("p", "dueDate", formatDueDate(todo.dueDate));
  const desc = createElement("p", "todoDescription", `${todo.description}`);
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

  checkbox.addEventListener("change", (event) => {
    event.stopPropagation();
    toggleTodo(todo);
    displayTodos();
  });
  updateBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (closeOpenForm) closeOpenForm();
    const updateTodo = createTodoForm(todo);
    card.append(updateTodo);
    updateTodo.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(updateTodo);
      todo.title = data.get("todoName");
      todo.description = data.get("description");
      todo.dueDate = data.get("dueDate");
      todo.priority = data.get("importance");
      if (closeOpenForm) closeOpenForm();
      saveProjects(projects);
      displayTodos();
    });
  });
  card.addEventListener("click", (event) => {
    event.stopPropagation();
    if (closeOpenForm) closeOpenForm();
    card.append(desc);
    closeOpenForm = () => {
      desc.remove();
      closeOpenForm = null;
    };
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
