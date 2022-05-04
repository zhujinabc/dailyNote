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
