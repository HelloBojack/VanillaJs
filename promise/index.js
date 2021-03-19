let promise1 = new Promise(function (resolve) {
  resolve(1);
});
let promise2 = new Promise(function (resolve) {
  resolve(2);
});
let promise3 = new Promise(function (resolve) {
  resolve(3);
});

// let promiseAll = Promise.all([promise1, promise2, promise3]);
// promiseAll.then(function (res) {
//   console.log(res);
// });

Promise.myAll = function (promises) {
  if (!Array.isArray(promises)) {
    return this.reject(new TypeError('arguments must be Array'))
  }
  let results = new Array(promises.length)
  return new Promise((reslove, reject) => {
    promises.map((n, i) => {
      n.then(res => {
        results[i] = res
      })
      reslove(results)
    })
  })

}
let promiseMyAll = Promise.myAll([promise1, promise2, promise3]);
promiseMyAll.then(function (res) {
  console.log(res);
});
