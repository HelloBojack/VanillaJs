Array.prototype.flat1 = function () {
  let arr = []
  this.forEach(n => {
    if (Array.isArray(n)) {
      arr = arr.concat(n._flat())
    }
    else {
      arr.push(n)
    }
  })
  return arr
}
Array.prototype.flat2 = function () {
  let that = this
  while (that.some(n => Array.isArray(n))) {
    that = [].concat(...that)
  }
  return that
}
Array.prototype.flat3 = function () {
  return this.toString().split(',')
}
Array.prototype.flat4 = function () {
  return this.join(',').split(',')
}
Array.prototype.flat5 = function () {
  return this.reduce((result, n) => {
    return result.concat(Array.isArray(n) ? n.flat5() : n)
  }, [])
}



let arr = [1, 2, 3, [1, 2, 3, [1, 2, 3],],]
console.log(arr.flat5())