import { App } from "./view.js";
import * as Model from "./model.js";
import { isOverdue } from "./helper.js";
function getSections() {
  let overdueList, todoList, doneList;
  todoList = Model.getTodos().filter(
    (todo) => !todo.completed && !isOverdue(todo.dueDate)
  );
  overdueList = Model.getTodos().filter(
    (todo) => !todo.completed && isOverdue(todo.dueDate)
  );
  doneList = Model.getTodos().filter((todo) => todo.completed);

  return [
    { title: "Overdue", list: overdueList },
    { title: "Todo", list: todoList },
    { title: "Done", list: doneList },
  ];
}

export function toggleTodo(todoId) {
  Model.toggleTodo(todoId);
  renderApp();
}

export function createTodo({
  title,
  description,
  completed,
  priority,
  dueDate,
}) {
  Model.addTodo({ title, description, completed, priority, dueDate });
  console.log(Model.getTodos());
  renderApp();
}

export function deleteTodo(todoId) {
  Model.deleteTodo(todoId);
  renderApp();
}

export function deleteAllTodo() {
  Model.deleteAllTodo();
  renderApp();
}

export function renderApp() {
  const root = document.getElementById("app");
  root.innerHTML = "";
  const sections = getSections();
  root.appendChild(App({ sections }));
}
