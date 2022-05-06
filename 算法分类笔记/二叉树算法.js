//1.二叉树的遍历

/* 二叉树深度优先遍历
前序遍历： 中左右  根据中间节点及根节点输出顺序定的
后序遍历： 左中右
中序遍历： 左右中
二叉树广度优先遍历
层序遍历：102.二叉树的层序遍历 */

//中序遍历
var inorderTraversal = function(root) {
    const result = []
    let dfs = node=>{
        if(node === null) return//递归结束条件
        dfs(node.left)
        result.push(node.val)
        dfs(node.right)
    }
    dfs(root)
    return result
};
//前序遍历
var inorderTraversal = function(root) {
    const result = []
    let dfs = node=>{
        if(node === null) return//递归结束条件
        result.push(node.val)
        dfs(node.left)
        dfs(node.right)
    }
    dfs(root)
    return result
};
//后序遍历
var inorderTraversal = function(root) {
    const result = []
    let dfs = node=>{
        if(node === null) return//递归结束条件
        dfs(node.left)
        dfs(node.right)
        result.push(node.val)
    }
    dfs(root)
    return result
};
//层序遍历（广度优先）
var levelOrder = function(root) {
  const res = []
  function traversal (root, depth) {
    if (root !== null) {
      if (!res[depth]) {
        res[depth] = []
      }
      traversal(root.left, depth + 1)
      res[depth].push(root.val)
      traversal(root.right, depth + 1)
    }
  }
  traversal(root, 0)
  return res
}
//搜索二叉搜索数（左节点小于当前值，右节点大于当前值）查早效率是二分的
var searchBST = function(root, val) {
  function traversal (root) {
    if (root !== null) {
      if (root.val === val) {
        return root
      } else if (root.val < val) {
        return traversal(root.right)
      } else {
        return traversal(root.left)
      }
    } else {
      return root
    }
  }
  return traversal(root)
}
//相同的树（可以利用这种递归思想并发同时爬两棵树）
var isSameTree = function(p, q) {
  function traversal (root1, root2) {
    if (root1 === null && root2 !== null) {
      return false
    } else if (root1 !== null && root2 === null) {
      return false
    } else if (root1 === null && root2 === null) {
      return true
    } else {
      return  root1.val === root2.val && traversal(root1.left, root2.left) && traversal(root1.right, root2.right)
    }
  }
  return traversal(p, q)
}
//反转一颗二叉树
var invertTree = function(root) {
  function traversal (root) {
    if (root === null) {
      return null
    } else {
      [root.left, root.right] = [traversal(root.right), traversal(root.left)]
      return root
    }
  }
  return  traversal(root)
}

//1.二叉树的最近公共祖先
//给定一个二叉树, 找到该树中两个指定节点的最近公共祖先
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
    //采用回溯的方法
    //递归终止条件
    if(root == null || root == q || root == p){
        return root
    }
    const left = lowestCommonAncestor(root.left, p,q)
    const right = lowestCommonAncestor(root.right, p, q)
    if(left && right){//如果左边和右边都有值说明当前节点是最近的公共节点
        return root
    }else{ //不然就那边节点有值返回哪边节点，继续回溯
        return left || right
    }

};
//2.路径总和
//给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
 var hasPathSum = function(root, targetSum) {//递归需要返回值，不用遍历整颗树
    if(root == null) return false
    if(!root.left && !root.right && targetSum == root.val) return true //如果当前是叶子节点，并且val和targetSum相等，说明该路径总和是等于targetSum的
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
};
//3.路径总和二
//给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
 var pathSum = function(root, targetSum) {//递归不需要返回值，遍历整颗数
    const res = []
    const dfs = (root, targetSum, path) => {
        if(root == null) return //递归终止条件
        if(!root.left && !root.right && targetSum == root.val){//遇到满足条件的叶子节点
            res.push([...path, root.val])
            return
        }
        path.push(root.val)//选择
        dfs(root.left, targetSum - root.val, path)//左递归
        dfs(root.right, targetSum - root.val, path)//右递归
        path.pop()//回溯
    }
    dfs(root,targetSum,[])
    return res
};