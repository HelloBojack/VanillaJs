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

