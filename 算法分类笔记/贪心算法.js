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
//4. 用最少数量的箭引爆气球
//思路：第一组重叠气球，一定是需要一个箭，气球3，的左边界大于了 第一组重叠气球的最小右边界，所以再需要一支箭来射气球3了
/**
 * @param {number[][]} points
 * @return {number}
 */
 var findMinArrowShots = function(points) {
    if(!points.length) return 0
    points.sort((a,b)=>a[0]-b[0])//先将数组按照左边界升序排序
    let res = 1
    for(let i=1; i<points.length; i++){
        if(points[i][0] > points[i-1][1]){//如果第二个气球的左边界大于第一个气球右边界，那么需要多一个箭
            res ++ 
        }else{
            points[i][1] = Math.min(points[i][1], points[i-1][1])//重叠的气球，更新下右边界的最小值
        }
    }
    return res
};
// 5.整数拆分和剪绳子都可以用贪心来写
//数字拆分为更多的 33，其次为 22，最差为 11，可让乘积最大化。
//但是，若最终拆出来，剩下一个 11，我们将其中一个 3 + 13+1 ，组成一个 44，可让乘积更大化。
var integerBreak = function(n) {
    if (n <= 3) return n - 1;

    let res = 1;
    while (n > 4) {
        n -= 3;
        res = (res * 3);
    }
    return (n * res);
};