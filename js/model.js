const state = {
  todos: [],
};

export function getTodos() {
  return state.todos;
}

export function addTodo(text) {
  state.todos.push({
    id: Date.now(),
    text,
    completed: false,
  });
}

export function toggleTodo(id) {
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) todo.completed = !todo.completed;
}

export function deleteTodo(id) {
  state.todos = state.todos.filter((todo) => todo.id !== id);
}
