/**
 * Pascal's Triangle
 */
const generate = function (numRows) {
  const result = [
    [1],
    [1, 1]
  ]
  if (numRows < 1) {
    return []
  }
  if (numRows === 1) {
    return [[1]]
  }
  if (numRows === 2) {
    return result
  }

  for (let i = 3; i <= numRows; i++) {
    const temp = [1]
    const pre = result[i - 2]
    for (let j = 1; j <= pre.length - 1; j++) {
      temp[j] = pre[j - 1] + pre[j]
    }
    temp.push(1)
    result.push(temp)
  }
  return result
}

console.log(generate(5))