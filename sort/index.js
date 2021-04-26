function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j + 1], array[j]] = [array[j], array[j + 1]]
      }
    }
  }
  return array
}

let arr = [2, 5, 10, 4, 5, 1, 3,]

console.log(bubbleSort(arr))