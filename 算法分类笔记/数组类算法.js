//1.俄罗斯套娃信封问题（hard）
//给你一个二维整数数组 envelopes ，其中 envelopes[i] = [wi, hi] ，表示第 i 个信封的宽度和高度。
//当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。
//思路：先排序，再求最长递增子序列
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  envelopes.sort((e1, e2) => (e1[0] !== e2[0] ? e1[0] - e2[0] : e2[1] - e1[1])) //排序
  //求height数组
  const heigth = []
  for (let i = 0; i < envelopes.length; i++) {
    heigth[i] = envelopes[i][1]
  }
  //求height数组的最长连续子序列
  //用dp动态规划写
  const dp = new Array(heigth.length).fill(1)
  for (let i = 0; i < heigth.length; i++) {
    for (let j = 0; j < i; j++) {
      if (heigth[i] > heigth[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}
//2.最长连续序列
//给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
/**
 * @param {number[]} nums
 * @return {number}
 * 这一提主要是通过set来做，方便查找和判断
 */
var longestConsecutive = function (nums) {
  let maxLen = 0
  const set = new Set(nums)
  // 遍历元素
  for (let num of nums) {
    // 如果这个元素没有左邻居，说明可以进行遍历
    if (!set.has(num - 1)) {
      let len = 1
      let item = num
      // 循环查找元素的右邻居
      while (set.has(item + 1)) {
        len++
        item++
      }
      // 找出长度最大的子串
      maxLen = Math.max(maxLen, len)
    }
  }
  return maxLen
}
//3.盛水最多容器
//给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0
  let l = 0
  let r = height.length - 1
  while (r > l) {
    max = Math.max(
      max,
      (r - l) * (height[r] < height[l] ? height[r--] : height[l++])
    )
  }
  return max
}
//5.删除有序数组中的重复项
//给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。
//思路：创建一个快慢指针，i和j当快慢指针不等时将慢指针加1，将快指针的值赋值给慢指针
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let i = 0
  for (let j = 1; j < nums.length; j++) {
    if (nums[i] != nums[j]) {
      i++
      nums[i] = nums[j]
    }
  }
  return i + 1
}
//6.和为k的子数组
//给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。
//思路：采用前缀和的方式求解
//(1)每个元素对应一个“前缀和”
//(2)遍历数组，根据当前“前缀和”，在 map 中寻找「与之相减 == k」的历史前缀和
//(3)当前“前缀和”与历史前缀和，差分出一个子数组，该历史前缀和出现过 c 次，就表示当前项找到 c 个子数组求和等于 k。
//(4)遍历过程中，c 不断加给 count，最后返回 count
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let count = 0
  let map = {
    //初始map时需要将前缀和为0出现1次加进去
    0: 1,
  }
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    if (map[sum - k]) {
      //如果map中存在与当前前缀和-k相等的值，那么此时count加上该前缀和的次数
      count += map[sum - k]
    }
    if (map[sum]) {
      //前缀和出现的次数
      map[sum]++
    } else {
      map[sum] = 1
    }
  }
  return count
}
//7.两数之和
//给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** 的那 **两个** 整数，并返回它们的数组下标。
//动态哈希表，使用的ES6的Map对象
var twoSum = function (nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    var cha = target - nums[i]
    if (map.has(cha)) {
      return [map.get(cha), i]
    } else {
      map.set(nums[i], i)
    }
  }
}
//8.三数之和
//给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
/**
 * @param {number[]} nums
 * @return {number[][]}
 * 三数之和的思路就是，先排序然后循环数组，
 * 固定一个数，另外两个数从第一个数的位置开始通过双指针前后逼近得到
 */
var threeSum = function (nums) {
  const res = []
  //先对数组进行排序
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 2; i++) {
    // 因为数组排序过，因此nums[i]大于0，后边就不可能存在和为0的数了
    if (nums[i] > 0) break
    // 去重
    if (nums[i] === nums[i - 1]) continue
    //左右两边双指针，往中间逼近
    let left = i + 1
    let right = nums.length - 1
    while (left < right) {
      if (nums[i] + nums[left] + nums[right] === 0) {
        res.push([nums[i], nums[left], nums[right]])
        // 找到等于0的元素后，指针位置也需要移动
        while (left < right && nums[left] === nums[left + 1]) left++ //去重
        while (left < right && nums[right] === nums[right - 1]) right-- //去重
        left++
        right--
      } else if (nums[i] + nums[left] + nums[right] < 0) {
        left++
      } else {
        right--
      }
    }
  }
  return res
}
//9.四数之和
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const res = []
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue //判断i是否重复
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue //判断j是否重复
      let left = j + 1,
        right = nums.length - 1
      while (left < right) {
        if (nums[i] + nums[j] + nums[left] + nums[right] === target) {
          res.push([nums[i], nums[j], nums[left], nums[right]])
          while (nums[left] === nums[left + 1]) left++ //去重
          while (nums[right] === nums[right - 1]) right-- //去重
          left++
          right--
        } else if (nums[i] + nums[j] + nums[left] + nums[right] < target) {
          left++
        } else {
          right--
        }
      }
    }
  }
  return res
}
//10.接雨水（hard）
//给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
//思路：采用双指针的方法，维护r和l两个指针，以及两个变量rmax和lmax代表右边和左边最高的值，接雨水的量由矮的一边决定
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  //采用双指针的方法
  let l = 0,
    r = height.length - 1
  let lmax = 0,
    rmax = 0
  let sum = 0
  // 循环遍历数组，将指定下标处可以接的雨水，累加起来即可
  while (l < r) {
    lmax = Math.max(lmax, height[l])
    rmax = Math.max(rmax, height[r])
    // 当前下标处可以接的雨水取决于 min(lmax, rmax),用lmax - height[l] 和rmax- height[r]即可
    if (lmax < rmax) {
      sum += lmax - height[l]
      l++ // 当前下标能接的雨水已经加到总和中，因此移动当前下标
    } else {
      sum += rmax - height[r]
      r-- // 当前下标能接的雨水已经加到总和中，因此移动当前下标
    }
  }
  return sum
}

//12.颜色分类
//给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
//我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
//思路：采用双指针，p0和p1代表头和尾，cur代表当前元素，如果当前元素等于0，将当前元素和头指针交换，如果当前元素等于2和尾指针交换，判断条件是cur要小于等于尾指针p1
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  //通过头尾两个指针进行遍历，遇到0和头部指针交换，遇到2和尾部指针交换
  let start = 0,
    cur = 0,
    end = nums.length - 1
  while (cur <= end) {
    if (nums[cur] === 0) {
      ;[nums[start], nums[cur]] = [nums[cur], nums[start]]
      start++
      cur++ //遇到0时需要cur走一步
    } else if (nums[cur] === 2) {
      //遇到2时，因为有可能会把0尾部的0交换过来，所以cur不能走一步
      ;[nums[end], nums[cur]] = [nums[cur], nums[end]]
      end--
    } else {
      cur++
    }
  }
  return nums
}

// 13.移动0问题（很经典的双指针问题）
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // 慢指针，用于定位新数组的下标
  let slowIndex = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      //找到非0元素，将非0元素和新数组下标交换
      ;[nums[i], nums[slowIndex]] = [nums[slowIndex], nums[i]]
      //新数组下标++，循环下去，新数组就是非0元素在前边，0在最后
      slowIndex++
    }
  }
}

// 14.数组中前k个高频元素
// 利用map存次数，最后Array.from成一个二维数组，对次数进行降序排序后取前k个
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map()
  const res = []
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) {
      map.set(nums[i], 1)
    } else {
      map.set(nums[i], map.get(nums[i]) + 1)
    }
  }
  // const map = nums.reduce((pre, cur)=>{
  //     if(!pre[cur]){
  //         pre[cur] = 1
  //     }else{
  //         pre[cur] ++
  //     }
  //     return pre
  // },{})
  //注意是次数降序排序，取前k个
  const sortArr = Array.from(map).sort((a, b) => b[1] - a[1])
  for (let i = 0; i < k; i++) {
    res.push(sortArr[i][0])
  }
  return res
}
//15.找到字符串中所有字母异位词
//给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序
//通过滑动窗口来做
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const plen = p.length
  const res = []
  const need = {}
  const window = {}
  let flag = 0 //标志窗口中频次和need中频次一样的字符数量
  let len = 0 //p中字母种类
  //统计p中字符的频次
  for (let s of p) {
    if (need[s] === undefined) {
      len++
      window[s] = need[s] = 0
    }
    need[s]++
  }
  for (let i = 0; i < s.length; i++) {
    const j = i - plen //滑动窗口左边界，右边界为i
    //如果need中有这个字符，并且window中的频次加1后和need相等了，说明符合的字符数量flag要加1了
    if (s[i] in need && ++window[s[i]] === need[s[i]]) {
      flag++
    }
    //如果出窗口的字符在need中，并且窗口中的频次和need相等，说明出了窗口后就不相等了，所以要减1
    if (s[j] in need && window[s[j]]-- === need[s[j]]) {
      flag--
    }
    //如果出窗口和入窗口都操作完，flag还等于len说明目前窗口中的字符串就是异位词，将j+1加入解集
    if (flag === len) {
      res.push(j + 1)
    }
  }
  return res
}

//16.轮转数组
//给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
/* 输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4] */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  //首先对整个数组实行翻转，这样子原数组中需要翻转的子数组，就会跑到数组最前面。
  //这时候，从 kkk 处分隔数组，左右两数组，各自进行翻转即可。
  const reverse = (nums, start, end) => {
    while (start < end) {
      ;[nums[start], nums[end]] = [nums[end], nums[start]]
      start++
      end--
    }
  }
  k = k % nums.length
  reverse(nums, 0, nums.length - 1) //第一次翻转
  //两段分别翻转
  reverse(nums, 0, k - 1)
  reverse(nums, k, nums.length - 1)
  return nums
}

//17.除自身以外数组的乘积
/* 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  //res中先保存左边积，然后从后往前遍历，右边积*左边积
  //用一个变量保存左边积，从后往前遍历时一边覆盖res数组，一边更新左边积的变量
  const res = [1] //res[i] 是i的左边积
  for (let i = 1; i < nums.length; i++) {
    res[i] = res[i - 1] * nums[i - 1]
  }
  let right = 1 //temp保存i的右边积
  for (let j = nums.length - 1; j >= 0; j--) {
    res[j] = right * res[j] //左边积成右边积
    right = right * nums[j] //更新右边积
  }
  return res
}

//18.缺失的第一个正整数
/* 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  //对数组进行重排，将num[i]放在nums[nums[i] - 1]该呆的位置上
  //最后数组会成为1,2,3,-1,5,6这样的，再遍历一次，如果对应位置没出现对应的正整数，就说明这个位置就是最小正整数
  for (let i = 0; i < nums.length; i++) {
    while (
      nums[i] >= 1 &&
      nums[i] <= nums.length &&
      nums[i] !== nums[nums[i] - 1] //符合条件了，就不替换了
    ) {
      const temp = nums[nums[i] - 1]
      nums[nums[i] - 1] = nums[i]
      nums[i] = temp
    }
  }
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== j + 1) {
      return j + 1
    }
  }
  return nums.length + 1
}
