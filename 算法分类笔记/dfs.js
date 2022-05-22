//1.岛屿数量
//给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
//思路：1.首先定义深度优先遍历函数，若越界或者遇到0，就停止访问。正常访问时，访问过的地方标记为0，以免后面重复访问。再从四个方向上继续深度优先遍历
//2.然后遍历矩阵，若遇到1，开始深度优先遍历，每遍历完一整趟，会把相连的所有1，变成0，代表访问完了一个岛屿，执行res++，最后返回res即可
/**
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid) {
    let res = 0
    //采用深度有限遍历
    const dfs = (i,j) => {
        if(i<0 || i>= m || j<0 || j>= n || grid[i][j] == '0') return 
        grid[i][j] = '0'//访问过的陆地置位0，防止后续重复遍历
        dfs(i-1,j)
        dfs(i, j-1)
        dfs(i+1,j)
        dfs(i, j+1)
    }
    //矩阵的行列
    const m = grid.length
    const n = grid[0].length
    for(let i = 0; i< m; i++){
        for(let j = 0;j < n; j++){
            if(grid[i][j] == '1'){//找到为1的点就开始遍历
                dfs(i,j)//// 每遍历完一整趟，会把相连的所有1，变成0, 代表访问完了一个岛屿，res++
                res++
            }
        }
    }
    return res
};
//2.岛屿的最大面积
//岛屿的面积是岛上值为 1 的单元格的数目。
/**
 * @param {number[][]} grid
 * @return {number}
 */
 var maxAreaOfIsland = function(grid) {
    let res = 0
    let flag = 0//定义一个变量存储每次遍历的面积
    //采用深度有限遍历
    const dfs = (i,j) => {
        if(i<0 || i>= m || j<0 || j>= n || grid[i][j] == '0') return 
        flag++
        grid[i][j] = '0'//访问过的陆地置位0，防止后续重复遍历
        dfs(i-1,j)
        dfs(i, j-1)
        dfs(i+1,j)
        dfs(i, j+1)
    }
    //矩阵的行列
    const m = grid.length
    const n = grid[0].length
    for(let i = 0; i< m; i++){
        for(let j = 0;j < n; j++){
            if(grid[i][j] == '1'){//找到为1的点就开始遍历
                dfs(i,j)//// 每遍历完一整趟，会把相连的所有1，变成0, 代表访问完了一个岛屿，res++
                res = Math.max(res, flag)
                flag = 0//重置flag
            }
        }
    }
    return res
};