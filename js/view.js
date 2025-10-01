export function createEl(tag, props = {}) {
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

export function TodoItem(todoData) {
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
    className: "text-xs text-muted-foreground",
  });

  const todoFooter = createEl("div", {
    className: "text-xs flex items-center gap-4",
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
        className: "flex-1 flex flex-col gap-1",
        children: [todoTitle, todoDescription, todoFooter],
      }),
    ],
  });
}

export function TodoList() {
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

export function TodoSection() {
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

export function App() {
  // main container
  const main = createEl("main", {
    className: "mx-auto max-w-3xl p-4",
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
