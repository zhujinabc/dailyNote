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
var letterCombinations = function (digits) {
  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'qprs',
    8: 'tuv',
    9: 'wxyz',
  };
  const len = digits.length;
  const res = [];
  if (digits.length === 0) return res;
  //深度遍历函数dfs
  const dfs = (str, digits) => {
    if (str.length === len) {
      res.push(str); //递归结束条件
      return;
    }
    let strs = map[digits[0]];
    for (let i = 0; i < strs.length; i++) {
      //选择
      str = str + strs[i];
      dfs(str, digits.slice(1)); // 递归组好的 str和下一段字符串
      str = str.slice(0, -1); //回溯
    }
  };
  dfs('', digits);
  return res;
};
//2.全排列
//给定一个 **没有重复** 数字的序列，返回其所有可能的全排列。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  //用dfs递归回溯来解
  const len = nums.length;
  const res = [];
  const used = {};
  const dfs = (path) => {
    if (path.length === len) {
      //递归结束条件
      //需要slice一个新数组，因为下边回溯的过程会对path操作
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < len; i++) {
      if (used[nums[i]]) continue; //剪枝，使用过的不再加进解集
      path.push(nums[i]); //选择
      used[nums[i]] = true;
      dfs(path); //递归
      //回溯,将path置空。比如i=0递归走到最底层了，那需要回到上一个位置将已经已经push进path的元素全部pop()出来，进行i=1的遍历
      //回溯起始就是递归遇到终止条件后，函数返回上一个调用栈的过程
      path.pop();
      used[nums[i]] = false; // 回溯将已经used对象都置为false，方便进入i = 1的循环
    }
  };
  dfs([]);
  return res;
};
//3.括号生成
//数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  //采用回溯算法
  const res = [];
  const dfs = (left, right, str) => {
    if (str.length == n * 2) {
      //选择
      res.push(str);
      return;
    }
    if (left > right) {
      //剪枝，只有当右括号小于左括号时才可以选择右括号，不然生成的括号不符合规范
      dfs(left, right + 1, str + ')'); //递归
    }
    if (left < n) {
      dfs(left + 1, right, str + '(');
    }
  };
  dfs(0, 0, '');
  return res;
};
//4.子集
//给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];
  const path = [];
  const dfs = (startIndex) => {
    res.push(path.slice()); //之所以不写递归结束条件，是因为startIndex是i,肯定有结束的时候，所以不用递归结束条件
    for (let i = startIndex; i < nums.length; i++) {
      path.push(nums[i]); //选择
      dfs(i + 1); //递归
      path.pop(); //回溯
    }
  };
  dfs(0);
  return res;
};
//5.组合问题
//给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const res = [];
  const path = [];
  const dfs = (path, target, startIndex) => {
    if (target == 0) {
      //递归结束只有两种情况，一个是等于0一个是小于0
      res.push(path.slice());
      return;
    } else if (target < 0) {
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      //什么时候需要用startIndex控制遍历起始位置呢？
      //每次从集合中选取元素，可选择的范围随着选择的进行而收缩，调整可选择的范围，就是要靠startIndex。
      //一般在一个集合中找组合需要用startIndex,如果多个集合中找组合一般不用
      path.push(candidates[i]);
      dfs(path, target - candidates[i], i);
      path.pop();
    }
  };
  dfs([], target, 0);
  return res;
};

//6.单词搜索
/* 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  //用一个二维数组记录当前点是否已经访问，判断当前点是否能够找到下一个点
  const m = board.length,
    n = board[0].length;
  const used = Array.from(new Array(m), () => new Array(n).fill(false));
  const canFind = (i, j, idx) => {
    //如果当前idx已经等于了字符长度，说明找到了这个字符
    if (idx === word.length) return true;
    //当前点越界了，返回false
    if (i < 0 || i >= m || j < 0 || j >= n) {
      return false;
    }
    //如果当前点不等于字符中对应点，或者当前点已经访问过了返回false
    if (board[i][j] !== word[idx] || used[i][j]) {
      return false;
    }
    used[i][j] = true; //将当前点置为访问过了
    const findRest =
      canFind(i - 1, j, idx + 1) ||
      canFind(i, j - 1, idx + 1) ||
      canFind(i + 1, j, idx + 1) ||
      canFind(i, j + 1, idx + 1);
    if (findRest) {
      return true;
    }
    //如果没找到将当前点置为未访问，因为从其他点访问当前点有可能是可行的
    used[i][j] = false;
    return false;
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0] && canFind(i, j, 0)) {
        return true;
      }
    }
  }
  return false;
};

//7.分割回文串
//给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  //基于start去遍历字符串，如果当前start和i组成的字符串是回文串，那么继续dfs，如果不是不去管
  const isHuiwen = (s, l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) {
        return false;
      }
      l++;
      r--;
    }
    return true;
  };
  const res = [];
  const dfs = (path, start) => {
    //
    if (start === s.length) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i < s.length; i++) {
      if (isHuiwen(s, start, i)) {
        //如果是回文就将当前子串截出放入path
        path.push(s.slice(start, i + 1));
        //进行下一步递归，此时start从i+1开始
        dfs(path, i + 1);
        //回溯的本质就是递归调用，在一个选择递归结束后，会返回到选择前的状态，去考察另一个选项，因此需要将path
        //重置为选择前的状态，即把已经在上一个选择中加入的元素pop出去
        path.pop();
      }
    }
  };
  dfs([], 0);
  return res;
};

//8.N皇后问题
/* 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
 */

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  //初始化一个全是.的棋盘
  const bord = Array.from(new Array(n), () => new Array(n).fill('.'));
  const cols = new Set(); //存储皇后出现过的列
  const diag1 = new Set(); //存储皇后出现过的正对角线
  const diag2 = new Set(); //存储皇后出现过的负对角线
  const res = []; //结果数组
  const dfs = (row) => {
    if (row === n) {
      //将棋盘数组元素组合成字符串
      const temp = bord.slice();
      for (let i = 0; i < n; i++) {
        temp[i] = temp[i].join('');
      }
      res.push(temp);
    }
    for (let col = 0; col < n; col++) {
      //当前列不在皇后出现过的对角线和列，说明该点可以放皇后
      if (!cols.has(col) && !diag1.has(row - col) && !diag2.has(row + col)) {
        bord[row][col] = 'Q'; //放皇后
        cols.add(col);
        diag1.add(row - col); //放皇后的正对角线
        diag2.add(row + col); //放皇后的负对角线
        dfs(row + 1);
        //回溯，复原现场
        bord[row][col] = '.';
        cols.delete(col);
        diag1.delete(row - col);
        diag2.delete(row + col);
      }
    }
  };
  dfs(0);
  return res;
};
