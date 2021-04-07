console.log('throttle')

function throttle(fn, delay) {
  let flag = true
  return function () {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, arguments)
      flag = true
    }, delay)

  }
}
function sayHi(e) {
  // console.log(e)
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi, 1000))