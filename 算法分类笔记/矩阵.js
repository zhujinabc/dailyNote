//1.矩阵置0
//给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  //通过两个数组分别存放对应列和行是否存在0，如果存在0置为true
  //再遍历一次矩阵，遇到列或者行中存在0的就把该列或者该行全部置为0
  const m = matrix.length,
    n = matrix[0].length;
  const row = new Array(m).fill(false);
  const col = new Array(n).fill(false);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        row[i] = col[j] = true;
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (row[i] || col[j]) {
        matrix[i][j] = 0;
      }
    }
  }
  return matrix;
};

//2.螺旋矩阵
//给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  /*  上边界 top : 0
        下边界 bottom : matrix.length - 1
        左边界 left : 0
        右边界 right : matrix[0].length - 1*/
  //先遍历一个环，遍历完向内收缩一圈，知道只剩一行或者一列的情况
  if (matrix.length === 0) return [];
  const res = [];
  let top = 0,
    left = 0,
    bottom = matrix.length - 1,
    right = matrix[0].length - 1;
  while (top < bottom && left < right) {
    for (let i = left; i < right; i++) res.push(matrix[top][i]); //上
    for (let i = top; i < bottom; i++) res.push(matrix[i][right]); //右
    for (let i = right; i > left; i--) res.push(matrix[bottom][i]); //下
    for (let i = bottom; i > top; i--) res.push(matrix[i][left]); //左
    top++;
    bottom--;
    left++;
    right--;
  }
  if (left === right) {
    //只剩一列，从上到下推入
    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]); //左
  } else if (top === bottom) {
    //只剩一行，从左到右推入
    for (let i = left; i <= right; i++) res.push(matrix[top][i]); //左
  }
  return res;
};

//3.旋转图像
//给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const len = matrix.length;
  for (let i = 0; i < len; i++) {
    //注意是j = i因为是第几行就会转成第几列
    for (let j = i; j < len; j++) {
      //matrix[j][i] = matrix[i][j] 比如会将第0行的数换到第一列的位置，第二行的数换到第二列的位置
      //最后将得到的matrix的每一项翻转一下即可
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  return matrix.map((item) => item.reverse());
};

//4.搜索二维矩阵2
//编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
//每行的元素从左到右升序排列。
//每列的元素从上到下升序排列。
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length,
    n = matrix[0].length;
  //选择左上角的原因是，比target小只能往左，left - 1，比target大只能往下top + 1
  let top = 0,
    left = n - 1; //查找的起始位置，左上角
  while (top < m && left >= 0) {
    if (target === matrix[top][left]) {
      return true;
    }
    if (target < matrix[top][left]) {
      left--;
    }
    if (target > matrix[top][left]) {
      top++;
    }
  }
  return false;
};
