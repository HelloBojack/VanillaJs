console.log('curring.js')

function addCurring() {
  let _args = Array.prototype.slice.call(arguments);
  let _arr = function () {
    _args.push(...arguments)
    return _arr
  }
  _arr.toString = () => {
    return _args.reduce((pre, cur) => pre + cur)
  }
  return _arr
}

console.log(addCurring(1)(2)(3))

let list1 = [
  { no: '1' },
  { no: '2' },
  { no: '3' },
  { no: '4' },
]
let list2 = [
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
]
console.log(list1.map(n => n.no))
console.log(list2.map(n => n.id))

let mapCurring = n => m => m[n]

console.log(list1.map(mapCurring('no')))
console.log(list2.map(mapCurring('id')))
