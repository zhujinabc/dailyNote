//1.二叉树的遍历

/* 二叉树深度优先遍历
前序遍历： 中左右  根据中间节点及根节点输出顺序定的
后序遍历： 左右中
中序遍历： 左中右
二叉树广度优先遍历
层序遍历：102.二叉树的层序遍历 */

//中序遍历
var inorderTraversal = function (root) {
  const result = []
  let dfs = (node) => {
    if (node === null) return //递归结束条件
    dfs(node.left)
    result.push(node.val)
    dfs(node.right)
  }
  dfs(root)
  return result
}

//前序遍历
var inorderTraversal = function (root) {
  const result = []
  let dfs = (node) => {
    if (node === null) return //递归结束条件
    result.push(node.val)
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return result
}
//后序遍历
var inorderTraversal = function (root) {
  const result = []
  let dfs = (node) => {
    if (node === null) return //递归结束条件
    dfs(node.left)
    dfs(node.right)
    result.push(node.val)
  }
  dfs(root)
  return result
}
//层序遍历（深度优先，递归）
var levelOrder = function (root) {
  const res = []
  function traversal(root, depth) {
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
var searchBST = function (root, val) {
  function traversal(root) {
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
var isSameTree = function (p, q) {
  function traversal(root1, root2) {
    if (root1 === null && root2 !== null) {
      return false
    } else if (root1 !== null && root2 === null) {
      return false
    } else if (root1 === null && root2 === null) {
      return true
    } else {
      return (
        root1.val === root2.val &&
        traversal(root1.left, root2.left) &&
        traversal(root1.right, root2.right)
      )
    }
  }
  return traversal(p, q)
}
//反转一颗二叉树
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root == null) {
    return root
  } else {
    ;[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
    return root
  }
}

//1.二叉树的最近公共祖先
//给定一个二叉树, 找到该树中两个指定节点的最近公共祖先
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  const dfs = (node) => {
    //遇到q或者p或者null就返回该节点
    if (node === null || node === p || node === q) return node
    const left = dfs(node.left)
    const right = dfs(node.right)
    //如果一个节点既有left又有right说明该节点有p和q子节点
    if (left && right) {
      return node
    }
    //不然就是哪个有返回哪个
    return left || right
  }
  return dfs(root)
}
//2.路径总和
//给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (root == null) return false //递归终止条件
  if (!root.left && !root.right && root.val === targetSum) return true //如果有叶子节点值等于targetSum说明有路径和等于targetSum
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  )
}
//3.路径总和二
//给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  //这个一看就是典型的回溯问题，求组合问题，只是组合问题是在数组中找，这个是在二叉树中找
  const res = []
  const dfs = (node, targetSum, path) => {
    if (node === null) {
      return
    }
    if (!node.left && !node.right && node.val === targetSum) {
      res.push([...path, node.val])
      return
    }
    path.push(node.val)
    dfs(node.left, targetSum - node.val, path)
    dfs(node.right, targetSum - node.val, path)
    path.pop() //回溯
  }
  dfs(root, targetSum, [])
  return res
}
//4.路径总和三
//给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
//思路：因为不限定从根节点开始和叶子节点结束，因此我们需要从不同节点开始遍历
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  let res = 0
  if (root === null) return res
  const dfs = (node, targetSum) => {
    if (node === null) return
    if (node.val === targetSum) {
      //说明遇到了和为targetSum的路径，res加1
      res++
    }
    dfs(node.left, targetSum - node.val)
    dfs(node.right, targetSum - node.val)
  }
  dfs(root, targetSum)
  //因为不限制是根节点，所以其他节点的res也需要求一下，并加到res上
  res += pathSum(root.left, targetSum)
  res += pathSum(root.right, targetSum)
  return res
}

//5.给定二叉搜索树（BST）的根节点 root 和一个整数值 val。你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null 。
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */ //BST的性质：左子树都小于根节点值，右子树都大于根节点值
var searchBST = function (root, val) {
  if (root == null) return null //如果到叶子节点了
  if (root.val == val) {
    //如果找到该节点，返回该节点
    return root
  }
  let left, right
  if (root.val > key)
    //所谓搜索树是有方向的，不加条件就是遍历整颗树
    left = searchBST(root.left, val)
  if (root.val < key) right = searchBST(root.right, val) //采用后续遍历root.right = deleteNode(root.right, key);
  // let left = searchBST(root.left, val)
  // let right = searchBST(root.right, val)//采用后续遍历
  return left || right
}
//6.删除二叉搜索树中的节点
//给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。
//思路：通过返回值删除
//有以下五种情况：

//第一种情况：没找到删除的节点，遍历到空节点直接返回了
//找到删除的节点
//第二种情况：左右孩子都为空（叶子节点），直接删除节点， 返回NULL为根节点
//第三种情况：删除节点的左孩子为空，右孩子不为空，删除节点，右孩子补位，返回右孩子为根节点
//第四种情况：删除节点的右孩子为空，左孩子不为空，删除节点，左孩子补位，返回左孩子为根节点
//第五种情况：左右孩子节点都不为空，则将删除节点的左子树头结点（左孩子）放到删除节点的右子树的最左面节点的左孩子上，返回删除节点右孩子为新的根节点。
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root === null)
    //没有找到删除节点，返回空
    return root
  if (root.val === key) {
    if (!root.left)
      //不存在左子树的情况
      return root.right
    else if (!root.right)
      //不存在右子树的情况
      return root.left
    else {
      //左右子树均存在的情况
      let cur = root.right
      while (cur.left) {
        //找出删除节点右子树中最小左节点
        cur = cur.left
      }
      cur.left = root.left //把删除节点左子树挂到右子树最下左节点下
      return root.right //返回右子树
    }
  }
  if (root.val > key)
    //所谓搜索树是有方向的，不加条件就是遍历整颗树
    root.left = deleteNode(root.left, key)
  if (root.val < key) root.right = deleteNode(root.right, key)
  // root.left = deleteNode(root.left, key);
  // root.right = deleteNode(root.right, key);
  return root
}
//7.二叉搜索树中的插入
//给定二叉搜索树（BST）的根节点 root 和要插入树中的值 value ，将值插入二叉搜索树。
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (root == null) {
    //只需要遍历当前bst树，找到为空的节点，把值插入就好了
    return new TreeNode(val)
  }
  if (root.val < val) {
    root.right = insertIntoBST(root.right, val)
  }
  if (root.val > val) {
    root.left = insertIntoBST(root.left, val)
  }
  return root
}
//8.二叉树的锯齿形层序遍历
//层序遍历基础上，各行翻转
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  const res = []
  const bfs = (root, depth) => {
    if (root == null) return
    if (root !== null) {
      if (!res[depth]) {
        res[depth] = []
      }
    }
    bfs(root.left, depth + 1)
    depth % 2 == 1 ? res[depth].unshift(root.val) : res[depth].push(root.val) //奇数行翻转，从前边加入数组，偶数行正常从后边push进数组
    bfs(root.right, depth + 1)
  }
  bfs(root, 0)
  return res
}
//9.不同的二叉搜索树
//给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
//思路：采用动态规划来写
//j相当于是头结点的元素，从1遍历到i为止。所以递推公式：dp[i] += dp[j - 1] * dp[i - j]; ，j-1 为j为头结点左子树节点数量，i-j 为以j为头结点右子树节点数量
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0) //n+1的原因是0也算，所以如果n是5的话，数组长度应该是6
  dp[0] = 1 //空节点定义上说也是一颗二叉树
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j]
    }
  }
  return dp[n]
}
//10.验证二叉搜索树
//给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
//二叉搜索树，左节点一定比右节点小，所以该问题可以简化为，将二叉树变成一个数组，然后判断该数组是否递增即可
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const arr = []
  //中序遍历可以直接将一个搜索二叉树转为一个升序数组
  const dfs = (root) => {
    if (root == null) return
    dfs(root.left)
    arr.push(root.val)
    dfs(root.right)
  }
  dfs(root)
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] >= arr[i]) {
      return false
    }
  }
  return true
}
//11.对称二叉树
//给你一个二叉树的根节点 root ， 检查它是否轴对称。
//思路：需要比较二叉树的内侧和外侧的节点是否一样
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const compare = (left, right) => {
    //递归结束条件
    if ((left !== null && right == null) || (left == null && right !== null)) {
      //其中有一侧为空一侧不为空，不对称
      return false
    } else if (left == null && right == null) {
      //两侧都为空，对称
      return true
    } else if (left.val !== right.val) {
      //都不为空，但数值不等，不对称
      return false
    }
    let outside = compare(left.left, right.right) //外侧比较的结果
    let inside = compare(left.right, right.left) //内侧比较的结果
    return outside && inside //内外都对称，则该左右子树对称
  }
  return compare(root.left, root.right)
}
//12.二叉树最大深度
//给定一个二叉树，找出其最大深度。
//思路：
/**
 * @param {TreeNode} root
 * @return {number}
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (root === null) {
    //递归终止条件，深度为0
    return 0
  }
  //递归求左右子树最大深度
  let left = maxDepth(root.left)
  let right = maxDepth(root.right)
  //每次递归返回左右子树中最大深度
  return Math.max(left, right) + 1
}
//13.二叉树的最小深度
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (root == null) {
    //遍历到叶子节点的下级，此时深度为0
    return 0
  }
  // 只有右节点时 递归右节点 因为是最小深度，所以要区分只有左子树和只有右子树的情况
  if (!root.left) return 1 + minDepth(root.right)
  // 只有左节点时 递归左节点
  if (!root.right) return 1 + minDepth(root.left)
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}
//13.从前序与中序遍历序列构造二叉树
//给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
//思路：切割代码
/* 第一步：如果数组大小为零的话，说明是空节点了。

第二步：如果不为空，那么取后序数组最后一个元素作为节点元素。

第三步：找到后序数组最后一个元素在中序数组的位置，作为切割点

第四步：切割中序数组，切成中序左数组和中序右数组 （顺序别搞反了，一定是先切中序数组）

第五步：切割后序数组，切成后序左数组和后序右数组

第六步：递归处理左区间和右区间 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length)
    //递归结束条件,当preorder和inorder均为空的时候说明已经到了空节点
    return null
  let root = new TreeNode(preorder[0]) //前序遍历第一个元素为当前节点
  let mid = inorder.indexOf(preorder.shift()) //找到preorder[0]在inorder中的位置
  //注意silce切割区间是 [1,3)左闭右开的区间
  root.left = buildTree(preorder, inorder.slice(0, mid)) //因为上边是shfit了，因此可以直接传preorder
  root.right = buildTree(preorder, inorder.slice(mid + 1))
  return root
}

//14.从中序与后序遍历序列构造二叉树
//思路：同上题
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (!inorder.length || !postorder.length) {
    //递归结束条件
    return null
  }
  let root = new TreeNode(postorder.pop())
  let mid = inorder.indexOf(root.val)
  root.left = buildTree(inorder.slice(0, mid), postorder.slice(0, mid)) //后序遍历的数组也能通过mid切割
  root.right = buildTree(inorder.slice(mid + 1), postorder.slice(mid))
  return root
}
//15.二叉树展开为链表
//给你二叉树的根结点 root ，请你将它展开为一个单链表：
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  //二叉树转为链表遵循前序遍历，即左子树生成的链表先接在root的右边，右子树生成的链表再接到左子树生成的链表后边
  //那么我们可以发现，对左右子树的处理不太一样
  //右子树：我们只需要获取头节点将其接到左子树的尾节点上
  //左子树：我们既需要获取头节点也需要获取尾节点供右子树链表接，尾节点可以通过一直获取右节点找到
  const helper = (root) => {
    if (root === null) return
    //生成右子树单链表
    if (root.right) {
      helper(root.right)
    }
    if (root.left) {
      const leftFirst = helper(root.left) //生成左子树单链表，并获取头节点
      let leftEnd = leftFirst
      while (leftEnd.right) {
        //一直找右节点，找到单链表的尾节点
        leftEnd = leftEnd.right
      }
      leftEnd.right = root.right //尾节点接右子树展平后的链表
      root.right = leftFirst //根节点right接左子树展平的链表
      root.left = null //根节点的left要置为null
    }
    return root
  }
  return helper(root)
}

//16.二叉树的最大路径和（hard）
//思路：递归求子树和
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  //需要初始化为负无穷，因为有的节点初始就是负的
  let max = -Infinity
  const dfs = (node) => {
    if (node === null) return 0
    //求左右节点路径最大值，如果小于0，就把这个路径舍去，小于0还不如不加
    const left = Math.max(0, dfs(node.left))
    const right = Math.max(0, dfs(node.right))
    //更新当前节点路径下，max的最大值， 如果初始化的时候max不为负无穷，加上初始就是负的节点，那这快max就一个为0了
    max = Math.max(left + right + node.val, max)
    //返回左右节点中路径大的值
    return Math.max(left, right) + node.val
  }
  dfs(root)
  return max
}

//17.把二叉搜索树转换为累加树
//思路：二叉搜索树的中序遍历，访问的节点值是递增的。如果先访问右子树，反向的中序遍历，访问的节点值是递减的，之前访问的节点值都比当前的大，每次累加给 sum 即可。
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
  let sum = 0
  const dfs = (root) => {
    if (root == null) return
    dfs(root.right) //要先进右子树
    sum += root.val
    root.val = sum
    dfs(root.left)
  }
  dfs(root)
  return root
}
//18.二叉树的直径
//给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let max = 0
  const dfs = (node) => {
    if (node === null) {
      return 0
    }
    const left = dfs(node.left)
    const right = dfs(node.right)
    //当前节点左右子树的最大深度相加就是当前节点的直径
    max = Math.max(max, left + right)
    //返回当前节点的最大深度，作为其上层节点的左子树或者右子树的值
    return Math.max(left, right) + 1
  }
  dfs(root)
  return max
}

//19.合并二叉树
//给你两棵二叉树： root1 和 root2 。想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  // 如果一棵树有，另一棵树没有，接上去
  if (root1 == null) return root2
  if (root2 == null) return root1
  return new TreeNode( //new一个node 的原因是要返回一个新的树
    // 两棵树都有的节点，叠加节点值
    root1.val + root2.val,
    // 递归合并左右子树
    mergeTrees(root1.left, root2.left),
    mergeTrees(root1.right, root2.right)
  )
}

//20.将有序数组转为二叉搜索树
//给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  //搜索二叉树的根节点在数组的中间位置, 通过一个函数递归去构建树
  const create = (start, end) => {
    //开始指针已经小于结束指针了，说明没法构建树了，直接返回null
    if (end < start) return null
    const mid = Math.floor((start + end) / 2)
    const root = new TreeNode(nums[mid])
    root.left = create(start, mid - 1)
    root.right = create(mid + 1, end)
    return root //将构建好的root节点返回
  }
  return create(0, nums.length - 1)
}

//21.二叉搜索树中第k小个元素
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  //二叉搜索树的一个重要性质就是，中序遍历出来的数组是升序数组
  let res
  const dfs = (root) => {
    if (root === null) return
    dfs(root.left)
    if (--k === 0) {
      //注意需要是--k，因为第k小，从k开始减，减到k == 1时已经是第k小的了
      res = root.val
    }
    dfs(root.right)
  }
  dfs(root)
  return res
}

//22.二叉树的右视图
//给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  //直接层序遍历出来，遍历结果是分层的，取每层最后一个元素或者第一个元素就是右视图或者左视图了
  const res = []
  const rootArr = []
  const dfs = (node, depth) => {
    if (node === null) return
    if (!rootArr[depth]) {
      rootArr[depth] = []
    }
    dfs(node.left, depth + 1)
    rootArr[depth].push(node.val)
    dfs(node.right, depth + 1)
  }
  dfs(root, 0)
  for (let i = 0; i < rootArr.length; i++) {
    res.push(rootArr[i].pop())
  }
  return res
}
