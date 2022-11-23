class A {
  toString() {
    return "123";
  }
}
Object.prototype.toString = () => {
  return "1";
};
console.log(Object.prototype.toString.call(A));
