class MyPromise {
  constructor(executor) {
    this.initValue();

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }

  }

  initValue() {
    this.PromiseStatus = 'pending';
    this.PromiseResult = null;
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }

  resolve(value) {
    if (this.PromiseStatus !== 'pending') return
    this.PromiseStatus = 'fulfilled';
    this.PromiseResult = value;
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }

  reject(reason) {
    if (this.PromiseStatus !== 'pending') return
    this.PromiseStatus = 'rejected';
    this.PromiseResult = reason;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    let thenPromise = new MyPromise((resolve, reject) => {

      const resolvePromise = fn => {
        queueMicrotask(() => {
          try {
            const temp = fn(this.PromiseResult)
            if (temp instanceof MyPromise) {
              temp.then(resolve, reject)
            } else {
              resolve(temp)
            }
          }
          catch (err) {
            reject(err)
          }
        })
      }


      if (this.PromiseStatus === 'fulfilled') {
        resolvePromise(onFulfilled)
      }
      else if (this.PromiseStatus === 'rejected') {
        resolvePromise(onRejected)
      }
      else {
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })

    return thenPromise
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

console.log('macrotask 1')
let myP = new MyPromise((resolve, reject) => {
  console.log('Promise 1')
  resolve(1)
  // reject(1)
  // throw 3
})
console.log('macrotask 2')
myP.then((res) => {
  console.log('resolve1', res)
  // return 2
  return new MyPromise((resolve, reject) => { reject(2) })
})
  .then((res) => {
    console.log('resolve2', res)
  })
  .catch((err) => {
    console.log('catch', err)
  })
console.log('macrotask 3')


