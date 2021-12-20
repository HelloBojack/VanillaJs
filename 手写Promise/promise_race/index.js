Promise.myAllSettled = function (promiseArr) {
  let result = []
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      item.then(value => {
        result[index] = {
          status: 'fulfilled',
          value: value
        }
        if (index == promiseArr.length - 1) {
          resolve(result)
        }
      }).catch(err => {
        result[index] = {
          status: 'rejected',
          value: err
        }
        if (index == promiseArr.length - 1) {
          resolve(result)
        }
      })
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
    reject('faild 2')
  }, 100)
})

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('faild 3')
  }, 200)
})


Promise.myAllSettled([p1, p2, p3]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})


