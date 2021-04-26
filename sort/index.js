
let arr = [2, 5, 10, 4, 5, 1, 3,]
// 冒泡排序
// 两两比较，交换位置
// 数组自己,没有开辟新空间，空间复杂度 O(1)
// 循环两边，时间复杂度 O(n^2)
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
// 选择排序
// 选择最大的往最后放
function selectSort(array) {
  for (let i = 0; i < array.length; i++) {
    let index = 0
    for (let j = 0; j < array.length - i; j++) {
      index = array[j] > array[index] ? j : index
    }
    [array[index], array[array.length - 1 - i]] = [array[array.length - 1 - i], array[index]]
  }
  return array
}


// 插入排序
// function insertSort(array) {
//   for (let i = 1; i < array.length; i++) {
//     let j = i - 1;
//     let temp = array[i];
//     while (j >= 0 && array[j] > temp) {
//       array[j + 1] = array[j]
//       j--
//     }
//     array[j + 1] = temp
//   }
//   return array
// }



console.log(selectSort(arr))