console.log('debounce.js')

function debounceFn(fn, delay, immediate) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
function submit(e) {
  // console.log(this)
  // console.log(e)
  console.log('submit')
}

document.querySelector('button').addEventListener('click', debounceFn(submit, 1000,))
