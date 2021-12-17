let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('1s')
    resolve('success')
  }, 1000);
})

let p1 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1ssss')
      resolve('success')
    }, 1000)
  })
}

async function test() {
  let result = await p1()
  console.log(result)
}

test()
// p.then((res) => {
//   console.log(res)
//   return new Promise((resolve, reject) => {
//     resolve('success2')
//   })
// }, (err) => {
//   console.log(err)
// })
  // .then((res) => {
  //   console.log(res)
  //   return new Promise((resolve, reject) => {
  //     console.log(people)
  //     reject('error3')
  //   })
  // }, (err) => {
  //   console.log(err)
  // })
  // .then((res) => {
  //   console.log(res)
  // }, (err) => {
  //   console.log('reject3:' + err)
  //   console.log(people)
  // }).catch((err) => {
  //   console.log('reject_last:' + err)
  // })
