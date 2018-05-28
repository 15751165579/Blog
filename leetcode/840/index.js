/**
 * 矩阵中的幻方
 */

const test = [
  [4, 3, 8, 4],
  [9, 5, 1, 9],
  [2, 7, 6, 3]
]

const numMagicSquaresInside = function (grid) {
  let result = 0
  for (let i = 0; i < grid.length - 2; i++) {
    const row = grid[i]
    for (let j = 0; j < row.length - 2; j++) {
      const item = [
        [grid[i][j], grid[i][j + 1], grid[i][j + 2]],
        [grid[i + 1][j], grid[i + 1][j + 1], grid[i + 1][j + 2]],
        [grid[i + 2][j], grid[i + 2][j + 1], grid[i + 2][j + 2]]
      ]
      if (isMagic(item)) {
        result++
      }
    }
  }
  return result
  function isMagic (nums) {
    const x1 = nums[0][0]
    const x2 = nums[0][1]
    const x3 = nums[0][2]
    const y1 = nums[1][0]
    const y2 = nums[1][1]
    const y3 = nums[1][2]
    const z1 = nums[2][0]
    const z2 = nums[2][1]
    const z3 = nums[2][2]
    if (!((x1 >= 1 && x1 <= 9) && (x2 >= 1 && x2 <= 9) && (x3 >= 1 && x3 <= 9))) {
      return false
    }
    if (!((y1 >= 1 && y1 <= 9) && (y2 >= 1 && y2 <= 9) && (y3 >= 1 && y3 <= 9))) {
      return false
    }
    if (!((z1 >= 1 && z1 <= 9) && (z2 >= 1 && z2 <= 9) && (z3 >= 1 && z3 <= 9))) {
      return false
    }
    const row1 = nums[0][0] + nums[0][1] + nums[0][2]
    const row2 = nums[1][0] + nums[1][1] + nums[1][2]
    const row3 = nums[2][0] + nums[2][1] + nums[2][2]
    const col1 = nums[0][0] + nums[1][0] + nums[2][0]
    const col2 = nums[0][1] + nums[1][1] + nums[2][1]
    const col3 = nums[0][2] + nums[1][2] + nums[2][2]
    const x = nums[0][0] + nums[1][1] + nums[2][2]
    const y = nums[0][2] + nums[1][1] + nums[2][0]

    return (row1 === row2 && row2 === row3 && row3 === col1 && col1 === col2 && col2 === col3 && col3 === x && x === y)
  }
}

console.log(numMagicSquaresInside(test), 1)