const util = require('./util')
const lodash = require('lodash')

/**
 * 数组fill的出现
 * 
 * 声明数组的初始值
 */

console.log(Array(10).fill(0))

console.log([...Array(10)].map(ietm => 0))

