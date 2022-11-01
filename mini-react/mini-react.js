const REACT_ELEMENT = "react.element";
const REACT_TEXT = "react.text";

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
    this.updateComponent();
  }
  updateComponent() {
    if (this.penddingState.length > 0) {
      shouldUpdata(this.classInstance, this.getState());
    }
  }
  getState() {
    this.penddingState.forEach((nextState) => {
      this.classInstance.state = { ...this.classInstance.state, nextState };
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
