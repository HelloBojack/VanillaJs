Function.prototype.myApply = function (context, args = []) {
  context = context || window
  context.$fn = this
  let result = context.$fn(...args)
  delete context.$fn
  return result
}

function fn() {
  console.log(this.name)
}

// console.log(Math.min.apply(window, [1, 2, 3, 4, 5]))
console.log(Math.min.myApply(null, [1, 2, 3, 4, 5]))