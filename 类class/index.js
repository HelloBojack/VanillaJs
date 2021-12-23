class Parent {
  constructor(sex) {
    this.sex = sex;
    this.names = ['kevin', 'jack', 'tom'];
  }
  hellosex() {
    console.log(this.sex)
  }
}

let k = new Parent('m');
console.log(k)
k.hellosex()

class Child extends Parent {
  constructor(name, sex) {
    super(sex)
    this.name = name
  }
  hello() {
    console.log(this.name, this.sex)
  }
}
let m = new Child('m', 'male')
console.log(m)
m.hello()

