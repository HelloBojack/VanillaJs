
const after = (times, fn) => {
  return function (...args) {
    if (--times < 1) {
      fn.apply(this, ...args)
    }
  }
}


let fn = after(3, function () {
  console.log('after 3 seconds');
})

fn()
fn()
fn()