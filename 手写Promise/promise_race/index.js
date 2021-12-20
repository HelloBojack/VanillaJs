Promise.myRace = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(item => {
      Promise.resolve(item).then(resolve).catch(reject)
    })
  })
}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success 1')
  }, 500)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success 2')
  }, 100)
})



Promise.myRace([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})


