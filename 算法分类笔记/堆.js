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
  //构造一个大顶堆
  const buildMaxHeap = (nums, heapSize) => {
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      maxHeapify(nums, heapSize, i);
    }
  };

  //从左往右，自上而下的调整节点
  const maxHeapify = (nums, heapSize, i) => {
    let l = i * 2 + 1; //左叶子节点
    let r = i * 2 + 2; //右叶子节点
    let largest = i;
    if (l < heapSize && nums[l] > nums[largest]) {
      largest = l;
    }
    if (r < heapSize && nums[r] > nums[largest]) {
      largest = r;
    }
    if (largest !== i) {
      swap(nums, i, largest);
      //继续调整的原因是，第一次调整后，有可能还存在另一个叶子节点大于跟节点的情况
      maxHeapify(nums, heapSize, largest);
    }
  };

  //替换位置
  const swap = (a, i, j) => {
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  };
  let heapSize = nums.length;
  buildMaxHeap(nums, heapSize); //构建一个初始大顶堆,此时最大元素就是第一个元素了
  //构建好后，将最大元素和末尾元素替换，i>=nums.length - k + 1 替换k次就得到第k大的元素
  //如果这个地方i >= 0那么最终nums数组就是排序好的，整个代码就是堆排序
  for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
    swap(nums, 0, i);
    --heapSize;
    //因为元素替换后，并且size减了1，结构不符合大顶堆了，因此需要继续调整结构
    maxHeapify(nums, heapSize, 0);
  }
  return nums[0];
};

function aa(nums) {
  const len = nums.length;
  const swap = (i, j) => {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };
  const maxHeapify = (i, l, r) => {
    let largest = i;
    if (l < len && nums[l] > nums[largest]) {
      largest = l;
    }
    if (r < len && nums[r] > nums[largest]) {
      largest = r;
    }
    if (largest !== i) {
      swap(i, largest);
      maxHeapify(largest, largest * 2 + 1, largest * 2 + 2);
    }
  };
  const buildTree = () => {
    for (let i = len / 2 + 1; i >= 0; i--) {
      maxHeapify(i, 2 * i + 1, 2 * i + 2);
    }
  };
  buildTree(); //创建一个大顶堆
  for (let i = len - 1; i < len - k + 1; i++) {
    swap(i, 0);
    --len;
    maxHeapify(0, 1, 2);
  }
  return nums[0];
}
