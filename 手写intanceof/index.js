let arr = []

console.log(arr instanceof Array)
console.log(arr instanceof Object)

function myInstanceof(obj, constructor) {
  let proto = obj.__proto__

  while (proto) {
    if (proto == constructor.prototype) {
      return true
    }
    proto = proto.__proto__
  }
}

console.log(myInstanceof(arr, Array))
console.log(myInstanceof(arr, Object))