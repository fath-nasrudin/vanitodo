import { createEl, isOverdue } from "./helper.js";
import * as Controller from "./controller.js";
import { priorityState } from "./model.js";

export function AddTodoForm() {
  const form = createEl("form", {
    className: "border border-border rounded-md flex flex-col gap-1 p-2",
    onsubmit: (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const title = formData.get("title");
      const description = formData.get("description");
      const dueDate = formData.get("dueDate");
      const priority = formData.get("priority");

      Controller.createTodo({ title, description, dueDate, priority });
      // console.log({ title, description, dueDate, priority });
    },
    children: [
      // title
      createEl("div", {
        className: "flex flex-col",
        children: [
          createEl("label", {
            className: "sr-only",
            text: "Title",
          }),
          createEl("input", {
            type: "text",
            name: "title",
            placeholder: "Create thing great",
            className: "font-bold",
          }),
        ],
      }),

      // description
      createEl("div", {
        className: "flex flex-col",
        children: [
          createEl("label", {
            text: "Description",
            className: "sr-only",
          }),
          createEl("input", {
            type: "textarea",
            name: "description",
            className: "text-sm",
            placeholder: "Description",
          }),
        ],
      }),

      createEl("div", {
        className: "flex gap-8",
        children: [
          // calendar. Gimana cara ubah tampilannya jadi misal 19 juni 2025
          createEl("div", {
            className: "flex flex-col",
            children: [
              createEl("label", {
                text: "Due Date",
                className: "sr-only",
              }),
              createEl("input", {
                type: "date",
                name: "dueDate",
                className: "self-start",
                placeholder: "Date",
              }),
            ],
          }),
          // Priority
          createEl("div", {
            children: [
              createEl("label", {
                text: "completed",
                className: "sr-only",
              }),
              createEl("select", {
                name: "priority",
                children: Object.values(priorityState).map((state) =>
                  createEl("option", {
                    text: state,
                    value: state,
                  })
                ),
              }),
            ],
          }),
        ],
      }),

      // horizontal line
      createEl("hr", {
        className: "border-t border-border pt-2",
      }),

      // button
      createEl("div", {
        className: "w-full flex justify-end",
        children: [
          createEl("button", {
            text: "Add Task",
            className:
              "px-4 py-2 rounded-md bg-primary text-sm font-bold text-primary-foreground cursor-pointer",
          }),
        ],
      }),
    ],
  });

  return form;
}
export function TodoItem(todoData) {
  const checkbox = createEl("input", {
    type: "checkbox",
    className: "grow-0 relative top-1",
    checked: todoData.completed,
    onchange: () => Controller.toggleTodo(todoData.id),
  });

  const todoTitle = createEl("h3", {
    text: todoData.title,
    className: "text-sm " + (todoData.completed && "line-through"),
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
        className:
          isOverdue(todoData.dueDate) && !todoData.completed
            ? "text-destructive"
            : "",
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
      createEl("button", {
        className: "absolute cursor-pointer right-[2px] top-[4px]",
        children: [
          createEl("img", {
            className: "h-4 w-4",
            src: "../images/icons/trash.svg",
            alt: "delete",
          }),
        ],
        onclick: () => {
          Controller.deleteTodo(todoData.id);
        },
      }),
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

export function DeleteAllTodosButton() {
  return createEl("button", {
    text: "Delete All Todos",
    className: "btn btn-destructive",
    onclick: () => Controller.deleteAllTodo(),
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

      DeleteAllTodosButton(),

      AddTodoForm(),
      ...todoSections,
    ],
  });
  return main;
}
