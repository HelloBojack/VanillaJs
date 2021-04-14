console.log('debounce.js')

//连续的触发只触发一次（搜索框）
function debounceFn(fn, delay) {
  let flg = null
  return () => {
    flg && (clearTimeout(flg))
    flg = setTimeout(() => {
      fn()
    }, delay)
  }
}

helloFn = () => {
  console.log('hello')
}

document.querySelector('input').addEventListener('input', debounceFn(helloFn, 300))
