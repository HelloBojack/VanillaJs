function limitLoad(urls, handler, limit) {
  const sequence = [].concat(urls)
  let promise = []
  promise = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index
    })
  })
  let p = Promise.race(promise)
  // for循环给p赋值相当于.then().then()链式调用
  for (let i = 0; i < sequence.length; i++) {
    p = p.then(res => {
      promise[res] = handler(sequence[i]).then(() => {
        return res
      })
      return Promise.race(promise)
    })
  }
}

const urls = [
  { info: '1', time: 2000 },
  { info: '2', time: 1000 },
  { info: '3', time: 2000 },
  { info: '4', time: 2000 },
  { info: '5', time: 3000 },
  { info: '6', time: 1000 },
  { info: '7', time: 2000 },
  { info: '8', time: 2000 },
  { info: '9', time: 3000 },
  { info: '10', time: 1000 }
]

function loadImg(url) {
  return new Promise((reslove, reject) => {
    console.log(url.info + '---start')
    setTimeout(() => {
      console.log(url.info, 'ok!!!')
      reslove()
    }, url.time)
  })
}

limitLoad(urls, loadImg, 3)