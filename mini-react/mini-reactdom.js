let hooksState = [];
let hooksIndex = [];
let schellUpdate;

function useState(initialState) {
  hooksState[hooksIndex] = hooksState[hooksIndex] || initialState;
  let currentIndex = hooksIndex;
  function setState(newState) {
    hooksIndex[currentIndex] = newState;
    schellUpdate();
  }

  return [hooksState[hooksIndex++], setState];
}

function useReducer(reducer, initialState) {
  hooksState[hooksIndex] = hooksState[hooksIndex] || initialState;
  let currentIndex = hooksIndex;
  function dispatch(action) {
    hooksState[currentIndex] = reducer(hooksState[currentIndex], action);
    schellUpdate();
  }

  return [hooksState[hooksIndex++], dispatch];
}

function useMemo(factory, deps) {
  if (hooksState[hooksIndex]) {
    let [oldMemo, oldDeps] = hooksState[hooksIndex];
    if (deps.every((dep, index) => dep == oldDeps[index])) {
      hooksIndex++;
      return oldMemo;
    } else {
      let newMemo = factory();
      hooksState[hooksIndex++] = [newMemo, deps];
      return newMemo;
    }
  } else {
    let newMemo = factory();
    hooksState[hooksIndex++] = [newMemo, deps];
    return newMemo;
  }
}
function useCallback(callback, deps) {
  if (hooksState[hooksIndex]) {
    let [oldcallback, oldDeps] = hooksState[hooksIndex];
    if (deps.every((dep, index) => dep == oldDeps[index])) {
      hooksIndex++;
      return oldcallback;
    } else {
      hooksState[hooksIndex++] = [callback, deps];
      return callback;
    }
  } else {
    hooksState[hooksIndex++] = [callback, deps];
    return callback;
  }
}

function useEffect(callback, deps) {
  if (hooksState[hooksIndex]) {
    // 有数据
    let [oldcallback, oldDeps] = hooksState[hooksIndex];
    if (deps.every((dep, index) => dep == oldDeps[index])) {
      hooksIndex++;
    } else {
      oldcallback && oldcallback();
      setTimeout(() => {
        hooksState[hooksIndex] = [callback(), deps];
      }, 0);
      hooksIndex++;
    }
  } else {
    // 没数据
    setTimeout(() => {
      hooksState[hooksIndex] = [callback(), deps];
    }, 0);
    hooksIndex++;
  }
}

function useLayoutEffect(callback, deps) {
  if (hooksState[hooksIndex]) {
    // 有数据
    let [oldcallback, oldDeps] = hooksState[hooksIndex];
    if (deps.every((dep, index) => dep == oldDeps[index])) {
      hooksIndex++;
    } else {
      oldcallback && oldcallback();
      queueMicrotask(() => {
        hooksState[hooksIndex] = [callback(), deps];
      }, 0);
      hooksIndex++;
    }
  } else {
    // 没数据
    queueMicrotask(() => {
      hooksState[hooksIndex] = [callback(), deps];
    }, 0);
    hooksIndex++;
  }
}

function useRef(initialState) {
  hooksState[hooksIndex] = hooksState[hooksIndex] || initialState;
  return hooksState[hooksIndex++];
}

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
  let fnVNode = type(props);
  vdom.oldVNode = fnVNode;
  return createDom(fnVNode);
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
  schellUpdate = () => {
    hooksIndex = 0;
    twoVNode(container, vdom, vdom);
  };
}

function mount(vdom, container) {
  let rdom = createDom(vdom);
  container.appendChild(rdom);
}

function twoVNode(parentDom, oldVNode, newVNode) {
  let oldDom = findOldDom(oldVNode);
  let newDom = createDom(newVNode);
  parentDom.replaceChild(newDom, oldDom);
  /*
 1. 老新都没
 2. 老有 新没  删除老
 3. 老没 新有  创建新
 4. 两个都有 类型不同 删除老 创建新
 5. 两个都有 
    1. 都是文本类型 复用DOM 修改textContent
    2. 原生类型
    3. 类组件 
    4. 函数组件
  
  1. old 创建map映射表 map {key:dom}
  2.
  3. 遍历new 通过key查找 有->复用
*/
}
function findOldDom(oldVNode) {
  if (!oldVNode) return null;
  if (oldVNode.dom) {
    return oldVNode.dom;
  } else {
    findOldDom(oldVNode.oldVNode);
  }
}

const MReactDOM = {
  render,
};
