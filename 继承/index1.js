// 优点：
// 1.避免了引用类型的属性被所有实例共享
// 2.可以在 Child 中向 Parent 传参
// 缺点：
// 方法都在构造函数中定义，每次创建实例都会创建一遍方法。
// 只能继承父类构造函数上的属性和方法，不能继承父类原型上的属性和方法。

function Parent(name) {
  this.name = name;
  this.names = ['kevin', 'daisy'];
}
Parent.prototype.getName = function () {
  console.log(this.names);
}
function Child(name) {
  Parent.call(this, name);
}

var child1 = new Child('child1');

child1.names.push('yayu');

console.log(child1.name, child1.names); //  child1 ["kevin", "daisy", "yayu"]
// child1.getName(); // index.js:23 Uncaught TypeError: child1.getName is not a function

var child2 = new Child('child2');

console.log(child2.name, child2.names); // child2 ["kevin", "daisy"]


