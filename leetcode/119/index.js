/**
 * Pascal's Triangle II
 * 下标从0开始的 
 */

const getRow = function (rowIndex) {
  if (rowIndex < 0) {
    return []
  }
  if (rowIndex === 0) {
    return [1]
  }
  if (rowIndex === 1) {
    return [1, 1]
  }
  const temp = [1, 1]

  for (let i = 2; i <= rowIndex; i++) {
    temp[i] = 1
    for (let j = i - 1; j > 0; j--) {
      temp[j] = temp[j] + temp[j - 1]
    }
  }
  return temp
}

console.log(getRow(3))