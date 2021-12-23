// 手写一个repeact()函数，加上下面的代码运行，使每3秒打印一个helloword，总共执行4次

// function repeact(fn, times, interval) {
//   return (str) => {
//     fn(str)
//     times--
//     let timer = setInterval(() => {
//       fn(str)
//       times--
//       if (times == 0) {
//         clearInterval(timer)
//       }
//     }, interval)
//   }
// }


function repeact(fn, times, interval) {
  return (str) => {
    let run = setTimeout(() => {
      fn(str)
      times--
      if (times == 0) {
        clearTimeout(run)
      } else {
        repeact(fn, times, interval)(str)
      }
    }, interval)
  }
}

const repeatFunc = repeact(console.log, 4, 3000)
repeatFunc('helloword')

