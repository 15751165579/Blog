# JavaScript刷LeetCode -- 807.Max Increase to Keep City Skyline

#### 一、题目

  In a 2 dimensional array grid, each value grid[i][j] represents the height of a building located there. We are allowed to increase the height of any number of buildings, by any amount (the amounts can be different for different buildings). Height 0 is considered to be a building as well. 

  At the end, the "skyline" when viewed from all four directions of the grid, i.e. top, bottom, left, and right, must be the same as the skyline of the original grid. A city's skyline is the outer contour of the rectangles formed by all the buildings when viewed from a distance. See the following example.

  What is the maximum total sum that the height of the buildings can be increased?

#### 二、题目大意

  给定一个二维数组，数组中的元素表示建筑物的高度，请问如何最大限度的增加建筑物们的高度，并且使得四个方向的“天际线”与之前一样。

#### 三、解题思路

  这道题目的解题思路很清晰，就是给每个建筑物添加最大的高度，而高度得保证比水平和垂直方向的最大高度都小。

#### 四、代码实现

```JavaScript
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
```