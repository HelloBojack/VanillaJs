// JS随机生成颜色

function genColor() {
  let color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
  let color2 = '#' + (Math.random()).toString(16).slice(2, 8)
  let div1 = document.createElement('div')
  div1.style.width = '100px'
  div1.style.height = '100px'
  div1.style.backgroundColor = color
  div1.style.border = `10px solid ${color2}`
  document.querySelector('body').appendChild(div1)
}

genColor()