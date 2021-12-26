function fn(name) {
  console.log('fn' + name)
}

Function.prototype.before = function (beforefn) {
  return (...args) => {
    beforefn()
    this(...args)
  }
}

const fnb = fn.before(function fn2() {
  console.log('fn2')
})

fnb(1)