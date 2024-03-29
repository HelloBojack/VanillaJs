// class MiniHeap {
//   constructor() {
//     this.heap = []
//   }
//   swap(i, j) {
//     [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
//   }
//   getLeftChildIndex(parentIndex) {
//     return 2 * parentIndex + 1
//   }
//   getRightChildIndex(parentIndex) {
//     return 2 * parentIndex + 2
//   }
//   getFatherIndex(childIndex) {
//     return Math.floor((childIndex - 1) / 2)
//   }
//   shiftUP(index) {
//     if (index === 0) return
//     const fatherIndex = this.getFatherIndex(index)
//     if (this.heap[fatherIndex] > this.heap[index]) {
//       this.swap(fatherIndex, index)
//       this.shiftUP(fatherIndex)
//     }
//   }
//   insert(item) {
//     this.heap.push(item)
//     this.shiftUP(this.heap.length - 1)
//   }
//   size() {
//     return this.heap.length
//   }
//   peek() {
//     return this.heap[0]
//   }
// }

// var findKthLargest = function (nums, k) {
//   let mini = new MiniHeap()
//   for (let i = 0; i < nums.length; i++) {
//     mini.insert(nums[i])
//     console.log(mini.heap, mini.size(), mini.peek())
//   }
// };
class MinHeap {
  constructor() {
    this.heap = [];
  }
  // 交换节点位置
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }
  // 获得父节点
  getParentIndex(i) {
    return (i - 1) >> 1;
  }
  // 获得左节点
  getleftIndex(i) {
    return 2 * i + 1;
  }
  // 获得右节点
  getrightIndex(i) {
    return 2 * i + 2;
  }
  // 上移
  shiftUp(index) {
    if (index === 0) return;

    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  // 下移
  shiftDown(index) {
    const leftIndex = this.getleftIndex(index);
    const rightIndex = this.getrightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  // 插入
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  // 删除堆顶
  pop() {
    // pop()方法删除数组最后一个元素并返回，赋值给堆顶
    this.heap[0] = this.heap.pop();
    // 对堆顶重新排序
    this.shiftDown(0);
  }
  // 获取堆顶
  peek() {
    return this.heap[0];
  }
  // 获取堆的大小
  size() {
    return this.heap.length;
  }
}

const findKthLargest = (nums, k) => {
  const minHeap = new MinHeap();
  for (const num of nums) {
    // 将数组元素依次插入堆中
    minHeap.insert(num);
    console.log(num, minHeap.heap);
    // 如果堆大小超过k， 开始裁员， 将堆顶(最小) 的去掉
    if (minHeap.size() > k) minHeap.pop();
  }
  // 返回堆顶，此时就是第k大的元素
  return minHeap.peek();
};

findKthLargest([3, 2, 1, 5, 6, 4], 2)

