console.log('1')
let P = new Promise((resolve, reject) => {
  console.log('Promise 1')

  setTimeout(() => {
    resolve(1)
    console.log(2)
  })
  // reject(1)
  // throw 3
})
console.log('---')
P.then((res) => {
  console.log('resolve1', res)
})
console.log(3)
//   .then((res) => {
//     console.log('resolve2', res)
//   })
//   .catch(err => {
//     console.log('catch', err)
//   })
