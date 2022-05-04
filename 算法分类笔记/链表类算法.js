//一。链表大类
//1。给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
//用快慢指针遍历链表, 遍历过程中翻转前半部分连边，接着比较前后部分链表，如果完全一样就是回文链表
/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var isPalindrome = function(head) {
    let cur, newHead; // 记录翻转后的前半段链表
    let slow = head, fast = head; // 快慢指针对原链表进行遍历
    while(fast && fast.next) {
        cur = slow; // 准备开始下一次翻转，先记录准备要翻转的结点
        slow = slow.next; // 往后指
        fast = fast.next.next;
        cur.next = newHead; // 要翻转的新结点记录过来
        newHead = cur; // 赋值
    }
    // 如果上个循环 fast.next.next 还在链表内，说明是奇数，不清楚的可以画图，一下子豁然开朗
    if(fast) {
        slow = slow.next; // 奇数的话，前半部分 比 后半部分少一个，所以后半部分的 slow 指针要先往后指一位，才能开始下面的遍历
    }
    while(slow && newHead) {
        // 不同直接返回
        if(slow.val !== newHead.val) {
            return false;
        }
        slow = slow.next;
        newHead = newHead.next;
    }
    return true;
};
//2.翻转链表
//采用两个指针，只需要把cur指针指向pre，然后把cur和pre往前移动即可，当然中间需要用一个变量next保存cur.next，cur指针指向pre后链表会断掉
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
    let cur = head, pre = null, next
    while(cur){
        next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
};
//3.删除链表的倒数第 N 个结点
//思路：先移动偏移量n，n是要删除的倒数第n个数。然后，共同移动。目的，就是能找在一次循环中找到倒数第n个数的前一个位置即n-1
var removeNthFromEnd = function(head, n) {
    const res = new ListNode('')
    res.next = head
    let start = res
    let flag = 0
    let end = res
    while(flag < n){
        start = start.next
        flag ++ 
    }
    while(start.next !== null){
        start = start.next
        end = end.next
    }
    end.next = end.next.next
    return res.next
};
//4.合并k个升序链表（hard）
//给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。
var mergeKLists = function(lists) {
    return lists.reduce((p,n)=>{
        while(n){
            p.push(n)
            n = n.next
        }
        return p
    },[]).sort((a,b)=>a.val - b.val).reduceRight((p,n)=>{n.next = p; p=n; return p},null)
};
//5.k个一组翻转链表（hard）
//给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var reverseKGroup = function(head, k) {
    //用于进行链表转换
    let pre = null,cur = head;
    let p = head;
    //查找长度是否满足反转的数量
    for(let i = 0;i<k;i++){
        if(p == null) return head;
        p = p.next;
    }
    //对该k个链表元素进行反转
    for(let j = 0;j<k;j++){//向前反转，因此反转完head才是最后一个
        let temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    //反转后。head.next已经成为当前反转后链表的最后一个元素，它的指向将是下一个递归的开始点
    //而此时pre已经是最后一个元素，cur是下一个范围的第一元素
    head.next = reverseKGroup(cur,k);
    return pre;
};
//6.环形链表
//给你一个链表的头节点 head ，判断链表中是否有环。
//采用快慢指针法，如果有环快指针总归会遇到慢指针
/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var hasCycle = function(head) {
    let slow = head, fast = head
    while(fast && fast.next){
        fast = fast.next.next
        slow = slow.next
        if(slow == fast){
            return true
        }
    }
    return false
};
//7.环形链表2
//给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var detectCycle = function(head) {
    const visited = new Set();
    while (head !== null) {//终止条件，如果没有环 跳出循环
        if (visited.has(head)) {//如果存在重复的节点，这个节点就是入环节点
            return head;
        }
        visited.add(head);//将节点加入set中
        head = head.next;
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
 var sortList = function(head) {
    return toSortList(head, null)
};
//分割
const toSortList = (head, tail) => {
    if (head === null) {//极端情况
        return head;
    }
    if (head.next === tail) {//分割到只剩一个节点
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {//的到中间节点
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const mid = slow;
    return merge(toSortList(head, mid), toSortList(mid, tail));//分割区间 递归合并
}
//合并
const merge = (l1,l2) => {
    const newHead = new ListNode('')
    let cur = newHead
    while(l1 && l2){
        if(l1.val <= l2.val){
            cur.next = l1
            l1 = l1.next
        }else{
            cur.next = l2
            l2 = l2.next
        }
        cur = cur.next
    }
    cur.next = l1?l1:l2
    return newHead.next
}
//9.合并两个有序链表
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function(list1, list2) {
    let newHead = new ListNode('')
    let cur = newHead
        while(list1 && list2){
            if(list1.val <= list2.val){
                cur.next = list1
                list1 = list1.next
            }else{
                cur.next = list2
                list2 = list2.next
            }
            cur = cur.next
        }
        cur.next = list1?list1:list2
        return newHead.next
};
//10.相交链表
//给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
    const set = new Set()
    while(headA){
        set.add(headA)
        headA = headA.next
    }
    while(headB){
        if(set.has(headB)){
            return headB
        }
        headB = headB.next
    }
    return null
};  