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
