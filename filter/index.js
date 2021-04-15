console.log('filter')

Array.prototype._filter = function (fn) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`)
  }
  let arr = []
  for (let i = 0; i < this.length; i++) {
    fn(this[i]) && (arr.push(this[i]))
  }
  return arr;
}

let arr = [1, 2, 3, 4]



console.log(arr._filter((i, index) => i >= 2))