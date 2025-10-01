import { App } from "./view.js";
import { getTodos } from "./model.js";

function isOverdue(dueDate) {
  if (!dueDate) return false;
  if (Date.now() >= new Date(dueDate)) return true;
  return false;
}

function getSections() {
  let overdueList, todoList, doneList;
  todoList = getTodos().filter(
    (todo) => !todo.completed && !isOverdue(todo.dueDate)
  );
  overdueList = getTodos().filter(
    (todo) => !todo.completed && isOverdue(todo.dueDate)
  );
  doneList = getTodos().filter((todo) => todo.completed);

  return [
    { title: "Overdue", list: overdueList },
    { title: "Todo", list: todoList },
    { title: "Done", list: doneList },
  ];
}

export function renderApp() {
  const root = document.getElementById("app");
  root.innerHTML = "";
  const sections = getSections();
  root.appendChild(App({ sections }));
}
