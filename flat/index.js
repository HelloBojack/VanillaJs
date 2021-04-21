Array.prototype._flat = function () {
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

let arr = [1, 2, 3, [1, 2, 3], [1, 2, 3, [1, 2, 3, [1, 2, 3]]]]
let arr1 = [1, 2, 3, [1, 2, 3],]
console.log(arr._flat())