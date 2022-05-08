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
