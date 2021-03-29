function Test() {
  this.a = 'a'
  this.b = 'b'
}
console.log(Test.prototype)

let test = new Test()
test.__proto__.c = 'c'
console.log(test.__proto__)

console.log(Test.prototype === test.__proto__)

console.log(Test.prototype.__proto__ == Object.prototype)
console.log(Object.prototype.__proto__)

console.log(test.a)
console.log(test.b)
console.log(test.c)
console.log(test.hasOwnProperty('a'))
console.log(test.hasOwnProperty('b'))
console.log(test.hasOwnProperty('c'))
console.log('a' in test)
console.log('b' in test)
console.log('c' in test)


console.log(Object.getPrototypeOf(test) == Test.prototype)