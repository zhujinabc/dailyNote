//1.只出现一次的数字
/* 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。 */
/* 一个数和 0 做 XOR（异或运算） 运算等于本身：a^=0 = a
一个数和其本身做 XOR 运算等于 0：a^=a = 0
XOR 运算满足交换律和结合律：a^=b^=a = (a^=a)^=b = 0^=b = b */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let ans = 0
  for (const num of nums) {
    ans ^= num //相同的数字异或后都为0，再和只出现一次的数字异或就是该数字
  }
  return ans
}

//2.多数元素
/* 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const len = nums.length / 2
  const map = nums.reduce((pre, cur) => {
    pre[cur] = pre[cur] ? pre[cur] + 1 : 1
    return pre
  }, {})
  for (let key in map) {
    if (map[key] > len) {
      return key
    }
  }
}

//3.下一个排列
/* 整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
整数数组的 下一个排列 是指其整数的下一个字典序更大的排列 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  //从右往左找到第一个比右邻居小的数，这样可以保证变大幅度最小即为下一个排列
  //然后再从右往左找第一个比上述数字大的数，调换位置
  //从i位置开始后续子数组为递减的，将其翻转就找到了最小变大幅度的下一个排列了
  let i = nums.length - 2
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    //找到第一个比右邻居小的数
    i--
  }
  if (i >= 0) {
    //注意需要i大于等于0，如果i=-1说明数组是递减的，直接翻转即可
    let j = nums.length - 1
    while (nums[i] >= nums[j]) {
      //找到第一个比i大的数
      j--
    }
    ;[nums[i], nums[j]] = [nums[j], nums[i]] //互换位置
  }
  let l = i + 1,
    r = nums.length - 1
  while (l < r) {
    //翻转后续子数组
    ;[nums[l], nums[r]] = [nums[r], nums[l]]
    l++
    r--
  }
  return nums
}

//4.寻找重复数
//给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  //整数个数是n+1，数字范围在[1,n]
  //那么可以将数组下标指向对应的元素看做是一个链表
  //如果有重复数那么一定是一个有环链表，问题转为求有环链表的入环点
  /* 比如，nums 数组：[4,3,1,2,2][4, 3, 1, 2, 2][4,3,1,2,2]
        以 nums[0] 的值 4 作为索引，去到 nums[4]
        以 nums[4] 的值 2 作为索引，去到 nums[2]
        以 nums[2] 的值 1 作为索引，去到 nums[1]……
        从一项指向另一项，将nums数组抽象为链表：4->2->1->3->2，如下图，链表有环 */
  let fast = 0,
    slow = 0
  while (true) {
    slow = nums[slow] //慢指针走一步
    fast = nums[nums[fast]] //快指针走两步
    if (slow === fast) {
      //相遇在首次相遇点
      fast = 0 //重置快指针
      while (true) {
        //开启循环找到入环点
        if (fast === slow) {
          return slow //注意数组值是索引，下标是值，所以返回slow
        }
        fast = nums[fast]
        slow = nums[slow]
      }
    }
  }
}
