// const obj = {
//   a: 1,
//   b: "2",
//   c: [1, 2, 3],
// };
// const fuc = (obj) => {
//   const props = { ...obj };
//   props.a = "1";
//   props.b = 2;
//   props.c.push(4);
//   return props;
// };
// const obj2 = fuc(obj);
// console.log(obj)
// console.log(obj2)

// Function.prototype.a = () => {
//   console.log(1);
// };
// Object.prototype.b = () => {
//   console.log(2);
// };
// function A() { }
// const a = new A();

// // a.a();
// a.b();
// A.a();
// A.b();

// // 3
// console.log(1);

// setTimeout(() => {
//   console.log(2);
// });

// setTimeout(() => {
//   console.log(3);
// });

// new Promise((resolve) => {
//   console.log(4);

//   resolve();

//   console.log(5);
// }).then(() => {
//   console.log(6);
// });

// Promise.resolve().then(() => {
//   console.log(7);
// });

// // 1 4 5 6 7 2 3


for (var i = 0; i <= 5; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i)
    }, 1000 * i)
  })(i)
}