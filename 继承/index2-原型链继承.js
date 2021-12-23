function Parent() {
  this.names = ['kevin', 'daisy'];
}
Parent.prototype.getName = function () {
  console.log(this.names);
}

function Child(name) {
  this.name = name
}

Child.prototype = new Parent();

var child1 = new Child('c1');

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]
console.log(child1.name); // c1

var child2 = new Child('c2');

console.log(child2.names); // ["kevin", "daisy", "yayu"]
console.log(child2.name); // c2

child1.getName(); // ["kevin", "daisy", "yayu"]

// 原理：利用原型链向上查找的机制实现继承，
// 给 Child.prototype 赋值为父类的一个实例，
// 当把Child作为构造函数在它的实例child1上查找属性时查找顺序依次是 child1本身 -> Child.prototype（Parent实例）-> Parent.prototype
// 这样既能继承父类构造函数上的属性。也能继承父类原型上的属性。

// 缺点：因为 child1.__proto__ === child2.__proto__ === Child.prototype，
// 所以当改变父类构造函数上的引用类型的属性时，child1和O2会相互影响，
// 例子中当改变 child1.names 时，child2.names 也跟着变了就是这个原因，
// 而 child1.name 变了 child2.name 没变是因为当设置值时会优先在 child1 自身上查找没有发现 name 属性会在 child1 自身上设置 name 值，
// 这个时候根本没有影响到 __proto__ 上的name。
// child1 和 child2 上的值不管是自身构造函数上的还是父类构造函数的都应该独立维护相互影响是我们不希望看到的。

// 1.引用类型的属性被所有实例共享，
// 2.在创建 Child 的实例时，不能向Parent传参