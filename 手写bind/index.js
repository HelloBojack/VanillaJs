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

