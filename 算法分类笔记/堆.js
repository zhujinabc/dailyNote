/* 
特点
第 n 个元素的 左子节点 为 2*n+1
第 n 个元素的 右子节点 为 2*n+2
第 n 个元素的 父节点 为 (n-1)/2
最后一个非叶子节点为 Math.floor(arr.length/2)-1
堆是具有以下性质的完全二叉树：

大顶堆：每个节点的值都 大于或等于 其左右孩子节点的值

注：没有要求左右值的大小关系

小顶堆：每个节点的值都 小于或等于 其左右孩子节点的值

大顶堆特点：arr[i] >= arr[2*i+1] && arr[i] >= arr[2*i+2]，i 对应第几个节点，i 从 0 开始编号
小顶堆特点：arr[i] <= arr[2*i+1] && arr[i] <= arr[2*i+2]，i 对应第几个节点，i 从 0 开始

排序说明
升序：一般采用大顶堆
降序：一般采用小顶堆
 */
// topK问题是典型的可以用大顶堆解决的算法问题

// 1.数组中的第K个最大元素
//给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
//请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  let len = nums.length;
  const swap = (i, j) => {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };
  //调整堆节点
  const maxfuily = (i) => {
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    let largest = i;
    if (l < len && nums[l] > nums[largest]) {
      largest = l;
    }
    if (r < len && nums[r] > nums[largest]) {
      largest = r;
    }
    if (i !== largest) {
      swap(i, largest);
      maxfuily(largest);
    }
  };
  //构建一个大顶堆
  const buildHeap = () => {
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
      maxfuily(i);
    }
  };
  buildHeap();
  //i >= nums.length - k + 1 替换为i >= 0 即为堆排序
  for (let i = len - 1; i >= nums.length - k + 1; i--) {
    swap(i, 0);
    len--;
    maxfuily(0); //堆顶变了，需要重新调整堆
  }
  return nums[0];
};
