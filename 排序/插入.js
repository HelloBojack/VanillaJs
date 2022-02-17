function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let cur = i
    while (cur && arr[cur] < arr[cur - 1]) {
      [arr[cur], arr[cur - 1]] = [arr[cur - 1], arr[cur]]
      cur--
    }
  }
  return arr
}
console.log(insertSort([10, 1, 5, 6, 2, 0]));