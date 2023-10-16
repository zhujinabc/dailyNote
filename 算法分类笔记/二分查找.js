//1.搜索插入位置
//给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
//请必须使用时间复杂度为 O(log n) 的算法。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let len = nums.length
  let l = 0,
    r = nums.length - 1
  //注意，我们的区间是[l,r]左右闭合的区间，因此是l<=r
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (target < nums[mid]) {
      r = mid - 1 //同时也因为是闭合区间，所以需要减1
    }
    if (target > nums[mid]) {
      l = mid + 1 // 闭合区间同理加1
    }
    if (target === nums[mid]) {
      return mid
    }
  }
  return r + 1 //插入位置要加1
}

//2.搜索二维矩阵
/* 给你一个满足下述两条属性的 m x n 整数矩阵：
每行中的整数从左到右按非递减顺序排列。
每行的第一个整数大于前一行的最后一个整数。
给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const rowLen = matrix[0].length
  const len = matrix.length * rowLen
  let l = 0,
    r = len - 1
  while (l <= r) {
    const idx = Math.floor((l + r) / 2)
    //将一维数组的索引转为二维数组索引
    const rowIndex = Math.floor(idx / rowLen)
    const colIndex = idx % rowLen
    if (matrix[rowIndex][colIndex] < target) {
      l = idx + 1
    }
    if (matrix[rowIndex][colIndex] > target) {
      r = idx - 1
    }
    if (matrix[rowIndex][colIndex] === target) {
      return true
    }
  }
  return false
}

// 3.在排序数组中找到元素的第一个和最后一个位置
/* 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
如果数组中不存在目标值 target，返回 [-1, -1]。
你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const len = nums.length
  let l = 0,
    r = len - 1
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (target < nums[mid]) {
      r = mid - 1
    }
    if (target > nums[mid]) {
      l = mid + 1
    }
    if (target === nums[mid]) {
      let l = (r = mid)
      //因为可能存在重复数，所以需要以找到的数为基准进行左右遍历
      while (nums[l] === nums[mid]) {
        l--
      }
      while (nums[r] === nums[mid]) {
        r++
      }
      //因为多++和--了，因此需要+1和-1
      return [l + 1, r - 1]
    }
  }
  return [-1, -1]
}

//4.求x的平方根
//给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
//由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let l = 1,
    r = x
  while (l <= r) {
    const mid = Math.floor((r + l) / 2)
    if (mid * mid === x) return mid
    if (mid * mid < x) {
      l = mid + 1
    }
    if (mid * mid > x) {
      r = mid - 1
    }
  }
  return r
}

//4.搜索旋转排序数组
/* 整数数组 nums 按升序排列，数组中的值 互不相同 。
在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., 
nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。
例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。 */

//思路：旋转数组主要就是判断是那边有序，那么target不在有序一边就在另一边

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const len = nums.length
  let l = 0,
    r = len - 1
  if (!len) return -1
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (nums[mid] === target) {
      return mid
    }
    //mid左边有序
    if (nums[mid] >= nums[l]) {
      if (target >= nums[l] && target < nums[mid]) {
        r = mid - 1
      } else {
        l = mid + 1
      }
    } else {
      //说明target在右侧
      if (nums[mid] < target && target <= nums[r]) {
        l = mid + 1
      } else {
        r = mid - 1
      }
    }
  }
  return -1
}

//5.寻找旋转排序数组中的最小值
// 旋转数组的思路，一般是找到中间值point
// nums[mid] >= nums[0] 说明mid左侧是升序，那么最小值在右侧 left = mid + 1
// nums[mid] < nums[0] 说明mid右侧是升序的，最小值在左侧 right = mid - 1
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  const len = nums.length
  let l = 0,
    r = len - 1
  if (nums[nums.length - 1] >= nums[0]) return nums[0]
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    //最终根据mid值来判断，如果mid > mid + 1说明mid + 1就是最小值
    //说明此时mid已经位于point的位置了
    if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1]
    }
    //如果mid < mid - 1说明 mid是最小值
    if (nums[mid] < nums[mid - 1]) {
      return nums[mid]
    }
    if (nums[mid] > nums[0]) {
      l = mid + 1
    }
    if (nums[mid] < nums[0]) {
      r = mid - 1
    }
  }
}
