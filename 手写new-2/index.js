function Person(name) {
  this.name = name;
}
let p = new Person('p');

function myNew(constructor, ...props) {
  let obj = {}
  obj.__proto__ = constructor.prototype
  constructor.apply(obj, props)
  return obj
}

let k = myNew(Person, 'k');
console.log(k)