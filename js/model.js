const state = {
  todos: [
    {
      id: 1,
      title: "Membuat aplikasi todolist",
      description: "Ini adalah descriptionnya untuk aplikasi ini",
      dueDate: "2025-09-30",
      priority: "high",
      completed: true,
    },
    {
      id: 2,
      title: "Menambahkan fitur selesaikan todo",
      description: "Ketika klik check, status completed todo jadi sebaliknya",
      dueDate: "2025-10-05",
      priority: "low",
      completed: true,
    },
    {
      id: 3,
      title: "Menambahkan fitur tambah todo",
      description:
        "Menyediakan form untuk tambah todo. Ketika user klik Add Todo, todo baru akan ditambahkan di daftar todo.",
      dueDate: "2025-10-05",
      priority: "low",
      completed: true,
    },

    {
      id: 4,
      title: "Menambahkan fitur hapus todo",
      description:
        "Menyediakan tombol delete di setiap todo. Ketika user klik tombol delete, todo akan dihapus dari list-10-05",
      priority: "low",
      completed: true,
    },
    {
      id: 5,
      title: "Menambahkan fitur memisahkan section todo, overdue, dan done",
      description: "memisahkan kolom todo, overdue, dan done",
      priority: "low",
      dueDate: "2025-10-05",
      completed: true,
    },
    {
      id: 6,
      title: "Menambahkan fitur filter by date di setiap section",
      description:
        "Menyediakan date picker di setiap section dan filter berdasarkan date yang dipilih",
      priority: "low",
      dueDate: "2025-10-05",
      completed: true,
    },
    {
      id: 7,
      title: "Menambahkan fitur toggle daftar list di setiap section",
      description:
        "Menyediakan fitur toggle di setiap section sehingga bisa menampilkan atau menyembunyikan sebuah section",
      priority: "low",
      dueDate: "2030-10-05",
      completed: false,
    },
    {
      id: 8,
      title: "Mengumpulkan tugas",
      description: "Ini contoh untuk overdue todo item",
      priority: "low",
      dueDate: "2025-09-20",
      completed: false,
    },
  ],
  filter: {},
};

export function setFilter(key, value) {
  state.filter[key] = value;
  console.log(state.filter);
}

export function getFilter(key) {
  return state.filter[key];
}

export function getTodos() {
  console.log(state.todos);
  return state.todos;
}

export function getTodosByDate(date) {
  return state.todos.filter((t) => t.dueDate === date);
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

export function deleteAllTodo() {
  state.todos = [];
}

export function toggleTodo(id) {
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) todo.completed = !todo.completed;
}

export function deleteTodo(id) {
  state.todos = state.todos.filter((todo) => todo.id !== id);
}
