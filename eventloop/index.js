function async1() {
  console.log('async1 start');

  Promise.resolve(async2()).then(() => {
    console.log('async1 end');
  });
}

function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function () {
  console.log('settimeout');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
