// function Test() {
//   this.a = 'a'
//   this.b = 'b'
// }
// console.log(Test.prototype)

// let test = new Test()
// test.__proto__.c = 'c'
// console.log(test.__proto__)

// console.log(Test.prototype === test.__proto__)

// console.log(Test.prototype.__proto__ == Object.prototype)
// console.log(Object.prototype.__proto__)

// console.log(test.a)
// console.log(test.b)
// console.log(test.c)
// console.log(test.hasOwnProperty('a'))
// console.log(test.hasOwnProperty('b'))
// console.log(test.hasOwnProperty('c'))
// console.log('a' in test)
// console.log('b' in test)
// console.log('c' in test)


// console.log(Object.getPrototypeOf(test) == Test.prototype)

function Animal(name, age) {
  this.name = name;
  this.age = age
}
Animal.prototype.sport = function () {
  console.log(this.name + 'sport')
}

function extend(sub, dom) {
  sub.prototype = Object.create(dom.prototype)
  Object.defineProperty(sub.prototype, "constructor", {
    value: sub,
    enumerable: false
  })
}
function Dog(name, age) {
  Animal.call(this, name, age)
}

extend(Dog, Animal)
// Dog.prototype = new Animal()
// Object.defineProperty(Dog.prototype, "constructor", {
//   value: Dog,
//   enumerable: false
// })

let dog = new Dog('123', 1)
// console.log(dog.__proto__.constructor)
console.log(dog)
console.log(dog.sport())


