//一。链表大类
//1。回文链表
//给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
//用快慢指针遍历链表, 遍历过程中翻转前半部分连边，接着比较前后部分链表，如果完全一样就是回文链表
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let fast = (slow = head);
  let pre;
  //采用一个快指针和一个慢指针，快指针是慢指针的两倍，
  //那快指针遍历完的时候，慢指针刚好在中点
  //遍历完pre就是左半边链表的头节点，slow是右半边链表的头节点
  while (fast && fast.next) {
    fast = fast.next.next;
    const temp = slow.next;
    slow.next = pre;
    pre = slow;
    slow = temp;
  }
  //遍历完如果fast还在链表中，证明链表长度是奇数，这个时候slow正好在中间
  //需要将slow往后移一个位置才能进行回文遍历
  if (fast) {
    slow = slow.next;
  }
  while (pre && slow) {
    if (pre.val !== slow.val) {
      return false;
    }
    pre = pre.next;
    slow = slow.next;
  }
  return true;
};
//2.翻转链表
//采用两个指针，只需要把cur指针指向pre，然后把cur和pre往前移动即可，当然中间需要用一个变量next保存cur.next，cur指针指向pre后链表会断掉
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let cur = head,
    pre = null,
    next;
  while (cur) {
    next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};
//3.删除链表的倒数第 N 个结点
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  //需要新增一个节点的原因是会存在[1]然后删除倒数1个节点，返回[]的用例
  //不新增会报错
  const newHead = new ListNode();
  newHead.next = head;
  let fast = (slow = newHead);
  //用快慢指针，快指针先走n步，然后快慢指针再一起走，当快指针到达尾部的时候
  //慢指针就在该删除的位置了
  while (n > 0) {
    fast = fast.next;
    n--;
  }
  while (fast.next !== null) {
    //注意需要是!== null而不能写成!fast.next
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return newHead.next;
};
//4.合并k个升序链表（hard）
//给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。
//思路：直接归并排序就好，本质就是将数组拆分到只有一个元素，再调用merge递归合并两个有序数组
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (!lists.length) return null;
  //采用归并排序
  return mergeList(lists, 0, lists.length - 1);
};
function mergeList(lists, start, end) {
  //说明只剩一个链表，将这个链表返回
  if (start === end) {
    return lists[start];
  }
  const mid = Math.floor((start + end) / 2);
  return merge(mergeList(lists, start, mid), mergeList(lists, mid + 1, end));
}
function merge(l1, l2) {
  const res = new ListNode();
  let cur = res;
  while (l1 && l2) {
    if (l1.val >= l2.val) {
      cur.next = l2;
      l2 = l2.next;
    } else {
      cur.next = l1;
      l1 = l1.next;
    }
    cur = cur.next;
  }
  cur.next = l1 ? l1 : l2;
  return res.next;
}
//5.k个一组翻转链表（hard）
//给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  //起始就是先将前k个翻转，然后递归进行后边的翻转
  let pre = new ListNode(0, head);
  let p = (cur = head);
  let temp;
  //判断链表是否满足翻转条件，不满足直接返回head
  for (let i = 0; i < k; i++) {
    if (p === null) {
      return head;
    }
    p = p.next;
  }
  for (let j = 0; j < k; j++) {
    temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  console.log(pre);
  //继续递归翻转下k个元素, 注意这块需要用head去连接，因为已经翻转过来了
  //head变成了以翻转链表的尾部了，如1->2->3->4->5转为1<-2<-3 4->5，这个时候3是pre，4是cur
  head.next = reverseKGroup(cur, k);
  return pre;
};
//6.环形链表
//给你一个链表的头节点 head ，判断链表中是否有环。
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  //用一个set去存链表地址，如果遍历过程中，发现遍历的地址存在于set中
  //那么说明这是一个环形链表
  const set = new Set();
  while (head) {
    if (set.has(head)) {
      return true;
    }
    set.add(head);
    head = head.next;
  }
  return false;
};
//7.环形链表2
//给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  const set = new Set();
  while (head) {
    if (set.has(head)) {
      return head;
    }
    set.add(head);
    head = head.next;
  }
  return null;
};
//双指针法
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head,
    fast = head;
  while (fast) {
    if (fast.next === null) {
      //说明fast走出链表，无环返回null
      return null;
    }
    slow = slow.next; //慢指针走一步
    fast = fast.next.next; //快指针走两步
    if (fast === slow) {
      //第一次相遇在首次相遇点
      fast = head; //将快指针重置，开启循环，让快慢指针在入环点相遇
      while (true) {
        if (fast === slow) {
          //再次相遇，在入环点
          return slow;
        }
        fast = fast.next;
        slow = slow.next;
      }
    }
  }
  return null;
};
//8.排序链表
//归并算法思路:比如有链表长度是 8，将 8 分成左右各 4 个，再将 4 个分成左右各 2 个，再将 2 个分成左右各 1 个，数量为 1 以后，
//再 return 回去左右两个链表合并排序后的结果
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  //如果只剩一个节点，停止分割
  if (!head || !head.next) return head;
  //归并的切割，用快慢指针来
  let fast = head,
    slow = head;
  let preSlow = null;
  while (fast && fast.next) {
    preSlow = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  //preSlow的作用是将链表剪断
  preSlow.next = null;
  return merge(sortList(head), sortList(slow));
};

//merge起始就是合并两个有序链表
function merge(l1, l2) {
  let res = new ListNode();
  let cur = res;
  while (l1 && l2) {
    if (l1.val >= l2.val) {
      cur.next = l2;
      l2 = l2.next;
    } else {
      cur.next = l1;
      l1 = l1.next;
    }
    cur = cur.next;
  }
  cur.next = l1 ? l1 : l2;
  return res.next;
}
//9.合并两个有序链表
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const newHead = new ListNode();
  let cur = newHead;
  //两个链表一起遍历，比大小
  while (list1 && list2) {
    if (list1.val >= list2.val) {
      cur.next = list2;
      list2 = list2.next;
    } else {
      cur.next = list1;
      list1 = list1.next;
    }
    cur = cur.next;
  }
  cur.next = l1 ? l1 : l2;
  return newHead.next;
};
//10.相交链表
//给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  //用一个set去存一个链表遍历的值，遍历另一个链表，
  //如果遍历的值在set中，说明这个节点就是相交点返回这个节点
  const set = new Set();
  while (headA) {
    set.add(headA); //注意这块存入的是链表节点地址，因为相交是地址一样
    headA = headA.next;
  }
  while (headB) {
    if (set.has(headB)) {
      return headB;
    }
    headB = headB.next;
  }
  return null;
};

//11.两数相加
/* 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const head = new ListNode();
  let cur = head,
    addNum = 0;
  while (l1 || l2 || addNum) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + addNum;
    addNum = sum >= 10 ? 1 : 0;
    cur.next = new ListNode(sum % 10);
    cur = cur.next;
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  return head.next;
};

//12.两两交换链表中的节点
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  const newHead = new ListNode(0, head);
  let temp = newHead;
  while (temp.next !== null && temp.next.next !== null) {
    let pre = temp.next;
    let cur = temp.next.next;
    //将temp下一个指为cur
    temp.next = cur;
    //将pre换到cur的位置上
    pre.next = cur.next;
    //将cur的next置为pre，这个时候已经是cur -> pre了
    cur.next = pre;
    temp = pre;
  }
  return newHead.next;
};

//13.随机链表的复制
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (!head) return head;
  //题意起始就是要复制一个链表，因为是深拷贝，所以需要新建节点，用一个map存新建的节点
  const map = new Map();
  let cur = head;
  //遍历，将新节点存入map
  while (cur !== null) {
    map.set(cur, new Node(cur.val)); //这里只用val，random这时还是指向旧的节点
    cur = cur.next;
  }
  //重新遍历，将新节点的next和random都指向新的节点
  cur = head;
  while (cur !== null) {
    map.get(cur).next = map.get(cur.next) || null;
    map.get(cur).random = map.get(cur.random) || null;
    cur = cur.next;
  }
  return map.get(head);
};

//14.删除排序链表中的重复元素
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let p = head;
  //p && p.next保证有下两个元素
  while (p && p.next) {
    //如果相邻的两个元素值相等，直接跳过相等的值，相当于删掉相等的值
    if (p.val === p.next.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return head;
};
