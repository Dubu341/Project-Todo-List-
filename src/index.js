import { displayProject } from "./displayProjects.js";
import { displayTodos } from "./displayTodos.js";

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


displayProject();
displayTodos();

export { formatDueDate, isOverdue };


