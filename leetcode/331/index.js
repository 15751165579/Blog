/**
 * 1、最后一个一定是#
 * 2、数字总是比#少一个
 */
/* eslint-disable */
const isValidSerialization = preorder => {
  const a = preorder.split(',')
  let diff = 1
  for (let item of a) {
    diff -= 1
    if (diff < 0) {
      return false
    }
    if (item !== '#') {
      diff += 2
    } 
  }
  return diff === 0
}