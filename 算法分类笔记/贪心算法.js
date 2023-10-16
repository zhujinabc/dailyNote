//1.跳跃游戏
//给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。
//思路：用一个变量记录当前能够到达的最大的索引，我们逐个遍历数组中的元素去更新这个索引。变量完成判断这个索引是否大于数组下标即可。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let maxLen = 0 //记录当前可以到达的最大下标
  for (let i = 0; i < nums.length; i++) {
    // 注意这个条件一定要加，如果当前可以达到的最大下标已经小于当前下标
    // 说明到不了当前点也就到不了终点，返回false
    if (maxLen < i) return false
    maxLen = Math.max(maxLen, i + nums[i])
  }
  return maxLen >= nums.length - 1
}
//2.跳跃游戏2
//给你一个非负整数数组 nums ，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。
//你的目标是使用最少的跳跃次数到达数组的最后一个位置。假设你总是可以到达数组的最后一个位置。
//思路：要从覆盖范围出发，不管怎么跳，覆盖范围内一定是可以跳到的，以最小的步数增加覆盖范围，覆盖范围一旦覆盖了终点，得到的就是最小步数！
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let cur = 0 // 当前能到达的最远范围
  let next = 0 // 下一步能够覆盖的最远范围
  let count = 0 // 跳的次数
  for (let i = 0; i < nums.length - 1; i++) {
    next = Math.max(next, i + nums[i])
    if (cur === i) {
      //当前位置到了上一次能够到达的最远距离，说明还没到终点，需要再跳一次
      cur = next //更新cur的范围
      count++
    }
  }
  return count
}
//3.分发饼干
//对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，
//我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这
var findContentChildren = function (g, s) {
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)
  let result = 0
  let index = s.length - 1
  for (let i = g.length - 1; i >= 0; i--) {
    if (index >= 0 && s[index] >= g[i]) {
      //大饼干优先满足大孩子
      result++
      index--
    }
  }
  return result
}
//4. 用最少数量的箭引爆气球
//思路：第一组重叠气球，一定是需要一个箭，气球3，的左边界大于了 第一组重叠气球的最小右边界，所以再需要一支箭来射气球3了
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  if (!points.length) return 0
  points.sort((a, b) => a[0] - b[0]) //先将数组按照左边界升序排序
  let res = 1
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > points[i - 1][1]) {
      //如果第二个气球的左边界大于第一个气球右边界，那么需要多一个箭
      res++
    } else {
      //后边再来一个气球，能不能射爆取决于重叠气球中最小的右边距，因此重叠气球需要更新最小右边距
      points[i][1] = Math.min(points[i][1], points[i - 1][1])
    }
  }
  return res
}
// 5.整数拆分和剪绳子都可以用贪心来写
//数字拆分为更多的 3，其次为 2，最差为 1，可让乘积最大化。
//但是，若最终拆出来，剩下一个 1，我们将其中一个 3 + 1 ，组成一个 4，可让乘积更大化。
var integerBreak = function (n) {
  if (n <= 3) return n - 1

  let res = 1
  while (n > 4) {
    n -= 3
    res = res * 3
  }
  return n * res
}

// 6.划分字母区间
// 给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。
// 注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。
// 返回一个表示每个字符串片段的长度的列表。
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  //维护一个访问到的字母能够到达最远的区间的map，如果当前方位等于了最远区间，那么说明该片段就可以切割
  const map = new Map()
  const res = []
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], i) //得到每个字母出现的最远距离
  }
  let start = (end = 0)

  for (let i = 0; i < s.length; i++) {
    // 更新当前片段中字母能够出现的最远距离
    end = Math.max(end, map.get(s[i]))
    if (end === i) {
      //当尾指针和当前位置重合了，说明可以切割
      res.push(end - start + 1) //因为切割长度是个闭区间所以需要加1
      start = end + 1
    }
  }
  return res
}

// 7.合并区间
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
/* 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]) //先将数组按照第一个元素排序
  let pre = intervals[0]
  const res = []
  for (let i = 0; i < intervals.length; i++) {
    //如果当前区间的左边大于了前置区间的右边元素，说明没重合了
    if (intervals[i][0] > pre[1]) {
      res.push(pre)
      pre = intervals[i] //将前置区间置为当前区间
    } else {
      //intervals[i][1] 可能比pre[1]大，所以需要取其中最大值
      pre[1] = Math.max(intervals[i][1], pre[1])
    }
  }
  //如果不重合，pre为最后一个区间，还没推进res
  //如果最后一个区间重合，此时也只是将区间合并了，还没推进res
  //因此需要推pre
  res.push(pre)
  return res
}
