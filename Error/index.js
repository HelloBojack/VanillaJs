// console.log(a)
// // Uncaught ReferenceError: a is not defined

// let a;
// a();
// // Uncaught TypeError: a is not a function

// let a = """"
// // Uncaught SyntaxError: Unexpected string

// (function fn() {
//   fn()
// })()
// // Uncaught RangeError: Maximum call stack size exceeded

try {
  let a
  a()
} catch (error) {
  console.dir(error)
  // TypeError: a is not a function
  // at http://127.0.0.1:5502/Error/index.js:18:3
  // message: "a is not a function"
  // stack: "TypeError: a is not a function\n    at http://127.0.0.1:5502/Error/index.js:18:3"
  // [[Prototype]]: Error
  // constructor: ƒ TypeError()
  // message: ""
  // name: "TypeError"
}

function fn(a) {
  if (typeof a !== 'number') {
    throw new TypeError('a is not a number')
  }
  return a
}
fn('1')