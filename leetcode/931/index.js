/**
 * DFS超时
 */
const minFallingPathSum = (A) => {
  const h = A.length
  const w = A.length
  let ans = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < w; i++) {
    dfs(A, 1, i, A[0][i])
  }
  return ans

  function dfs (A, j, i, start) {
    if (j > h - 1) {
      ans = Math.min(ans, start)
      return false
    }
    if (i === 0) {
      dfs(A, j + 1, i, start + A[j][i])
      dfs(A, j + 1, i + 1, start + A[j][i + 1])
    } else if (i === w - 1) {
      dfs(A, j + 1, i, start + A[j][i])
      dfs(A, j + 1, i - 1, start + A[j][i - 1])
    } else {
      dfs(A, j + 1, i, start + A[j][i])
      dfs(A, j + 1, i - 1, start + A[j][i - 1])
      dfs(A, j + 1, i + 1, start + A[j][i + 1])
    }
  }
}

/**
 * 动态规划
 * mn
 * 仍然有优化的地方 以为空间存储dp 
 */
const minFallingPathSum1 = (A) => {
  const h = A.length
  if (h <= 0) {
    return 0
  }
  const w = A[0].length
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (i === 0) {
        continue
      }
      let min = A[i - 1][j]
      if (j - 1 >= 0) {
        min = Math.min(min, A[i - 1][j - 1])
      }
      if (j + 1 < w) {
        min = Math.min(min, A[i - 1][j + 1])
      }
      A[i][j] = min + A[i][j]
    }
  }
  return Math.min.apply(this, A[h - 1])
}

console.log(minFallingPathSum([[1,2,3],[4,5,6],[7,8,9]]), 12)
console.log(minFallingPathSum1([[1,2,3],[4,5,6],[7,8,9]]), 12)