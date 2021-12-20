// // 1. 非Promise对象，非thenable对象
// Promise.resolve(1).then(console.log) // 1

// // 2. Promise对象成功状态
const p2 = new Promise((resolve) => resolve(2))

// Promise.resolve(p2).then(console.log) // 2

// // 3. Promise对象失败状态
const p3 = new Promise((_, reject) => reject('err3'))

// Promise.resolve(p3).catch(console.error) // err3

// // 4. thenable对象
// const p4 = {
//   then(resolve) {
//     setTimeout(() => resolve(4), 1000)
//   }
// }
// Promise.resolve(p4).then(console.log) // 4

// // 5. 啥都没传
// Promise.resolve().then(console.log) // undefined

Promise.myResolve = function (value) {
  if (value instanceof Promise) {
    return value
  } else {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
}
Promise.myResolve(1).then(console.log)
Promise.myResolve().then(console.log)

Promise.myResolve(p2).then(console.log) // 2
Promise.myResolve(p3).then(null, (e) => { console.log(e) }) // err3