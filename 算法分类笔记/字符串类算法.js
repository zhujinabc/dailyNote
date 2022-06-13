//1.最长回文子串
//采用中心扩散法
/**
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
    let res = s[0] || ''
    for(let i=0;i<s.length;i++){
        for(let j=1;j<=2;j++){//判断奇偶
            let left=i, right = i+j
            while(left>=0 && right<s.length && s[left]==s[right]){
                left--
                right++
            }
            let len = (right -1) - (left + 1) + 1 //当前回文的长度
            if(len > res.length){
                res = s.substr(left+1, len)
            }
        }
    }
    return res
};
//2.最长公共前缀
// 用数组第一个元素来作为指针遍历
/**
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function(strs) {
    let res = strs[0]
    if(strs.length === 1) return strs[0]
    for(let i = 1;i<strs.length; i++){
        for(let j =0;j< res.length; j++){
            if(res[j] != strs[i][j]){
                res = res.slice(0,j)
                break
            }
        }
    }
    return res
};
//3.无重复最长子串
//给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function (s) {
	let l = 0; // 定义左指针
	let res = 0; // 结果
	let map = new Map(); // 存放字符和对应下标
	for (let r = 0; r < s.length; r++) {
		// 如果出现了重复字符，则把左指针移到重复字符的下一位。注意同时满足重复字符的索引大于左指针。
		if (map.has(s[r]) && map.get(s[r]) >= l) {
			l = map.get(s[r]) + 1;
		}
		res = Math.max(res, r - l + 1); // 计算结果
		map.set(s[r], r); // 存下每个字符的下标
	}
	return res;//别忘了加上 满足重复字符的索引大于左指针（&& map.get(s[r]) >= l） 这个附加条件，不然就会出错。比如 abbcdea这个 case，在遍历到最后一个字符 a 的时候，如果没有加上这个条件，最后一个 a 也会被认为是重复字符，从而产生错误。
};
//4.大数相加
function add(a ,b){
    //取两个数字的最大长度
    let maxLength = Math.max(a.length, b.length);
    //用0去补齐长度
    a = a.padStart(maxLength , 0);//"0009007199254740991"
    b = b.padStart(maxLength , 0);//"1234567899999999999"
    //定义加法过程中需要用到的变量
    let t = 0;
    let f = 0;   //"进位"
    let sum = "";
    for(let i=maxLength-1 ; i>=0 ; i--){
       t = parseInt(a[i]) + parseInt(b[i]) + f;
       f = Math.floor(t/10);
       sum = t%10 + sum;
    }
    if(f == 1){
       sum = "1" + sum;
    }
    return sum;
 }
 //5.判断子序列
 //给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 //思路：采用双指针遍历两个字符串
 /**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let i = 0, j=0
    while(i<s.length && j<t.length){
        if(s[i] == t[j]){
            i++
        }
        j++
    }
    return i == s.length
};
//6.实现一个正则表达式（hard）
//给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
 var isMatch = function (s, p) {
    const n = s.length, m = p.length;
    function dfs(i, j) {
        if (i === n && j === m) return true;//如果匹配到最后都相等，那就返回true
        if (i > n || j >= m) return false;//如果i或者j超出了字符长度，说明没匹配上返回false
        const isSame = p[j] === '.' || s[i] === p[j];//比较第一个字符是否相等'.'匹配任意字符
        if (p[j + 1] === '*') return isSame &&dfs(i + 1, j) || dfs(i, j + 2);//如果下一个字符有模式*，分两种情况
        //第一种情况：s*匹配0个字符
      //第二种情况：s*匹配1个字符，递归下去，用来表示s*匹配多个s*
        return isSame && dfs(i + 1, j + 1);
    }
    return dfs(0, 0);
};