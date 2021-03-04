function repeat(func, times, wait) {
  //补充代码
  return function () {
    let arg = arguments[0]
    let i = 0;
    let hander = setInterval(function () {
      if (i == times) {
        clearInterval(hander)
        return
      }
      i++
      func(arg)
    }, wait)

  }
}
//使下面调用代码能正常工作
const repeatFunc = repeat(console.log, 4, 3000)
repeatFunc("helloworld")//会输出四次helloworld，每次间隔3s