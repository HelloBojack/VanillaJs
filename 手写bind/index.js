Function.prototype.myBind = function (context, args = []) {
  context = context || window
  context.$fn = this
  let result = context.$fn(...args)
  delete context.$fn
  return result
}

function fn() {
  console.log(this.name)
}

let obj = { name: 'obj' }
let fn2 = fn.bind(obj)
fn()
fn2()

Function.prototype.myBind = function (context, ...args) {
  let fn = this
  return function (...args) {
    context.fn = fn
    let res = context.fn(...args)
    return res
  }
}

Function.prototype.myBind2 = function (context, ...args) {
  let fn = this
  return function (...args) {
    return fn.apply(context, args)
  }
}
let fn3 = fn.myBind(obj)
fn3()
let fn4 = fn.myBind2(obj)
fn4()