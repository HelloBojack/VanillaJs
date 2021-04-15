console.log('map')

Array.prototype._map = function (fn) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`)
  }
  let arr = []
  for (let i = 0; i < this.length; i++) {
    arr.push(fn(this[i]))
  }
  return arr;
}

let arr = [1, 2, 3, 4]



console.log(arr._map((i, index) => i >= 2))