(function (window) {

  function Promise(executor) {
    this.status = 'pending'
    this.data = undefined
    this.callBackQueue = []

    let that = this

    function resolve(value) {
      if (that.status !== 'pending') return
      that.status = 'fulfilled'
      that.data = value

      setTimeout(() => {
        if (that.callBackQueue.length > 0) {
          that.callBackQueue.forEach(item => {
            item.onFulfilled(value)
          })
        }
      })
    }

    function reject(reason) {
      if (that.status !== 'pending') return
      that.status = 'rejected'
      that.data = reason
      setTimeout(() => {
        if (that.callBackQueue.length > 0) {
          that.callBackQueue.forEach(item => {
            item.onRejected(reason)
          })
        }
      })
    }

    try {
      executor(resolve, reject)
    }
    catch (err) {
      reject(err)
    }
  }

  Promise.prototype.then = function (onFulfilled, onRejected) {

    if (this.status === 'pending') {
      this.callBackQueue.push({ onFulfilled, onRejected })
    }
    else if (this.status === 'fulfilled') {
      setTimeout(() => {
        onFulfilled(this.data)
      })
    }
    else {
      setTimeout(() => {
        onRejected(this.data)
      })
    }

  }
  Promise.prototype.catch = function (onRejected) {
  }


  Promise.resolve = function (value) { }
  Promise.reject = function (reason) { }

  window.Promise = Promise;

})(window)


let p = new Promise((resolve, reject) => {
  console.log('Promise 1')
  // resolve(1)
  reject(1)
})
console.log('---')

p.then((res) => {
  console.log('resolve', res)
}, (err) => {
  console.log('reject', err)
})