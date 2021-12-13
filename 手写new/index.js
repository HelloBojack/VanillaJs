function Person(name) {
  this.name = name;
  return { 123: '123' }
}
Person.prototype.getName = function () {
  console.log(this.name);
}
let p = new Person('p');

console.log(p, p.name);
p.getName();

function _new(obj, ...args) {
  let o = {};
  o.__proto__ = obj.prototype;
  let res = obj.apply(o, args);
  return res instanceof Object ? res : o;
}
let pp = _new(Person, 'pp');
console.log(pp)
pp.getName();