//1.有效括号
//给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2) return false;
  const stack = [];
  for (let item of s) {
    //采用栈来做
    switch (item) {
      case '(':
      case '{':
      case '[':
        stack.push(item);
        break;
      case ')':
        if (stack.pop() !== '(') return false;
        break;
      case '}':
        if (stack.pop() !== '{') return false;
        break;
      case ']':
        if (stack.pop() !== '[') return false;
        break;
    }
  }
  return !stack.length;
};

//2.最长有效括号（困难）
//给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  // 这个还是用栈来写会好理解一点
  // 这里之所以初始化成-1是因为，数组起始下标是0，计算长度需要加1， 减-1即为加1
  const stack = [-1];
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i); //入栈，存入字符串下标
    } else {
      stack.pop(); // 出栈
      if (stack.length) {
        // 计算子串长度用的是 当前下标 - 去栈顶下标值
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      } else {
        //如果当前栈已经空了，说明要计算下一子串了，将当前下标push进去，作为下
        //一子串长度的被减数
        stack.push(i);
      }
    }
  }
  return maxLen;
};

//3. 字符串解码
//给定一个经过编码的字符串，返回它解码后的字符串。
//编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const numStack = []; //存入倍数栈
  const strStack = []; //存入字符串的栈
  let str = ''; //暂存字符串，入栈后清空
  let num = 0; //暂存倍数，入栈后清空
  for (let item of s) {
    if (!isNaN(item)) {
      // 计算倍数，有可能是多位数如32，所以需要这样计算
      num = num * 10 + Number(item);
    } else if (item === '[') {
      numStack.push(num);
      strStack.push(str);
      str = '';
      num = 0;
    } else if (item === ']') {
      const repeatNum = numStack.pop();
      //构造[]内的子串
      str = strStack.pop() + str.repeat(repeatNum);
    } else {
      str += item;
    }
  }
  return str;
};

//4.每日温度
// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = [];
  //因为是比较当前元素的右侧元素，所以可以使用单调栈来解
  // 什么时候用单调栈： 通常是一维数组，要寻找任一元素右边（左边）第一个比自己大（小）的元素
  // 要求时间复杂度是O(n)
  // 单调递增和单调递减栈两种，单调递减栈会剔除波谷留下波峰，单调递增栈会剔除波峰留下波谷
  for (let i = temperatures.length - 1; i >= 0; i--) {
    // 如果当前元素大于栈顶元素将其出栈，直至遇到比当前元素大的元素
    while (
      stack.length &&
      temperatures[i] >= temperatures[stack[stack.length - 1]]
    ) {
      stack.pop();
    }
    //如果栈不为空，说明存在比当前元素大的元素，可以计算距离
    if (stack.length) {
      res[i] = stack[stack.length - 1] - i;
    }
    stack.push(i);
  }
  return res;
};

//5. 柱状图中最大矩形（困难）
//给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
//求在该柱状图中，能够勾勒出来的矩形的最大面积。

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  //用一个单调递增栈去存数组下标，遇到高的就入栈，此时不计算面积
  let maxArea = 0;
  heights = [0, ...heights, 0];
  const stack = [];
  for (let i = 0; i < heights.length; i++) {
    //遇到比栈顶元素小的需要计算面积，并且将栈顶大的元素出栈，保持栈的单调递增
    while (heights[i] < heights[stack[stack.length - 1]]) {
      // 计算完将栈顶元素出栈
      const index = stack.pop();
      // 更新最大值，面积为
      //距离：i - stack[stack.length - 1] - 1 之所以会再减1是因为，栈顶元素已经被出栈了，此时减的距离会多1
      //高为 heights[stack[stack.length - 1]]
      maxArea = Math.max(
        maxArea,
        heights[index] * (i - stack[stack.length - 1] - 1)
      );
    }
    stack.push(i);
  }
  return maxArea;
};

//6.最小栈
//设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
//实现 MinStack 类:
//MinStack() 初始化堆栈对象。
//void push(int val) 将元素val推入堆栈。
//void pop() 删除堆栈顶部的元素。
//int top() 获取堆栈顶部的元素。
//int getMin() 获取堆栈中的最小元素。
var MinStack = function () {
  this.stack = [];
  //维护一个最小值组成的栈
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  //每次入栈的时候也要判断下最小值，如果小于最小值，最小值栈里也需要入栈
  if (this.minStack.length === 0 || val <= this.getMin()) {
    this.minStack.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const out = this.stack.pop();
  //如果出栈元素为最小元素，最小栈也出栈
  if (out === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};
