console.log('defineProperty.js')

const inputDom = document.querySelector('input')
const pDom = document.querySelector('p')

let obj = {
  value: ''
}

let _value = ''
Object.defineProperty(obj, 'value', {
  set(value) {
    _value = value
    pDom.innerHTML = value
    inputDom.value = value
  },
  get() {
    return _value
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
