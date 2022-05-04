//1.跳跃游戏
//给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。
//思路：用一个变量记录当前能够到达的最大的索引，我们逐个遍历数组中的元素去更新这个索引。变量完成判断这个索引是否大于数组下标即可。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var canJump = function(nums) {
    let max = 0
    for(let i =0; i<nums.length; i++){
        if(max < i) return false
        max = Math.max(max, nums[i] + i)
    }
    return max >= nums.length - 1
};
//2.跳跃游戏2
//给你一个非负整数数组 nums ，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。
//你的目标是使用最少的跳跃次数到达数组的最后一个位置。假设你总是可以到达数组的最后一个位置。
//思路：要从覆盖范围出发，不管怎么跳，覆盖范围内一定是可以跳到的，以最小的步数增加覆盖范围，覆盖范围一旦覆盖了终点，得到的就是最小步数！
/**
 * @param {number[]} nums
 * @return {number}
 */
 var jump = function(nums) {
    let count = 0 //步数
    let cur = 0  //当前覆盖范围可以到达的最远距离
    let next = 0   //下一个覆盖范围可以到的最远距离
    for(let i = 0;i < nums.length - 1; i++){
        next = Math.max(next, nums[i] + i)
        if(cur == i){ //如果当前下标等于了当前覆盖范围最远距离
            cur = next //说明还不到终点，需要加1，并更新覆盖范围
            count++
        }
    }
    return count
};
//3.分发饼干
//对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，
//我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这
var findContentChildren = function(g, s) {
    g = g.sort((a, b) => a - b)
    s = s.sort((a, b) => a - b)
    let result = 0
    let index = s.length - 1
    for(let i = g.length - 1; i >= 0; i--) {
        if(index >= 0 && s[index] >= g[i]) {//大饼干优先满足大孩子
            result++
            index--
        }
    } 
    return result
};