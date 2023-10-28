//1.岛屿数量
//给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
//思路：1.首先定义深度优先遍历函数，若越界或者遇到0，就停止访问。正常访问时，访问过的地方标记为0，以免后面重复访问。再从四个方向上继续深度优先遍历
//2.然后遍历矩阵，若遇到1，开始深度优先遍历，每遍历完一整趟，会把相连的所有1，变成0，代表访问完了一个岛屿，执行res++，最后返回res即可
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let res = 0;
  //采用深度有限遍历
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == '0') return;
    //这个是关键点
    grid[i][j] = '0'; //访问过的陆地置位0，防止后续重复遍历
    dfs(i - 1, j);
    dfs(i, j - 1);
    dfs(i + 1, j);
    dfs(i, j + 1);
  };
  //矩阵的行列
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == '1') {
        //找到为1的点就开始遍历
        dfs(i, j); //// 每遍历完一整趟，会把相连的所有1，变成0, 代表访问完了一个岛屿，res++
        res++;
      }
    }
  }
  return res;
};
//2.岛屿的最大面积
//岛屿的面积是岛上值为 1 的单元格的数目。
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let res = 0;
  let flag = 0; //定义一个变量存储每次遍历的面积
  //采用深度有限遍历
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == '0') return;
    flag++;
    grid[i][j] = '0'; //访问过的陆地置位0，防止后续重复遍历
    dfs(i - 1, j);
    dfs(i, j - 1);
    dfs(i + 1, j);
    dfs(i, j + 1);
  };
  //矩阵的行列
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == '1') {
        //找到为1的点就开始遍历
        dfs(i, j); //// 每遍历完一整趟，会把相连的所有1，变成0, 代表访问完了一个岛屿，res++
        res = Math.max(res, flag);
        flag = 0; //重置flag
      }
    }
  }
  return res;
};

//3.腐烂的橘子
/* 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：

值 0 代表空单元格；
值 1 代表新鲜橘子；
值 2 代表腐烂的橘子。
每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。

返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  // 通过队列的形式，一个层一层的往下腐烂，层数就是分钟数
  let minite = 0,
    freshNums = 0,
    queue = [];
  const m = grid.length,
    n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        //将腐烂的橘子推入队列
        queue.push([i, j, 0]); // 第三个元素代表当前是第几分钟腐烂的橘子
      } else if (grid[i][j] === 1) {
        freshNums++; //记录好橘子的个数
      }
    }
  }
  const helper = (row, col, curMinite) => {
    //当前橘子的四个方向
    const arr = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];
    //对四个方向上的橘子进行判断
    for (let i = 0; i < arr.length; i++) {
      const r = row + arr[i][0];
      const c = col + arr[i][1];
      //如果越界或者不是好橘子跳过
      if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== 1) {
        continue;
      }
      //是好橘子，将该橘子腐烂，并加入腐烂队列，新鲜橘子减1
      grid[r][c] = 2;
      queue.push([r, c, curMinite + 1]);
      freshNums--;
    }
  };
  //橘子腐烂的过程，如果queue队列中还有坏橘子，证明橘子还没坏完
  while (queue.length) {
    const item = queue.shift();
    minite = item[2];
    helper(item[0], item[1], item[2]);
  }
  //新鲜橘子还有说明，该新鲜橘子不可能腐烂，返回-1
  return freshNums > 0 ? -1 : minite;
};

//4.课程表
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
/* 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。
例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false */

var canFinish = function (numCourses, prerequisites) {
  //每门课有个初始入度数组，入度为0，说明不依赖其他课，可以直接选
  //如果当前课依赖其他课，我们需要记录下来，当选了一个课时，依赖该课的那门课的入度要减1，当减为0时可以直接选
  //如果选课次数等于要上的课数，说明可以修完，否则不能修完
  const inDegree = new Array(numCourses).fill(0); //入度数组
  const map = {}; //领接表，key为课号，value为依赖的课数组
  //初始化入度数组和领接表
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++; //初始入度值
    if (map[prerequisites[i][1]]) {
      map[prerequisites[i][1]].push(prerequisites[i][0]); //添加依赖他的后续课程
    } else {
      map[prerequisites[i][1]] = [prerequisites[i][0]];
    }
  }
  let count = 0;
  let queue = []; //已选课数组
  //初始化选课数组，将入度为0的课加入数组
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  //选课
  while (queue.length) {
    const item = queue.shift();
    const arr = map[item]; //领接表中依赖当前选择的课的数组
    count++; //选一次课加1
    if (arr && arr.length) {
      //有依赖的课程
      for (let i = 0; i < arr.length; i++) {
        inDegree[arr[i]]--; //将依赖该课的课的入度减1
        if (inDegree[arr[i]] === 0) {
          queue.push(arr[i]); // 如果减完该课入度为0了，说明可以直接选，加入选课队列
        }
      }
    }
  }
  return count === numCourses;
};

//5.实现前缀树
/* Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

Trie() 初始化前缀树对象。
void insert(String word) 向前缀树中插入字符串 word 。
boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false */

var Trie = function () {
  this.root = new Node();
};

//前缀树的每个节点包含三个属性
function Node(val, isEnd) {
  this.isEnd = isEnd || false; //当前节点是否是结尾，即是否是叶子节点
  this.children = {}; //当前节点下面的子节点
  this.val = val; //当前节点值
}

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let cur = this.root; //插入的初始指针是根节点
  for (let s of word) {
    if (!cur.children[s]) {
      //cur是根节点，所以需要判断的是cur的children
      cur.children[s] = new Node(s);
    }
    //无论当前有没有节点，指针都需要下移
    cur = cur.children[s]; //指针下移到子节点
  }
  cur.isEnd = true; //最后一个字符标记为end
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let cur = this.root;
  for (let s of word) {
    //如果该节点没值，证明找不到这个字符返回false
    if (!cur.children[s]) {
      return false;
    }
    cur = cur.children[s];
  }
  console.log(cur);
  return cur.isEnd; // 注意如果最后一个字符串有end标志，证明找到的是一个单词
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let cur = this.root;
  for (let s of prefix) {
    if (!cur.children[s]) {
      return false;
    }
    cur = cur.children[s];
  }
  return true;
};
