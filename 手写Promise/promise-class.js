class MyPromise {
  PromiseState = "pending"
  PromiseResult = undefined
  FulfilledQueue = []
  RejectedQueue = []


  constructor(exectuor) {
    try {
      exectuor(this.resolve.bind(this), this.reject.bind(this))
    }
    catch (error) {
      this.reject(error)
    }
  }

  resolve(result) {
    queueMicrotask(() => {
      if (this.PromiseState !== "pending") return
      this.PromiseState = "fulfilled"
      this.PromiseResult = result
      this.FulfilledQueue.forEach(fn => fn(result))
    })
  }
  reject(error) {
    queueMicrotask(() => {
      if (this.PromiseState !== "pending") return
      this.PromiseState = "rejected"
      this.PromiseResult = error
      this.RejectedQueue.forEach(fn => fn(error))
    })
  }

  then(onFulfilled, onRejected) {

    return new MyPromise((resolve, reject) => {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : result => result
      onRejected = typeof onRejected === "function" ? onRejected : error => { throw error }
      if (this.PromiseState === 'pending') {
        this.FulfilledQueue.push(onFulfilled)
        this.RejectedQueue.push(onRejected)
      }
      else if (this.PromiseState === 'fulfilled') {
        queueMicrotask(() => {
          onFulfilled(this.PromiseResult)
        })
      }
      else if (this.PromiseState === 'rejected') {
        queueMicrotask(() => {
          onRejected(this.PromiseResult)
        })
      }
    })
  }

  catch(onRejected) {
    this.PromiseResult && onRejected(this.PromiseResult)
  }

}

console.log('1')
let myP = new MyPromise((resolve, reject) => {
  console.log('Promise 1')

  resolve(1)
  console.log(2)
  // reject(1)
  // throw 3
})
console.log('---')
myP.then((res) => {
  console.log('resolve1', res)
  return 1
})
  .then((res) => {
    console.log('resolve2', res)
  })
console.log(3)