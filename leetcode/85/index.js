/**
 * 85、Maximal Rectangle
 * 注意： 数组中的是字符串。
 */
const testcase = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]

const maximalRectangle = function (matrix) {
  const len = matrix.length
  if (len === 0) {
    return 0
  }
  let result = 0
  let chart = matrix[0]
  result = Math.max(result, largestArea(chart))
  for (let i = 1; i < len; i++) {
    const nextItem = matrix[i]
    for (let j = 0, max = nextItem.length; j < max; j++) {
      if (nextItem[j] === '0') {
        chart[j] = 0
      } else {
        chart[j] = parseInt(chart[j]) + 1
      }
    }
    result = Math.max(result, largestArea(chart))
  }

  function largestArea (list) {
    const len = list.length
    if (len === 0) {
      return 0
    }
    const positionStack = []
    let i = 0
    let maxArea = 0
    while (i < len) {
      const psl = positionStack.length
      if (psl === 0 || list[i] >= list[positionStack[psl - 1]]) {
        positionStack.push(i++)
      } else {
        const position = positionStack.pop()
        const height = list[position]
        const psl = positionStack.length
        const weight = psl === 0 ? i : i - positionStack[psl - 1] - 1
        maxArea = Math.max(maxArea, height * weight)
      }
    }

    while (positionStack.length !== 0) {
      const position = positionStack.pop()
      const height = list[position]
      const psl = positionStack.length
      const weight = psl === 0 ? i : i - positionStack[psl - 1] - 1
      maxArea = Math.max(maxArea, height * weight)
    }
    return maxArea
  }
  return result
}

console.log(maximalRectangle(testcase))