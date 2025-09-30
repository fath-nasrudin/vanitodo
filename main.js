import { getTodos } from "./js/model.js";
function createEl(tag, props = {}) {
  const node = document.createElement(tag);

  if (props.className) node.className = props.className;
  if (props.text) node.textContent = props.text;

  // handle event listener and attributes
  for (const [key, value] of Object.entries(props)) {
    if (["className", "text", "children"].includes(key)) continue;

    if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, value);
    }
  }

  // handle children
  if (props.children && Array.isArray(props.children)) {
    props.children.forEach((child) => {
      if (typeof child === "string") {
        node.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        node.appendChild(child);
      }
    });
  }

  return node;
}

function TodoItem(todoData) {
  const checkbox = createEl("input", {
    type: "checkbox",
    className: "grow-0 relative top-1",
  });

  const todoTitle = createEl("h3", {
    text: todoData.title,
    className: "text-sm",
  });

  const todoDescription = createEl("p", {
    text: todoData.description,
    className: "text-xs",
  });

  const todoFooter = createEl("div", {
    className: "text-xs",
    children: [
      // dueDate
      createEl("button", {
        text: todoData.dueDate,
      }),
      // priority
      createEl("button", {
        text: todoData.priority,
      }),
    ],
  });

  return createEl("li", {
    className: "relative border-b border-border flex gap-4 items-start py-2",
    children: [
      checkbox,
      createEl("div", {
        children: [todoTitle, todoDescription, todoFooter],
      }),
    ],
  });
}

function TodoList() {
  // const todos = getTodos();
  const todos = [
    {
      title: "Membuat aplikasi todolist",
      description: "Ini adalah descriptionnya untuk aplikasi ini",
      dueDate: "27 Nov 2025",
      priority: "P1",
    },
    {
      title: "Membuat aplikasi todolist",
      description: "Ini adalah descriptionnya untuk aplikasi ini",
      dueDate: "27 Nov 2025",
      priority: "P1",
    },
  ];
  return createEl("ul", {
    children: todos.map((item) => TodoItem(item)),
  });
}

function TodoSection() {
  return createEl("div", {
    children: [
      createEl("h2", {
        text: "Overdue",
        className: "font-bold border-b border-border",
      }),
      TodoList(),
    ],
  });
}

function App() {
  // main container
  const main = createEl("main", {
    className: "mx-auto max-w-3xl",
    children: [
      // Title
      createEl("h1", {
        text: "Inbox",
        className: "text-2xl font-bold",
      }),
      TodoSection(),
    ],
  });
  return main;
}

function render() {
  const root = document.getElementById("app");
  root.innerHTML = "";
  root.appendChild(App());
}

// Initial render
render();
