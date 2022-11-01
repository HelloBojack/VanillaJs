const REACT_ELEMENT = "react.element";
const REACT_TEXT = "react.text";

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
};
