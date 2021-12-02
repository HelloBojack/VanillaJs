Function.prototype.myCall = function (context = window, ...args) {

  context.$fn = this
  context.$fn(...args)
  delete context.$fn
  return this
}

function fn() {
  console.log(this.name)
}

let obj = {
  name: 'k'
}

var name = 'x'
fn()
// obj.fn()
fn.myCall(obj)
fn.myCall()


function f1() { console.log(1) }
function f2() { console.log(2) }

f1.call(f2)
f1.call.call(f2)
Function.prototype.call(f1)
Function.prototype.call.call(f1)
