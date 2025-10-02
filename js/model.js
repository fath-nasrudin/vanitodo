const state = {
  todos: [
    {
      id: 1,
      title: "Membuat aplikasi todolist",
      description: "Ini adalah descriptionnya untuk aplikasi ini",
      dueDate: "2025-9-30",
      priority: "P1",
      completed: false,
    },
    {
      id: 2,
      title: "Membuat aplikasi todolist",
      description: "Ini adalah descriptionnya untuk aplikasi ini",
      dueDate: "2025-10-05",
      priority: "high",
      completed: true,
    },
  ],
};

export function getTodos() {
  return state.todos;
}

export const priorityState = { LOW: "low", MEDIUM: "medium", HIGH: "high" };

export function addTodo({
  title,
  description = null,
  completed = false,
  priority = priorityState.LOW,
  dueDate = null,
}) {
  // validation
  if (!title) throw new Error("Validation Error: Title field is required");

  state.todos.push({
    id: Date.now(),
    title,
    description,
    completed,
    dueDate,
    priority,
  });
}

export function toggleTodo(id) {
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) todo.completed = !todo.completed;
}

export function deleteTodo(id) {
  state.todos = state.todos.filter((todo) => todo.id !== id);
}
