//1.俄罗斯套娃信封问题（hard）
//给你一个二维整数数组 envelopes ，其中 envelopes[i] = [wi, hi] ，表示第 i 个信封的宽度和高度。
//当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。
//思路：先排序，再求最长递增子序列
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
 var maxEnvelopes = function(envelopes) {
    envelopes.sort((e1,e2)=>e1[0] !== e2[0] ? e1[0] - e2[0] : e2[1] - e1[1])//排序
    //求height数组
    const heigth = []
    for(let i = 0; i< envelopes.length; i++){
        heigth[i] = envelopes[i][1]
    }
    //求height数组的最长连续子序列
    //用dp动态规划写
    const dp = new Array(heigth.length).fill(1)
    for(let i =0;i< heigth.length;i++){
        for(let j=0;j<i;j++){
            if(heigth[i]>heigth[j]){
                dp[i] = Math.max(dp[i], dp[j]+1)
            }
        }
    }
    return Math.max(...dp)

};
//2.最长连续序列
//给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
/**
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    const set = new Set(nums)//去重以及方便查找
    let maxlen = 0
    for(let item of set){
        if(!set.has(item - 1)){// 没有左邻居，是序列的起点，才开始数数
            let len = 1
            let now = item
            while(set.has(now + 1)){// 有右邻居，看连续的右邻居有多少个
                len ++
                now ++
            }
            // 存放最大的连续邻居的值
            maxlen = Math.max(maxlen, len)
        }
    }
    return maxlen

};
//3.盛水最多容器
//给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
/**
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
    let max = 0
    let l = 0
    let r = height.length - 1
    while(r > l){
        max = Math.max(max, (r - l) * (height[r] < height[l] ? height[r--] : height[l++]))
    }
    return max
};
//4.寻找两个正序数组的中位数
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
//给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 var findMedianSortedArrays = function(nums1, nums2) {
    let arr = nums1.concat(nums2).sort((a,b)=> a-b)
    if(arr.length % 2 === 1){
        return arr[Math.floor(arr.length/2)]
    }else{
        return (arr[Math.floor(arr.length/2) - 1] + arr[Math.floor(arr.length/2)]) / 2
    }
    
};
//5.删除有序数组中的重复项
//给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。
//思路：创建一个快慢指针，i和j当快慢指针不等时将慢指针加1，将快指针的值赋值给慢指针
/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
    let i = 0
    for(let j =1; j< nums.length; j++){
        if(nums[i] != nums[j]){
            i++
            nums[i] = nums[j]
        }
    }
    return i + 1
};
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
 var subarraySum = function(nums, k) {
    let count = 0
    let map = { //存放前缀和的map
        0:1
    }
    let sum = 0
    for(let i=0;i<nums.length;i++){
        sum += nums[i]
        if(map[sum - k]){ //如果map中存在与当前前缀和-k相等的值，那么此时count加上该前缀和的次数
            count += map[sum - k]
        }
        if(map[sum]){ //前缀和出现的次数
            map[sum]++
        }else{
            map[sum] = 1
        }
    }
    return count
};
//7.两数之和
//给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** 的那 **两个** 整数，并返回它们的数组下标。
//动态哈希表，使用的ES6的Map对象
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0;i<nums.length;i++){
        var cha = target - nums[i];
        if(map.has(cha)){
            return [map.get(cha),i]
        }else{
            map.set(nums[i],i)
        }
    }
    
};
//8.三数之和
//给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
var threeSum = function(nums) {
    let res = []
    nums.sort((a,b) => a-b)
    for(let i =0 ;i < nums.length-2; i ++){
        if(nums[i] > 0) break;//nums[i]>0说明不会在存在和为0的了
        if(i > 0 && nums[i] === nums[i-1]) continue //去重
        let left = i+1, right=nums.length - 1
        while(left < right){
            if(nums[i] + nums[left] + nums[right] === 0){
                res.push([nums[i], nums[left], nums[right]])
                while(left< right && nums[left] === nums[left+1]) left ++ //去重
                while(left< right && nums[right] === nums[right - 1]) right -- //去重
                left ++ 
                right --
            }else if (nums[i] + nums[left] + nums[right] < 0){
                left ++ 
            }else{
                right --
            }
        }
    }
    return res
};
//9.四数之和
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
 var fourSum = function(nums, target) {
    const res = []
    nums.sort((a,b)=>a-b)
    for(let i = 0; i< nums.length - 3; i++){
        if(i>0 && nums[i] === nums[i-1]) continue //判断i是否重复
        for(let j = i + 1; j< nums.length - 2; j++){
            if(j>i+1 && nums[j] === nums[j-1]) continue//判断j是否重复
            let left = j + 1, right = nums.length - 1
            while(left < right){
                if(nums[i] + nums[j] + nums[left] + nums[right] === target){
                    res.push([nums[i],nums[j],nums[left], nums[right]])
                    while(nums[left] === nums[left + 1]) left ++ //去重
                    while(nums[right] === nums[right - 1]) right -- //去重
                    left ++ 
                    right --
                }else if(nums[i] + nums[j] + nums[left] + nums[right] < target){
                    left ++
                }else{
                    right --
                }
            }
        }
    }
    return res
};
//10.接雨水（hard）
//给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
//思路：采用双指针的方法，维护r和l两个指针，以及两个变量rmax和lmax代表右边和左边最高的值，接雨水的量由矮的一边决定
/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
    //采用双指针的方法
    let l = 0, r = height.length - 1
    let lmax = 0, rmax = 0
    let sum = 0
    while(l< r){
        lmax = Math.max(lmax, height[l])
        rmax = Math.max(rmax, height[r])
        if(lmax < rmax){
            sum += lmax - height[l]
            l++
        }else{
            sum += rmax - height[r]
            r--
        }
    }
    return sum
};
