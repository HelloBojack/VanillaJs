function Person(name) {
  this.name = name;
}
console.log(new Person('k'))

function myNew(con, ...args) {
  const obj = {}
  obj.__proto__ = con.prototype
  con.apply(obj, args)
  return obj
}
console.log(myNew(Person, 'k'))