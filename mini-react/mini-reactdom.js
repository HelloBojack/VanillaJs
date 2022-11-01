function addEvent(dom, eventType, handler) {
  let store = dom.store || (dom.store = {});
  store[eventType] = handler;
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}
function dispatchEvent(event) {
  let { target, type } = event;
  let eventType = `on${type}`;
  let { store } = target;
  let handler = store && store[eventType];

  updateQueue.isBatchingUpdate = true;
  let syntheticEvent = createSyntheticEvent(event);
  handler && handler(syntheticEvent);
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate();
}

function createSyntheticEvent(nativeEvent) {
  let syntheticEvent = {};
  for (const key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
  syntheticEvent.nativeEvent = nativeEvent;
  return syntheticEvent;
}

function createDom(vdom) {
  let { type, props, content, ref } = vdom;
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
  //
  vdom.dom = dom;
  if (ref) {
    ref.current = dom;
  }
  return dom;
}

function mountClassCom(vdom) {
  let { type, props } = vdom;
  let classInstance = new type(props);
  let classVNode = classInstance.render();
  classInstance.oldVNode = classVNode;
  return createDom(classVNode);
}
function mountFnCom(vdom) {
  let { type, props } = vdom;
  console.log(type);

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
    } else if (key.startsWith("on")) {
      // dom[key.toLocaleLowerCase()] = newProps[key];
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
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

function twoVNode(parentDom, oldVNode, newVNode) {
  let oldDom = oldVNode.dom;
  let newDom = createDom(newVNode);
  parentDom.replaceChild(newDom, oldDom);
}

const MReactDOM = {
  render,
};
