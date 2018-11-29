const maxIncreaseKeepingSkyline = (grid) => {
  let ans = 0
  const row = grid.length
  if (row <= 0) {
    return ans
  }
  const col = grid[0].length

  const vMax = []

  for (let i = 0; i < col; i++) {
    let max = Number.MIN_SAFE_INTEGER
    for (let j = 0; j < row; j++) {
      max = Math.max(max, grid[j][i])
    }
    vMax.push(max)
  }

  const hMax = []

  for (let i = 0; i < row; i++) {
    let max = Number.MIN_SAFE_INTEGER
    for (let j = 0; j < col; j++) {
      max = Math.max(max, grid[i][j])
    }
    hMax.push(max)
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const min = Math.min(vMax[i], hMax[j])
      ans += (min - grid[i][j])
    }
  }
  return ans
}

console.log(maxIncreaseKeepingSkyline([[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]), 35)