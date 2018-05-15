/**
 * 84、Largest Rectangle in Histogram
 */
const testcase = [2, 1, 5, 6, 2, 3]
const largestRectangleArea = function (heights) {
  const len = heights.length
  if (len === 0) {
    return 0
  }
  const positionStack = []
  let i = 0
  let maxArea = 0

  while (i < len) {
    const psl = positionStack.length
    if (psl === 0 || heights[i] >= heights[positionStack[psl - 1]]) {
      positionStack.push(i++)
    } else {
      const position = positionStack.pop()
      const height = heights[position]
      const psl = positionStack.length
      const weight = psl === 0 ? i : i - positionStack[psl - 1] - 1
      maxArea = Math.max(maxArea, weight * height)
    }
  }

  while (positionStack.length !== 0) {
    const position = positionStack.pop()
    const height = heights[position]
    const psl = positionStack.length
    const weight = psl === 0 ? i : i - positionStack[psl - 1] - 1
    maxArea = Math.max(maxArea, weight * height)
  }
  return maxArea
}

console.log(largestRectangleArea(testcase))