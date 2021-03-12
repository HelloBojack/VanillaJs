console.log('throttle')

function throttle(fn, delay) {
  let flag = true;
  return (...args) => {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn(...args)
      flag = true
    }, delay)
  }
}
function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi, 500))