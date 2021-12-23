// 优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
// 缺点: 方法都在构造函数中定义，每次创建实例都会创建一遍方法。

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

// 1.
// Child.prototype = new Parent();
// 这种方法实现继承，父类构造函数会被执行两次分别在 Parent.call(this) 和 Child.prototype = new Parent()，
// 而且父类构造函数上的属性在子类自身和子类的原型上都存在，
// 这导致执行了 delete child1.arr 只是删除了child1自身上的arr属性，
// child1原型上依然存在，根据原型链向上查找机制child1.arr依然可以访问到。
// 2. 
// Child.prototype = Parent.prototype;
// 优点：子类原型上没有父类构造函数的数据
// 缺点：因为 Child.prototype = Parent.prototype，导致父类和子类的实例无法做出区分。

// 3.1
// 通过手写 Object.create，创建临时中间对象
// var F = function () { };
// F.prototype = Parent.prototype;
// Child.prototype = new F(); 
// 3.1.1 封装一下
// function objectCreate(prototype) {
//   var fn = function () { }
//   fn.prototype = prototype
//   return new fn()
// }
// Child.prototype = objectCreate(Parent.prototype); 
// 3.2
// 通过create函数创建中间对象，把两个对象区分开，因为通过create创建的对象，原型就是create函数的参数。
// 实现了继承，实现了父子类隔离
Child.prototype = Object.create(Parent.prototype)
// 4. 继承多个父类
// Child.prototype = Object.assign(Child.prototype, Parent.prototype, Parent1.prototype, Parent2.prototype)
// Object.assign(target, ...source) 将所有可枚举属性的值从一个或多个源对象分配到目标对象，并返回目标对象。可用于做对象拷贝，
// 当目标对象中只有一级属性，没有二级属性的时候，此方法为深拷贝，但是对象中有对象的时候，此方法在二级属性以后就是浅拷贝。

Child.prototype.constructor = Child;

// var child1 = new Child('kevin', '18');

// child1.colors.push('black');

// console.log(child1.name); // kevin
// console.log(child1.age); // 18
// console.log(child1.colors); // ["red", "blue", "green", "black"]
// delete child1.colors;
// console.log(child1.colors); // ["red", "blue", "green"]

// var child2 = new Child('daisy', '20');

// console.log(child2.name); // daisy
// console.log(child2.age); // 20
// console.log(child2.colors); // ["red", "blue", "green"]

// var child3 = new Child('child3');
// var child4 = new Parent('child4');
// console.log(child3 instanceof Parent, child3 instanceof Child); 
// console.log(child4 instanceof Parent, child4 instanceof Child); 