const list = document.querySelector(".list");

let dragItem;

list.ondragstart = (e) => {
  dragItem = e.target;
  setTimeout(() => e.target.classList.add("moving"), 0);
  e.dataTransfer.effectAllowed = "move";
};

list.ondragover = (e) => {
  e.preventDefault();
};

list.ondragenter = (e) => {
  e.preventDefault();
  if (e.target === list || e.target == dragItem) return;
  const children = Array.from(list.children);
  const dragIndex = children.indexOf(dragItem);
  const targetIndex = children.indexOf(e.target);

  if (dragIndex > targetIndex) {
    list.insertBefore(dragItem, e.target);
  } else {
    list.insertBefore(dragItem, e.target.nextElementSibling);
  }
};

list.ondragend = (e) => {
  setTimeout(() => e.target.classList.remove("moving"), 0);
};
