// before
const obj = {
  first_name: 'chen',
  o_bj: {
    first_name: 'chen',
    obj2: {
      first_name: 'chen'
    }
  }
}
// after
// const obj = {
//   firstName: 'chen'
// }

let ObjecttoString = Object.prototype.toString

function trans(obj) {
  for (const key in obj) {
    if (ObjecttoString.call(obj[key]) === '[object Object]') {
      let temp = key.split('_')
      let newkey = temp[0] + temp[1].slice(0, 1).toUpperCase() + temp[1].slice(1)
      obj[newkey] = obj[key]
      delete obj[key]
      trans(obj[key])
    } else {
      let temp = key.split('_')
      let newkey = temp[0] + temp[1].slice(0, 1).toUpperCase() + temp[1].slice(1)
      obj[newkey] = obj[key]
      delete obj[key]
    }
  }
}
trans(obj)

console.log(obj)
