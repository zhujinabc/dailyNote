//1.滑动窗口最大值(hard)
/* 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。 */
/**
 * @param {number[]} nums
 * @param {number}
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  //这个题用队列来做，维护一个单调队列，为了保持队列的单调性
  //push的时候，我们将要push进来的元素和队尾元素比较，如果比队尾元素大就将队尾pop，这样就保证队列单调递减了
  //这样的话，我们就能保证队首元素一直是最大元素，每次滑动只需要将队首元素加进解集即可
  const res = [] //结果数组
  const queue = [] //队列
  for (let i = 0; i < nums.length; i++) {
    if (i - queue[0] > k - 1) {
      //说明队列长度要超过k了，要把queue的第一个元素出栈了
      queue.shift()
    }
    //保证队列的单调性，如果将要加入的元素比队尾元素大，那就把队尾元素pop了
    while (nums[i] >= nums[queue[queue.length - 1]]) {
      queue.pop()
    }
    queue.push(i)
    if (i >= k - 1) {
      //如果i已经大于k-1，说明窗口长度满足k了，每次移动都可以把最大值加入解集了
      res.push(nums[queue[0]])
    }
  }
  return res
}
