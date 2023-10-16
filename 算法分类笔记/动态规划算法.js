//1.最长递增子序列
//给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
//求dp得思路：nums[5] = 3，既然是递增子序列，我们只要找到前面那些结尾比 3 小的子序列，然后把 3 接到最后，就可以形成一个新的递增子序列，而且这个新的子序列长度加一。
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let dp = new Array(nums.length).fill(1)
  // let res = 1
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      //当前元素和之前元素比较
      if (nums[i] > nums[j]) {
        //如果之前元素比当前元素小，直接把当前元素加到之前子序列上就形成新的递增子序列
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    // res = Math.max(dp[i], res)
  }
  return Math.max(...dp)
}
//2.最长连续递增序列（简单）
//给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  const dp = new Array(nums.length).fill(1)
  //dp的含义 dp[i]代表当前i下的最长连续递增序列，num[i] > num[i-1]条件下 dp[i] = dp[i-1] + 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
    }
  }
  return Math.max(...dp)
}
//3. 最大子序和
//给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
//最后一步：子序列的和 = 当前值 + 前边子序列的和
//状态方程：dp[i] = Math.max(nums[i], dp[i-1] + nums[i]) 如果前边子序列的和加上当前值还没当前值大，那么最大和只会从当前值开始算
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const dp = new Array(nums.length).fill(0)
  dp[0] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
  }
  return Math.max(...dp)
}
//4.不同的二叉搜索树
//给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
//思路：采用动态规划来写
//j相当于是头结点的元素，从1遍历到i为止。所以递推公式：dp[i] += dp[j - 1] * dp[i - j]; ，j-1 为j为头结点左子树节点数量，i-j 为以j为头结点右子树节点数量
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0) //n+1的原因是0也算，所以如果n是5的话，数组长度应该是6
  dp[0] = 1 //空节点定义上说也是一颗二叉树
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j]
    }
  }
  return dp[n]
}
//5.零钱兑换(完全背包问题)
//给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
//思路：dp[i]表示i总额需要的硬币数，dp[i] = Math.min(dp[i-icon] + 1 , dp[i])其中icon表示当前循环到的硬币的面值

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity) // 因为0也算所有数组长度加1，同时因为求最小值，所以数组初始化为Infinity
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i])
      }
    }
  }
  if (dp[amount] == Infinity) return -1
  return dp[amount]
}
//6.不同路径
//一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
//问总共有多少条不同的路径？机器人只能向下或向右移动, 所以:到当下格子的走法 = 到其上方格子的路径数 + 到其左方格子的路径数.
//dp[ i ][ j ] = dp[ i - 1 ][ j ] + dp[ i ][ j - 1 ]
//dp 矩阵的最上一行与最左一列可初始化为 1 . 因为, 一直向下或一直向右不转向的话, 只有一种走法.

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // dp[m,n] = dp[m, n-1] + dp[m-1, n]
  const dp = new Array(m).fill(new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0) {
        dp[0][j] = 1 //第一行只有一种走法
      } else if (j === 0) {
        dp[i][0] = 1 // 第一列也只有一种走法
      } else {
        dp[i][j] = dp[i][j - 1] + dp[i - 1][j]
      }
    }
  }
  return dp[m - 1][n - 1]
}
//7.不同路径2
//现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
//路障对应节点的的路径数设置为 0 .
//节点对应的数, 表示从左上角能到达该点的路径数. 将障碍对应节点的路径数设置为 0 , 也就是从左上角到达该点的路径数为 0 , 即绕过该点.
//之后, 加了这个 0 的路径都继承了一个特点, 绕过该结点(路障).
var uniquePathsWithObstacles = function (obstacleGrid) {
  let m = obstacleGrid.length
  let n = obstacleGrid[0].length
  let dp = new Array(m)
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n).fill(0)
  }
  dp[0][0] = obstacleGrid[0][0] == 0 ? 1 : 0
  if (dp[0][0] == 0) {
    return 0
  }
  for (let i = 1; i < n; i++) {
    if (obstacleGrid[0][i] != 1) {
      dp[0][i] = dp[0][i - 1]
    }
  }
  for (let i = 1; i < m; i++) {
    if (obstacleGrid[i][0] != 1) {
      dp[i][0] = dp[i - 1][0]
    }
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] != 1) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }
  return dp[m - 1][n - 1]
}
//8.最小路径和
//给定一个包含非负整数的 `*m* x *n*` 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
//状态定义：设dp[i][j]为走到当前位置的最小路径和
//递推公式：
//只能向下或向右走，意味着当前格子只能由上边或者左边走过来
//dp[i][j] = Min(dp[i-1][j],dp[i][j-1]) + grid[i][j]
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  // dp[m][n] = Math.min(dp[m-1][n], dp[m][n-1]) + grid[m-1][n-1]
  const m = grid.length,
    n = grid[0].length
  const dp = new Array(m).fill(new Array(n).fill(0))
  dp[0][0] = grid[0][0]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j !== 0) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
      } else if (j === 0 && i !== 0) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
      } else if (i === 0 && j === 0) {
        dp[i][j] = grid[0][0]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
      }
    }
  }
  return dp[m - 1][n - 1]
}
//9.爬楼梯
//假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//解法二：DP
var climbStairs = function (n) {
  let dp = []
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
//10.最长公共子序列
//给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  // 由于是两个字符串，因此需要二维的dp数组 dp[i][j]代表text1的i-1下标和text2的j-1下标，公共子序列的长度
  // 之所以用i-1的下标是为了计算字符串的第0项，不然不好比较第0项
  // 如果text1[i-1] === text2[j-1] 那么dp[i][j] = dp[i-1][j-1] + 1
  // 如果text1[i-1] ！== text2[j-1] 那么dp[i][j] =  Math.max(dp[i - 1][j], dp[i][j-1])
  const dp = Array.from(new Array(text1.length + 1), () =>
    new Array(text2.length + 1).fill(0)
  )
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[text1.length][text2.length]
}
//11.买卖股票问题(easy题，只能交易一次)
//思路：dp[i][k][0]//第i天 还可以交易k次 手中没有股票，dp[i][k][1]//第i天 还可以交易k次 手中有股票
/* i: 天数
k: 交易次数，每次交易包含买入和卖出，这里我们只在买入的时候需要将 k - 1
0: 不持有股票
1: 持有股票 */
// 今天没有持有股票，分为两种情况
// 1. dp[i - 1][k][0]，昨天没有持有，今天不操作。
// 2. dp[i - 1][k][1] + prices[i] 昨天持有，今天卖出，今天手中就没有股票了。
//dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])

// 今天持有股票，分为两种情况：
// 1.dp[i - 1][k][1] 昨天持有，今天不操作
// 2.dp[i - 1][k - 1][0] - prices[i] 昨天没有持有，今天买入。
//dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])

//最大利润就是这俩种情况的最大值

//时间复杂度O(n) 空间复杂度O(n)，dp数组第二维是常数
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  //股票问题，dp[i][k][0]代表第i天交易k次手中无股票
  //dp[i][k][1]代表手中有股票
  //这个问题是只能交易一次
  const dp = Array.from(new Array(prices.length), () => new Array(2))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    //注意这块本来应该是dp[i-1][0] - prices[i], 但是由于交易次数只有1次，i天买了，就说明i-1天是没有任何操作的
    //所以dp[i-1][0]是0
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
  }
  return dp[prices.length - 1][0]
}

//12.买卖股票时机2
//给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const dp = Array.from(new Array(prices.length), () => new Array(2))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    //这个和股票问题1的区别在于问题1只能交易一次，这个不限制交易次数，所以这个是dp[i-1][0] - prices[i]
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  }
  return dp[prices.length - 1][0]
}

//13.买卖股票含冷冻期
//思路：同前边一样题目不限制k的大小，可以省略
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  //思路：dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
  //dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i])冷冻期是1天，因此买入的话，要减一天冷冻期，所以是i-2
  if (prices.length < 2) return 0
  let dp = Array.from(new Array(prices.length), () => new Array(2))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  dp[1][1] = Math.max(dp[0][1], dp[0][0] - prices[1])
  dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[1])
  for (let i = 2; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i])
  }
  return dp[prices.length - 1][0]
}
//14.买卖股票含手续费
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  let dp = Array.from(new Array(prices.length), () => new Array(2))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee) //卖出的时候扣掉手续费即可
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  }
  return dp[prices.length - 1][0]
}
//15.打家劫舍
//如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  //dp[i]代表i下标的房间可以投到的最大金额
  //dp[i] = Math.max(dp[i-2] + nums[i], dp[i-1])偷i-2房间和当前房间的金额，以及偷i-1房间存在这两种情况
  if (nums.length < 2) return nums[0]
  dp = new Array(nums.length).fill(0)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[1], nums[0])
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
  }
  return Math.max(...dp)
}
//16.打家劫舍2
//树形dp
//返回数组就是dp数组。所以dp数组（dp table）以及下标的含义：下标为0记录不偷该节点所得到的的最大金钱，下标为1记录偷该节点所得到的的最大金钱
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
  // 后序遍历函数
  const postOrder = (node) => {
    // 递归出口
    if (!node) return [0, 0]
    // 遍历左子树
    const left = postOrder(node.left)
    // 遍历右子树
    const right = postOrder(node.right)
    // 不偷当前节点，左右子节点都可以偷或不偷，取最大值
    const DoNot = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
    // 偷当前节点，左右子节点只能不偷
    const Do = node.val + left[0] + right[0]
    // [不偷，偷]
    return [DoNot, Do]
  }
  const res = postOrder(root)
  // 返回最大值
  return Math.max(...res)
}
//17.最小编辑距离（hard）

//思路：dp[i][j] 表示 word1 的前 i 位 和 word2 的前 j 位之间的最少操作数。
//dp[i][j] 表示以下标i-1为结尾的字符串word1，和以下标j-1为结尾的字符串word2，最近编辑距离为dp[i][j]。
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  // dp[i][j] 表示word1的i-1位和word2的j-1位的最小编辑距离
  // 有三种操作，插入，删除，替换
  // dp[i-1][j] + 1：删除操作
  // dp[i][j-1] + 1：新增操作
  // dp[i-1][j-1] + 1：替换操作
  const dp = Array.from(new Array(word1.length + 1), () =>
    new Array(word2.length + 1).fill(0)
  )
  // 初始化dp数组 , dp[i][0]word1的第i位最少进行多少次操作变为word2第0位， 进行i次操作，比如i次删除
  for (let i = 0; i <= word1.length; i++) {
    dp[i][0] = i
  }
  // 初始化dp数组
  for (let i = 0; i <= word2.length; i++) {
    dp[0][i] = i
  }

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      // 如果和前两位数字相同，则操作数也相同
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
      }
    }
  }
  return dp[word1.length][word2.length]
}

// 18.整数拆分和剪绳子都可以用动态规划来写
var integerBreak = function (n) {
  let dp = new Array(n + 1).fill(0)
  dp[2] = 1

  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      //dp[i]为正整数i拆分之后的最大乘积
      //j*(i-j)表示把i拆分为j和i-j两个数相乘
      //j*dp[i-j]表示把i拆分成j和继续把(i-j)这个数拆分，取(i-j)拆分结果中的最大乘积与j相乘
      dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
    }
  }
  return dp[n]
}

// 19. 斐波拉契数列，也可以用动态规划写 时间复杂度O(n)
const fbi = (n) => {
  const dp = []
  dp[0] = dp[1] = 1
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

const fbi_ = (n) => {
  if (n <= 2) return 1
  // 递归的空间复杂度是O(n)， 而双路递归由于有很多重复计算，时间复杂度达到恐怖的O(2n)
  return fbi_(n - 1) + fbi_(n - 2)
}

// 20. 杨辉三角（简单）
// 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。在「杨辉三角」中，每个数是它左上方和右上方的数的和。
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  // dp[1] = 1 dp[2] = [1,1] dp[3] = [1,2,1], dp[i] =
  const dp = []
  for (let i = 0; i < numRows; i++) {
    if (i == 0) {
      dp.push([1])
    } else {
      const nextRow = [1],
        lastRow = dp[dp.length - 1]
      for (let j = 1; j < lastRow.length; j++) {
        nextRow.push(lastRow[j - 1] + lastRow[j])
      }
      nextRow.push(1)
      dp.push(nextRow)
    }
  }
  return dp
}

//21. 完全平方数
// 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
// 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  // dp[i] = Math.min(dp[i - j*j] + 1, dp[i])
  const dp = new Array(n).fill(0)
  for (let i = 1; i <= n; i++) {
    dp[i] = i // 每个i最坏的情况就是都加1 比如3 = 1+1+1
    for (let j = 1; i - j * j >= 0; j++) {
      // 注意j的条件是i - j*j >=0，如果大于0就没有意义了
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1)
    }
  }
  return dp[n]
}

// 22. 单词拆分
// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  // dp[i] 为true表示字符串为i时能被拆分为一个或多个字典中的单词, +1是因为将0也算了
  const dp = new Array(s.length + 1).fill(false)
  // dp[0]是空字符串，题目说是非空字符串s，所以dp[0]单纯就是为了推导是true
  dp[0] = true
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      // 如果dp[j]为true， 且[j,i]之间的字符串出现在字典中，说明dp[i]也是true
      if (wordDict.includes(s.slice(j, i)) && dp[j]) {
        dp[i] = true
      }
    }
  }
  return dp[s.length]
}

// 23.乘积最大子数组
// 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
//测试用例的答案是一个 32-位 整数。
//子数组 是数组的连续子序列。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  const dp = new Array(nums.length).fill(0)
  // dp[i] = Math.max(dp[i], dp[i-1] * nums[i])
  // 注意会出现乘积为负数，负负得正的情况！max和min用来存储最大和最小值
  let max = (min = nums[0])
  dp[0] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < 0) {
      // nums[i]小于0就互换max和min的位置，将max置为小数min
      ;[max, min] = [min, max]
    }
    max = Math.max(max * nums[i], nums[i])
    min = Math.min(min * nums[i], nums[i])
    dp[i] = max
  }
  return Math.max(...dp)
}

// 24.分割等和子集
// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  // target为子集的大小，可以看做是背包, 因为元素只能用一次所以是01背包问题
  // 01背包的递推式 dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
  // 如果题目给的价值都是正整数那么非0下标都初始化为0就可以了，如果题目给的价值有负数，那么非0下标就要初始化为负无穷。
  const sum = nums.reduce((pre, cur) => pre + cur)
  const target = sum / 2
  if (sum % 2 !== 0) return false
  const dp = new Array(target + 1).fill(0)
  // 注意01背包问题，外层循环应该是物品，因为物品只能用一次
  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j - nums[i]] + nums[i], dp[j])
    }
  }
  // dp[target]表示容量为target的背包能装下的最大价值。
  return dp[target] === target
}
