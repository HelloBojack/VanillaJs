console.log('proxy.js')

const inputDom = document.querySelector('input')
const pDom = document.querySelector('p')

let obj = {
  value: ''
}

obj = new Proxy(obj, {
  get(target, key) {
    // return target[prop]
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    // target[key] = value
    Reflect.set(target, key, value)
    pDom.innerHTML = value
    inputDom.value = value
  }
})

obj.value = '1'

inputDom.oninput = function (e) {
  obj.value = e.target.value
}
inputDom.onkeyup = function (e) {
  if (e.keyCode == 13) {
    console.log(obj.value)
  }
}