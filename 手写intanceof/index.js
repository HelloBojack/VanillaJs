let arr = []

console.log(arr instanceof Array)
console.log(arr instanceof Object)

function myInstanceof(obj, constructor) {
  let proto = Object.getPrototypeOf(obj)

  while (proto) {
    if (proto == constructor.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

console.log(myInstanceof(arr, Array))
console.log(myInstanceof(arr, Object))
console.log(myInstanceof(arr, Function))