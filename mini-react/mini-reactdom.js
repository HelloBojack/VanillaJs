class Component {
  constructor(props) {
    this.props = props;
  }
  static isClassComponent = true;
}

function createDom(vdom) {
  let { type, props, content } = vdom;
  let dom;
  // type
  if (type == REACT_TEXT) {
    dom = document.createTextNode(content);
  } else if (typeof type == "function") {
    if (type.isClassComponent) {
      return mountClassCom(vdom);
    }
    return mountFnCom(vdom);
  } else {
    dom = document.createElement(type);
  }

  // props
  if (props) {
    updataProps(dom, {}, props);
    // children
    let children = props.children;
    if (children) {
      appendChild(children, dom);
    }
  }

  return dom;
}

function mountClassCom(vdom) {
  let { type, props } = vdom;
  let classInstance = new type(props);
  let dom = classInstance.render();
  return createDom(dom);
}
function mountFnCom(vdom) {
  let { type, props } = vdom;
  let dom = type(props);
  return createDom(dom);
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

function appendChild(children, dom) {
  // 1. 1个
  // 2. 多个
  children = toObject(children);
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
  Component,
};
