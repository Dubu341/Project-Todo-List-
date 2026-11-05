import { Todo, Project } from "./todo.js";

const projectKey = "todoApp";

function saveProjects(projects) {
  try {
    localStorage.setItem(projectKey, JSON.stringify(projects));
  } catch (error) {
    console.error("Could not save projects:", error);
  }
}

function loadProjects() {
  try {
    const data = localStorage.getItem(projectKey);
    if (!data) return [];

    return JSON.parse(data).map((p) => {
      const project = new Project(p.name, p.id);
      project.todos = p.todos.map(
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
      return project;
    });
  } catch (error) {
    console.error("Could not load projects:", error);
    return [];
  }
}

export { saveProjects, loadProjects };
