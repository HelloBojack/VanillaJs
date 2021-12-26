const isType = (type) => (value) => Object.prototype.toString.call(value) === `[object ${type}]`

const isString = isType('String')
const isNumber = isType('Number')

let str = 'str'
let num = 1
console.log(isString(str), isNumber(num))