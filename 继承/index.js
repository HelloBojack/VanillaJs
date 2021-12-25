function Parent(sex) {
  this.sex = sex
}
Parent.prototype.getSex = function () {
  console.log(this.sex)
}
function Children(name, sex) {
  Parent.call(this, sex)
  this.name = name
}
Children.prototype = Object.create(Parent.prototype)
Children.prototype.constructor = Children

let p = new Parent()
let c1 = new Children('c1', 'male')
let c2 = new Children('c2', 'female')

console.log(p, c1, c2)
c1.getSex()
console.log(c1 instanceof Parent)