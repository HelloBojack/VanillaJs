var obj = {
  name: '小马扎',
  age: 18
};

Object.prototype.car = '筋斗云';    // 在Object类中定义car属性

console.log("car" in obj);    // true
console.log("fly" in obj);    // false
console.log("age" in obj);    // false