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
//层序遍历（深度优先，递归）
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
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var invertTree = function(root) {
    if(root == null){
        return root
    }else{
        [root.left, root.right] = [invertTree(root.right),invertTree(root.left)]
        return root
    }
};

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
//4.路径总和三
//给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
//思路：因为不限定从根节点开始和叶子节点结束，因此我们需要从不同节点开始遍历
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
 var pathSum = function(root, targetSum) {
    if(!root) return 0
    let res = 0
    const dfs = (root, targetSum) => {
        if(!root) return 
        if(targetSum - root.val === 0) res++
        dfs(root.left, targetSum - root.val)
        dfs(root.right, targetSum - root.val)
    }
    dfs(root, targetSum)
    res += pathSum(root.left, targetSum)//已其他节点为根节点继续递归遍历
    res += pathSum(root.right, targetSum)
    return res
};

//5.给定二叉搜索树（BST）的根节点 root 和一个整数值 val。你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null 。
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */  //BST的性质：左子树都小于根节点值，右子树都大于根节点值
 var searchBST = function(root, val) {
    if(root == null) return null //如果到叶子节点了
    if(root.val == val){ //如果找到该节点，返回该节点
        return root
    }
    if (root.val > key)//所谓搜索树是有方向的，不加条件就是遍历整颗树
        let left = searchBST(root.left, val)
    if (root.val < key)
        let right = searchBST(root.right, val)//采用后续遍历root.right = deleteNode(root.right, key);
    // let left = searchBST(root.left, val)
    // let right = searchBST(root.right, val)//采用后续遍历
    return left || right
};
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
 var deleteNode = function(root, key) {
    if (root === null)//没有找到删除节点，返回空
        return root;
    if (root.val === key) {
        if (!root.left)//不存在左子树的情况
            return root.right;
        else if (!root.right)//不存在右子树的情况
            return root.left;
        else {//左右子树均存在的情况
            let cur = root.right;
            while (cur.left) {//找出删除节点右子树中最小左节点
                cur = cur.left;
            }
            cur.left = root.left;//把删除节点左子树挂到右子树最下左节点下
            return root.right;//返回右子树
        }
    }
    if (root.val > key)//所谓搜索树是有方向的，不加条件就是遍历整颗树
        root.left = deleteNode(root.left, key);
    if (root.val < key)
        root.right = deleteNode(root.right, key);
    // root.left = deleteNode(root.left, key);
    // root.right = deleteNode(root.right, key);
    return root;
};
//7.二叉搜索树中的插入
//给定二叉搜索树（BST）的根节点 root 和要插入树中的值 value ，将值插入二叉搜索树。
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
 var insertIntoBST = function(root, val) {
    if(root == null){//只需要遍历当前bst树，找到为空的节点，把值插入就好了
        return new TreeNode(val)
    }
    if(root.val < val){
        root.right = insertIntoBST(root.right, val)
    }
    if(root.val > val){
        root.left = insertIntoBST(root.left, val)
    }
    return root
};
//8.二叉树的锯齿形层序遍历
//层序遍历基础上，各行翻转
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var zigzagLevelOrder = function(root) {
    const res = []
    const bfs = (root, depth) => {
        if(root == null) return
        if(root !== null){
            if(!res[depth]){
                res[depth] = []
            }
        }
        bfs(root.left, depth + 1)
        depth % 2 == 1 ? res[depth].unshift(root.val) : res[depth].push(root.val)//奇数行翻转，从前边加入数组，偶数行正常从后边push进数组
        bfs(root.right, depth + 1)
    }
    bfs(root, 0)
    return res
};
//9.不同的二叉搜索树
//给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
//思路：采用动态规划来写
//j相当于是头结点的元素，从1遍历到i为止。所以递推公式：dp[i] += dp[j - 1] * dp[i - j]; ，j-1 为j为头结点左子树节点数量，i-j 为以j为头结点右子树节点数量
/**
 * @param {number} n
 * @return {number}
 */
 var numTrees = function(n) {
    const dp = new Array(n + 1).fill(0)//n+1的原因是0也算，所以如果n是5的话，数组长度应该是6
    dp[0] = 1//空节点定义上说也是一颗二叉树
    dp[1] = 1
    for(let i=2; i<= n; i++){
        for(let j= 1; j<= i; j++){
            dp[i] += dp[j-1]*dp[i-j]
        }
    }
    return dp[n]
};
//10.验证二叉搜索树
//给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
//二叉搜索树，左节点一定比右节点小，所以该问题可以简化为，将二叉树变成一个数组，然后判断该数组是否递增即可
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isValidBST = function(root) {
    const arr = []
    const dfs = (root) => {
        if(root == null) return 
        dfs(root.left)
        arr.push(root.val)
        dfs(root.right)
    }
    dfs(root)
    for(let i =1;i<arr.length; i++){
        if(arr[i-1]>=arr[i]){
            return false
        }
    }
    return true
};
//11.对称二叉树
//给你一个二叉树的根节点 root ， 检查它是否轴对称。
//思路：需要比较二叉树的内侧和外侧的节点是否一样
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isSymmetric = function(root) {
    const compare = (left, right) => {
        //递归结束条件
        if((left !== null && right == null) || (left == null && right !== null)){//其中有一侧为空一侧不为空，不对称
            return false
        }else if(left == null && right == null){//两侧都为空，对称
            return true
        }else if(left.val !== right.val){//都不为空，但数值不等，不对称
            return false
        }
        let outside = compare(left.left, right.right)//外侧比较的结果
        let inside = compare(left.right, right.left)//内侧比较的结果
        return outside && inside//内外都对称，则该左右子树对称
    }
    return compare(root.left, root.right)
};
//12.二叉树最大深度
//给定一个二叉树，找出其最大深度。
//思路：
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function(root) {
    if(root == null){//遍历到叶子节点的下级，此时深度为0
        return 0
    }
    let left = maxDepth(root.left)//逐层累加
    let right = maxDepth(root.right)
    return Math.max(left, right) + 1 //左右子树中深度大的加1
};
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
 var buildTree = function(preorder, inorder) {
    if(!preorder.length || !inorder.length)//递归结束条件,当preorder和inorder均为空的时候说明已经到了空节点
        return null;
    let root = new TreeNode(preorder[0]);//前序遍历第一个元素为当前节点
    let mid = inorder.indexOf(preorder.shift())//找到preorder[0]在inorder中的位置
    root.left = buildTree(preorder, inorder.slice(0,mid));//因为上边是shfit了，因此可以直接传preorder
    root.right = buildTree(preorder, inorder.slice(mid + 1));
    return root;
};

//14.从中序与后序遍历序列构造二叉树
//思路：同上题
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
 var buildTree = function(inorder, postorder) {
    if(!inorder.length || !postorder.length){//递归结束条件
        return null
    }
    let root = new TreeNode(postorder.pop())
    let mid = inorder.indexOf(root.val)
    root.left = buildTree(inorder.slice(0,mid), postorder.slice(0,mid))//后序遍历的数组也能通过mid切割
    root.right = buildTree(inorder.slice(mid+1), postorder.slice(mid))
    return root
};
//15.二叉树展开为链表
//给你二叉树的根结点 root ，请你将它展开为一个单链表：
//思路：对于当前节点，如果其左子节点不为空，则在其左子树中找到最右边的节点，作为前驱节点(pre)，将当前节点的右子节点赋给前驱节点的右子节点，然后将当前节点的左子节点赋给当前节点的右子节点，并将当前节点的左子节点设为空
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
 var flatten = function(root) {
    let cur = root
    while(cur !== null){//通过cur遍历
        if(cur.left){
            const next = cur.left//保存当前左字节点为next
            let pre = next
            while(pre.right !== null){//对左子树一直循环，直到找到最右边的字节点，即为pre
                pre = pre.right
            }
            pre.right = cur.right //将当前节点的右子节点赋给前驱节点的右子节点
            cur.right = next // 将当前节点的左子节点赋值给当前节点的右子节点
            cur.left = null //将当前节点的左子节点置为null
        }
        cur = cur.right
    }
};

//16.二叉树的最大路径和（hard）
//思路：递归求子树和
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxPathSum = function(root) {
    let res = -Infinity;//因为有的输入直接就是负数，所以需要初始化为负数
    const dfs = root => {
        // 递归终止条件
        if (!root) return 0;
        // 左右子树返回的路径和，若小于0则置0，表示舍去这条路径
        const left = Math.max(0, dfs(root.left));
        const right = Math.max(0, dfs(root.right));
        // 更新res
        res = Math.max(res, root.val + left + right);
        // 返回上一级递归，只能选左右子树中较大的那一条路径
        return Math.max(left, right) + root.val;
    };
  dfs(root);
  return res;
};

//17.把二叉搜索树转换为累加树
//思路：二叉搜索树的中序遍历，访问的节点值是递增的。如果先访问右子树，反向的中序遍历，访问的节点值是递减的，之前访问的节点值都比当前的大，每次累加给 sum 即可。
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var convertBST = function(root) {
    let sum = 0
    const dfs = (root) => {
        if(root == null) return
        dfs(root.right)//要先进右子树
        sum += root.val
        root.val = sum
        dfs(root.left)
    }
    dfs(root)
    return root
};
//18.二叉树的直径
//给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var diameterOfBinaryTree = function(root) {
    let max = 0
    const dfs = (root) => {
        if(root == null) return 0//访问到空节点，返回0
        let lefth = dfs(root.left)//左子树
        let righth = dfs(root.right)//右子树
        max = Math.max(max, lefth + righth)//更新max值
        return Math.max(lefth, righth) + 1//返回该节点为根的子树的深度
    }
    dfs(root)
    return max
};

//19.合并二叉树
//给你两棵二叉树： root1 和 root2 。想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
 var mergeTrees = function (root1, root2) {
    // 如果一棵树有，另一棵树没有，接上去
    if (root1 == null) return root2;
    if (root2 == null) return root1;
    return new TreeNode( //new一个node 的原因是要返回一个新的树
        // 两棵树都有的节点，叠加节点值
        root1.val + root2.val,
        // 递归合并左右子树
        mergeTrees(root1.left, root2.left),
        mergeTrees(root1.right, root2.right),
    )
  };
