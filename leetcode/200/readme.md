# JavaScript刷LeetCode -- 200.Number of Islands

#### 一、题目

  Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

#### 二、题目大意

  给定一个二维数组，其中1表示陆地，0表示水域，当多个陆地上下左右方向相邻时，被认为是一个岛屿，让我们找出岛屿的个数。

#### 三、解题思路

  这种关于图的题目，大部分可以通过DFS或者BFS解决。

  这道题中，当我们遇到一块陆地时（也就是元素为1时），通过DFS不断查看它相邻区域是否为陆地，从而找出这个岛屿包含多少陆地，并且把相应的陆地做上标记，确保每个岛屿只计算一次，这里做标记的技巧就是将原先的陆地转换为水域，也就是将1转换为0。

#### 四、实现代码

```JavaScript
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
```

