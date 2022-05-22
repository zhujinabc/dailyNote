/* 回溯的模板：
    选择，剪枝，递归，撤回
    backtracking(参数) {
        if (终止条件) {
            存放结果;
            return;
        }
    
        for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
            处理节点;
            backtracking(路径，选择列表); // 递归
            回溯，撤销处理结果
        }
    } */

//1.电话号码组合
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const map = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'qprs',
        '8': 'tuv',
        '9': 'wxyz'
    }
    const len = digits.length
    const res = []
    if(digits.length === 0) return res
    //深度遍历函数dfs
    const dfs = (str, digits) =>{
        if(str.length === len){
            res.push(str) //递归结束条件
            return
        }
        let strs = map[digits[0]]
        for(let i =0; i< strs.length; i++){//选择
            str = str + strs[i]
            dfs(str, digits.slice(1))// 递归组好的 str和下一段字符串
            str = str.slice(0,-1)//回溯
        }
    }
    dfs('', digits)
    return res

};
//2.全排列
//给定一个 **没有重复** 数字的序列，返回其所有可能的全排列。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    //用dfs递归回溯来解
    const len = nums.length
    const res= []
    const used = {}
    const dfs = (path) => {
        if(path.length === len) { //递归结束条件
            res.push(path.slice())
            return
        }
        for(let i =0 ;i < len; i++){
            if(used[nums[i]]) continue //剪枝，使用过的不再加进解集
            //if(path.contains(nums[i])) continue 别这么写，查找是O(N)增加时间复杂度
            path.push(nums[i]) //选择
            used[nums[i]] = true 
            dfs(path) //递归
            path.pop() //回溯
            used[nums[i]] = false
        }
    }
    dfs([])
    return res
};
//3.括号生成
//数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
/**
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function(n) {
    //采用回溯算法
    const res = []
    const dfs = (left, right, str) => {
        if(str.length == n*2){//选择
            res.push(str)
            return
        }
        if(left > right){//剪枝，只有当右括号小于左括号时才可以选择右括号，不然生成的括号不符合规范
            dfs(left, right + 1, str + ')')//递归
        }
        if(left < n){
            dfs(left + 1, right, str + '(')
        }
    }
    dfs(0,0,'')
    return res
};
//4.子集
//给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsets = function(nums) {
    const res = []
    const path = []
    const dfs = (startIndex) => {
        res.push(path.slice())//之所以不写递归结束条件，是因为startIndex是i,肯定有结束的时候，所以不用递归结束条件
        for(let i = startIndex; i< nums.length; i++){
            path.push(nums[i])//选择
            dfs(i+1)//递归
            path.pop()//回溯
        }
    }
    dfs(0)
    return res
};
//5.组合问题
//给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum = function(candidates, target) {
    const res = []
    const path = []
    const dfs = (path,target, startIndex) => {
        if(target == 0){ //递归结束只有两种情况，一个是等于0一个是小于0
            res.push(path.slice())
            return
        }else if (target < 0){
            return
        }
        for(let i =startIndex;i<candidates.length;i++){//什么时候需要用startIndex控制遍历起始位置呢？ 
            //每次从集合中选取元素，可选择的范围随着选择的进行而收缩，调整可选择的范围，就是要靠startIndex。
            //一般在一个集合中找组合需要用startIndex,如果多个集合中找组合一般不用
            path.push(candidates[i])
            dfs(path, target - candidates[i],i)
            path.pop()
        }
    }
    dfs([],target,0)
    return res
};