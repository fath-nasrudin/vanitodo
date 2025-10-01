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

export function TodoList(todos) {
  return createEl("ul", {
    children: todos.map((item) => TodoItem(item)),
  });
}

export function TodoSection({ title = "Untitled", list }) {
  return createEl("div", {
    children: [
      createEl("h2", {
        text: title,
        className: "font-bold border-b border-border",
      }),
      TodoList(list),
    ],
  });
}

export function App({ sections }) {
  // main container

  const todoSections = sections.map((section) =>
    TodoSection({ title: section.title, list: section.list })
  );

  const main = createEl("main", {
    className: "mx-auto max-w-3xl p-4",
    children: [
      // Title
      createEl("h1", {
        text: "Inbox",
        className: "text-2xl font-bold",
      }),
      ...todoSections,
    ],
  });
  return main;
}
