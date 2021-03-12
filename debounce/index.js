console.log('debounce.js')

function debounceFn(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

helloFn = () => {
  console.log('hello')
}

document.querySelector('input').addEventListener('input', debounceFn(helloFn, 300))
