import { displayProject } from "./displayProjects.js";
import { displayTodos } from "./displayTodos.js";
import { newTodo } from "./todo.js";

import "./styles.css";
import { format, parseISO, isValid, isPast, isToday } from "date-fns";

function formatDueDate(dateString) {
  const date = parseISO(dateString);
  if (!isValid(date)) return "No due date";
  return format(date, "dd/MM/yyyy");
}

function isOverdue(dateString) {
  const date = parseISO(dateString);
  return isValid(date) && isPast(date) && !isToday(date);
}

newTodo(
  "Meeting",
  "team sync to review progress and next steps",
  "1999-11-12",
  "a",
  true,
);
displayProject();
displayTodos();

export { formatDueDate, isOverdue };

//button that opens details
// opens a form
// form has the values as default
// has update button and close button
