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
 */
const minFallingPathSum1 = () => {
}

console.log(minFallingPathSum([[1,2,3],[4,5,6],[7,8,9]]), 12)
console.log(minFallingPathSum1([[1,2,3],[4,5,6],[7,8,9]]), 12)