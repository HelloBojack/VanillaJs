const REACT_ELEMENT = "react.element";
const REACT_TEXT = "react.text";

const updateQueue = {
  isBatchingUpdate: false, // 控制是否批量更新state  默认false，在事件处理函数触发的时候设置为true ,使得state 更新进行批量异步更新
  updaters: [],
  batchUpdate() {
    updateQueue.updaters.forEach((updater) => updater.updateComponent());
    updateQueue.updaters.length = 0; // 重置为0
    updateQueue.isBatchingUpdate = false;
  },
};

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.penddingState = [];
  }

  addState(partialState) {
    this.penddingState.push(partialState);
    // 更新
    this.emitUpdate();
  }
  emitUpdate() {
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.push(this);
    } else {
      this.updateComponent(); // 触发组件更新
    }
  }
  updateComponent() {
    if (this.penddingState.length > 0) {
      shouldUpdata(this.classInstance, this.getState());
    }
  }
  getState() {
    this.penddingState.forEach((nextState) => {
      this.classInstance.state = { ...this.classInstance.state, ...nextState };
    });
    this.penddingState.length = 0;
    return this.classInstance.state;
  }
}
function shouldUpdata(classInstance, newState) {
  classInstance.state = newState;

  classInstance.forceUpdata();
}
class Component {
  static isClassComponent = true;

  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }

  setState(partialState) {
    this.updater.addState(partialState);
  }

  forceUpdata() {
    let newVNode = this.render();
    let oldVNode = this.oldVNode;
    let oldDom = oldVNode.dom;

    twoVNode(oldDom.parentNode, oldVNode, newVNode);
    this.oldVNode = newVNode;
  }
}
// 文本元素处理
const toObject = (element) => {
  return typeof element == "string" || typeof element == "number"
    ? { type: REACT_TEXT, content: element }
    : element;
};

function createElement(type, props, children) {
  let key, ref;
  if (props) {
    key = props.key;
    ref = props.ref;
    /*
    1. 多儿
    2. 一儿  文本/元素
    3. 无儿
    */
    if (arguments.length > 3) {
      props.children = Array.prototype.slice.call(arguments, 2).map(toObject);
    } else {
      props.children = toObject(children);
    }
  }

  return {
    $$typeof: Symbol(REACT_ELEMENT),
    key,
    props,
    ref,
    type,
  };
}

const MReact = {
  createElement,
  Component,
};
