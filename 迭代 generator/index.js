let arr = [1, 2, 3];

function* generator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}

const iterator = generator(arr);

// console.log(iterator.next()); // {value: 1, done: false}
// console.log(iterator.next()); // {value: 2, done: false}
// console.log(iterator.next()); // {value: 3, done: false}
// console.log(iterator.next()); // {value: undefined, done: true}

// object 不支持 for of
// obj is not iterable
let obj = {
  a: 1,
  b: 2,
  c: 3,
};
// Object.prototype[Symbol.iterator] = function* () {
//   let keys = Object.keys(this);
//   for (let key of keys) {
//     yield { key, value: this[key] };
//   }
// };

Object.prototype[Symbol.iterator] = function () {
  let keys = Object.keys(this);
  let cnt = 0;
  let _this = this;
  return {
    next: function () {
      return cnt > keys.length
        ? {
            value: undefined,
            done: true,
          }
        : {
            value: { key: keys[cnt], value: _this[keys[cnt++]] },
            done: false,
          };
    },
  };
};

// for (let { key, value } of obj) {
//   console.log(key, value);
// }
let m = new Map();
m.set("a", 1);
m.set("b", 2);
m.set("c", 3);
// console.log(m);
function replacer(key, value) {
  if (value instanceof Map) {
    return {
      type: "Map",
      value: [...value],
    };
  }
  return value;
}
let json_map = JSON.stringify(m, replacer);
console.log(json_map);

function reviver(key, value) {
  if (value.type === "Map") {
    return new Map(value.value);
  }
  return value;
}

console.log(JSON.parse(json_map, reviver));
