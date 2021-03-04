console.log('定义一个常量对象.js')

function getType(x) {
  return Object.prototype.toString.call(x).match(/\s+(\w+)/)[1].toLowerCase()
}

const OBJ = {
  name: 'bojack',
  value: '1',
  family: {
    father: {
      name: 'xu'
    },
    number: 5
  }
}
OBJ.name = 'xu'
OBJ.family.number = 100
console.log('OBJ.name:' + OBJ.name)
console.log('OBJ.family.number:' + OBJ.family.number)

function constObj(obj) {
  const newObj = new Proxy(obj, {
    get(target, key) {
      return getType(Reflect.get(target, key)) == 'object' ? constObj(Reflect.get(target, key)) : Reflect.get(target, key)
    },
    set(target, key, value) {
      Reflect.set(target, key, Reflect.get(target, key))
    }
  })
  return newObj
}
let newOBJ = constObj(OBJ)

newOBJ.name = 'bojack'
newOBJ.family.number = 0
console.log('newOBJ.name:' + newOBJ.name)
console.log('newOBJ.family.number:' + newOBJ.family.number)

// console.log('OBJ.family.father.name:' + OBJ.family.father.name)


