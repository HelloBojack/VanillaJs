
// lazyMan('k').eat('apple').sleep(1000).beforeEat('orange')


class LazyMan {
  constructor(name) {
    this.name = name;
    this.queue = []
    console.log(`${this.name} is created`)
    setTimeout(() => {
      this.next()
    }, 0)
  }

  eat(food) {
    this.queue.push(() => {
      console.log(`${this.name} eating ${food}`)
    })
    return this
  }

  sleep(time) {
    this.queue.push(() => {
      console.log(`${this.name} sleeping ${time}`)
    })
    return this
  }

  beforeEat(food) {
    this.queue.unshift(() => {
      console.log(`${this.name} before eating ${food}`)
    })
    return this
  }

  next() {
    const fn = this.queue.shift()
    if (fn) {
      fn()
      setTimeout(() => {
        this.next()
      }, 0)
    }
  }
}


new LazyMan('k').eat('apple').sleep(1000).beforeEat('orange')