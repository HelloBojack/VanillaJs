function createDom(vdom) {
  let { type, props, content } = vdom;
  let dom;
  // type
  if (type == REACT_TEXT) {
    dom = document.createTextNode(content);
  } else {
    dom = document.createElement(type);
  }

  // props
  if (props) {
    updataProps(dom, {}, props);
    // children
    let children = props.children;
    if (children) {
      appendChild(dom, children);
    }
  }

  return dom;
}

function updataProps(dom, oldProps, newProps) {
  for (const key in newProps) {
    if (key == "children") {
      continue;
    } else if (key == "style") {
      let styleArr = newProps[key];
      for (const styleKey in styleArr) {
        dom.style[styleKey] = styleArr[styleKey];
      }
    } else {
      dom[key] = newProps[key];
    }
  }

  if (oldProps) {
    for (const key in oldProps) {
      if (!newProps[key]) {
        dom[key] = null;
      }
    }
  }
}

function appendChild(dom, children) {
  // 1. 1个
  // 2. 多个
  console.log(dom, children);
  if (typeof children == "object" && children.type) {
    mount(children, dom);
  } else {
    children.forEach((child) => mount(child, dom));
  }
}

function render(vdom, container) {
  mount(vdom, container);
}

function mount(vdom, container) {
  let rdom = createDom(vdom);
  container.appendChild(rdom);
}

const MReactDOM = {
  render,
};
