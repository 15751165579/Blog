/**
 * Min Stack
 */
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  let min = Infinity
  const a = this.stack
  const max = a.length
  for (let i = 0; i < max; i++) {
    const item = a[i]
    min = min > item ? item : min
  }
  return min
};

const m = new MinStack()

console.log([m.push(-2), m.push(0), m.push(-3), m.getMin(), m.pop(), m.top(), m.getMin()])
