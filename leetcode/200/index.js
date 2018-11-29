const numIslands = (grid) => {
  const h = grid.length
  let result = 0
  if (h <= 0) {
    return result
  }
  const w = grid[0].length
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (grid[i][j] === '1') {
        result++
        dfs(grid, i, j, w, h)
      }
    }
  }
  return result
  function dfs (grid, i, j, w, h) {
    // 边界条件
    if (i < 0 || j < 0 || i > h - 1 || j > w - 1 || grid[i][j] === '0') {
      return
    }
    grid[i][j] = '0'
    dfs(grid, i + 1, j, w, h)
    dfs(grid, i - 1, j, w, h)
    dfs(grid, i, j + 1, w, h)
    dfs(grid, i, j - 1, w, h)
  }
}

const testcase = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]

console.log(numIslands(testcase))