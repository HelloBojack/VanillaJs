console.log('throttle')
//每隔一段时间内只触发一次（抢购）
function throttle(fn, delay) {
  let flg = true
  // console.log(this)
  // var that = this
  return function () {
    console.log(this)
    if (!flg) return false
    flg = false
    setTimeout(() => {

      fn.apply(this, arguments)
      flg = true
    }, delay)
  }
}
function sayHi(e) {
  console.log(e)
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi, 2200))