//1.有效括号
//给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
    if(s.length % 2) return false
    const stack = []
    for(let item of s){//采用栈来做
        switch(item){
            case '(':
            case '{':
            case '[':
                stack.push(item)
                break;
            case ')':
                if(stack.pop() !== '(') return false
                break;
            case '}':
                if(stack.pop() !== '{') return false
                break;
            case ']':
                if(stack.pop() !== '[') return false
                break;
        }
    }
    return !stack.length
};