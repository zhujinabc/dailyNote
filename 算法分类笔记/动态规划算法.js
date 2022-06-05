//1.最长递增子序列
//给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
//求dp得思路：nums[5] = 3，既然是递增子序列，我们只要找到前面那些结尾比 3 小的子序列，然后把 3 接到最后，就可以形成一个新的递增子序列，而且这个新的子序列长度加一。
/**
 * @param {number[]} nums
 * @return {number}
 */
 var lengthOfLIS = function(nums) {
    let dp = new Array(nums.length).fill(1)
    // let res = 1
    for(let i =0 ;i < nums.length; i++){
        for(let j = 0; j< i; j++){//当前元素和之前元素比较
            if(nums[i]>nums[j]){//如果之前元素比当前元素小，直接把当前元素加到之前子序列上就形成新的递增子序列
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        // res = Math.max(dp[i], res)
    }
    return Math.max(...dp)
};
//2.最长连续递增序列（简单）
//给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
/**
 * @param {number[]} nums
 * @return {number}
 */
 var findLengthOfLCIS = function(nums) {
    const dp = new Array(nums.length).fill(1)
    //dp的含义 dp[i]代表当前i下的最长连续递增序列，num[i] > num[i-1]条件下 dp[i] = dp[i-1] + 1
    for(let i =1;i< nums.length; i++){
        if(nums[i] > nums[i-1]){
            dp[i] = dp[i-1] + 1
        }
    }
    return Math.max(...dp)
};
//3. 最大子序和
//给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
//最后一步：子序列的和 = 当前值 + 前边子序列的和
//状态方程：sum = max{sum + a[i], a[i]} 如果前边子序列的和加上当前值还没当前值大，那么最大和只会从当前值开始算
var maxSubArray = function(nums){
    let sum = nums[0]
    let dp = []
    dp[0] = nums[0]
    for(let i =1;i<nums.length; i++){
        dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
        sum = Math.max(sum, dp[i])
    }
    return sum
}
//4.不同的二叉搜索树
//给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
//思路：采用动态规划来写
//j相当于是头结点的元素，从1遍历到i为止。所以递推公式：dp[i] += dp[j - 1] * dp[i - j]; ，j-1 为j为头结点左子树节点数量，i-j 为以j为头结点右子树节点数量
/**
 * @param {number} n
 * @return {number}
 */
 var numTrees = function(n) {
    const dp = new Array(n + 1).fill(0)//n+1的原因是0也算，所以如果n是5的话，数组长度应该是6
    dp[0] = 1//空节点定义上说也是一颗二叉树
    dp[1] = 1
    for(let i=2; i<= n; i++){
        for(let j= 1; j<= i; j++){
            dp[i] += dp[j-1]*dp[i-j]
        }
    }
    return dp[n]
};
//5.零钱兑换(完全背包问题)
//给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
//思路：dp[i]表示i总额需要的硬币数，dp[i] = Math.min(dp[i-icon] + 1 , dp[i])其中icon表示当前循环到的硬币的面值
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 var coinChange = function(coins, amount) {
    let dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for(let i = 1;i<=amount;i++){
        for(let j = 0; j<coins.length; j++){
            if(i - coins[j] >= 0){
                dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i])
            }
        }
    }
    if(dp[amount] == Infinity) return -1
    return dp[amount]
};
//6.不同路径
//一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
//问总共有多少条不同的路径？机器人只能向下或向右移动, 所以:到当下格子的走法 = 到其上方格子的路径数 + 到其左方格子的路径数.
//dp[ i ][ j ] = dp[ i - 1 ][ j ] + dp[ i ][ j - 1 ]
//dp 矩阵的最上一行与最左一列可初始化为 1 . 因为, 一直向下或一直向右不转向的话, 只有一种走法.
var uniquePaths = function (m, n) {
    let dp = new Array(n);
    for (let i = 0; i < n; i ++) {
        dp[i] = new Array(m);
        dp[i][0] = 1;
    }
    for (let i = 0; i < m; i ++) {
        dp[0][i] = 1;
    }
    for (let i = 1; i < n; i ++) {
        for (let j = 1; j < m; j ++) {
            dp[i][j] = dp[i][j - 1] + dp[i - 1][j];//状态方程
        }
    }
    return dp[n - 1][m - 1];
};
//7.不同路径2
//现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
//路障对应节点的的路径数设置为 0 .
//节点对应的数, 表示从左上角能到达该点的路径数. 将障碍对应节点的路径数设置为 0 , 也就是从左上角到达该点的路径数为 0 , 即绕过该点.
//之后, 加了这个 0 的路径都继承了一个特点, 绕过该结点(路障).
var uniquePathsWithObstacles = function(obstacleGrid) {
    let n = obstacleGrid.length;
    let m = obstacleGrid[0].length;
    let dp = new Array(n);
    for (let i = 0; i < n; i ++) {
        dp[i] = new Array(m).fill(0);
    }
    dp[0][0] = obstacleGrid[0][0] == 0 ? 1 : 0;
    if (dp[0][0] == 0) {
        return 0;
    }
    for (let i = 1; i < m; i ++) {
        if (obstacleGrid[0][i] != 1) {
            dp[0][i] = dp[0][i - 1];
        }
    }
    for (let i = 1; i < n; i ++) {
        if (obstacleGrid[i][0] != 1) {
            dp[i][0] = dp[i - 1][0];
        }
    }
    for (let i = 1; i < n; i ++) {
        for (let j = 1; j < m; j ++) {
            if (obstacleGrid[i][j] != 1) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }
    return dp[n - 1][m - 1];
};
//8.最小路径和
//给定一个包含非负整数的 `*m* x *n*` 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
//状态定义：设dp[i][j]为走到当前位置的最小路径和
//递推公式：
//只能向下或向右走，意味着当前格子只能由上边或者左边走过来
//dp[i][j] = Min(dp[i-1][j],dp[i][j-1]) + grid[i][j]
var minPathSum = function(grid) {
    var n = grid.length;
    var m = grid[0].length;
    var dp = Array.from(new Array(n),() => new Array(m));
    for(var i = 0;i < n;i++){
        for(var j = 0;j < m;j++){
            if( i != 0 && j!= 0){
                dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1])+grid[i][j];
            }else if(i == 0 && j!=0){
                dp[i][j] = dp[i][j-1]+grid[i][j];
            }else if(i != 0 && j==0){
                dp[i][j] = dp[i-1][j]+grid[i][j];
            }else if(i == 0 && j==0){
                dp[i][j] = grid[i][j];
            }
        }
    }
    return dp[n-1][m-1];
};
//9.爬楼梯
//假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//解法二：DP
var climbStairs = function(n) {
    let dp = []
    dp[1] = 1
    dp[2] = 2
    for(let i = 3; i <= n; i++){
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
};
//10.最长公共子序列
//给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
//思路：dp[i][j]代表text1的i下标和text2的j下标最长公共序列的长度
//那么后续就存在两种情况，text[i-1]和text[j-1]相等，就找到了又一个公共子序列，那么dp[i][j] = dp[i-1][j-1] +1;
//如果不相等，dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])就取最大值
const longestCommonSubsequence = (text1, text2) => {
    let dp = Array.from(Array(text1.length+1), () => Array(text2.length+1).fill(0));

    for(let i = 1; i <= text1.length; i++) {
        for(let j = 1; j <= text2.length; j++) {
            if(text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] +1;;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])//需要每个字符串回撤一个值，求其最大，因为可能是text1[i]不再最长子序列中也可能是text2[j]不在
            }
        }
    }

    return dp[text1.length][text2.length];
};
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
const maxProfit = function (prices) {
    let n = prices.length;
    let dp = Array.from(new Array(n), () => new Array(2));
    dp[0][0] = 0; //第0天不持有
    dp[0][1] = -prices[0]; //第0天持有
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);//为何此处为负数，原本应该是dp[i - 1][0][0] - prices[i]，但是k=0时 没有交易次数，dp[i - 1][0][0] = 0
    }
    return dp[n - 1][0];
};

//12.买卖股票时机2
//给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    //dp[i][k][0]或者dp[i][k][1]
    //只有两种情况第i天持有股票,前一天持有或者今天买入的
    //dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k][1]-prices[i])
    //第i天没持有股票，前一天没支持，或者今天卖出了
    //dp[i][k][0] = Math.max(dp[i][k][0], dp[i][k-1][0]+prices[i])
    //dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])，k不影响结果因此去掉
    //dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    let dp = Array.from(new Array(prices.length), ()=>new Array(2))
    dp[0][1] = -prices[0]
    dp[0][0] = 0
    for(let i = 1; i<prices.length; i++){
        dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i])
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i])
    }
    return dp[prices.length - 1][0]
};
//13.买卖股票含冷冻期
//思路：同前边一样题目不限制k的大小，可以省略
/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    //思路：dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    //dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i])冷冻期是1天，因此买入的话，要减一天冷冻期，所以是i-2
    if(prices.length < 2) return 0
    let dp = Array.from(new Array(prices.length), () => new Array(2))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    dp[1][1] = Math.max(dp[0][1], dp[0][0] - prices[1])
    dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[1])
    for(let i = 2;i<prices.length; i++){
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i])
        dp[i][1] = Math.max(dp[i-1][1], dp[i-2][0] - prices[i])
    }
    return dp[prices.length - 1][0]
    
};
//14.买卖股票含手续费
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
 var maxProfit = function(prices, fee) {
    let dp = Array.from(new Array(prices.length), () => new Array(2))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for(let i=1;i< prices.length; i++){
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i] - fee)//卖出的时候扣掉手续费即可
        dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i])
    }
    return dp[prices.length - 1][0]
};
//15.打家劫舍
//如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
/**
 * @param {number[]} nums
 * @return {number}
 */
 var rob = function(nums) {
    //dp[i]代表i下标的房间可以投到的最大金额
    //dp[i] = Math.max(dp[i-2] + nums[i], dp[i-1])偷i-2房间和当前房间的金额，以及偷i-1房间存在这两种情况
    if(nums.length < 2) return nums[0]
    dp = new Array(nums.length).fill(0)
    dp[0] = nums[0]
    dp[1] = Math.max(nums[1], nums[0])
    for(let i = 2;i < nums.length; i++){
        dp[i] = Math.max(dp[i-2] + nums[i], dp[i-1])
    }
    return Math.max(...dp)
};
//16.打家劫舍2
//树形dp
//返回数组就是dp数组。所以dp数组（dp table）以及下标的含义：下标为0记录不偷该节点所得到的的最大金钱，下标为1记录偷该节点所得到的的最大金钱
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var rob = function(root) {
    // 后序遍历函数
    const postOrder = node => {
        // 递归出口
        if (!node) return [0, 0];
        // 遍历左子树
        const left = postOrder(node.left);
        // 遍历右子树
        const right = postOrder(node.right);
        // 不偷当前节点，左右子节点都可以偷或不偷，取最大值
        const DoNot = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        // 偷当前节点，左右子节点只能不偷
        const Do = node.val + left[0] + right[0];
        // [不偷，偷]
        return [DoNot, Do];
    };
    const res = postOrder(root);
    // 返回最大值
    return Math.max(...res);
};