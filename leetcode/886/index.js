const possibleBipartition = (N, dislikes) => {
  // 构建图
  const graph = new Array(N)
  for (let [x, y] of dislikes) {
    const x1 = x - 1
    const y1 = y - 1
    if (!graph[x1]) {
      graph[x1] = []
    }
    if (!graph[y1]) {
      graph[y1] = []
    }
    graph[x1].push(y1)
    graph[y1].push(x1)
  }
  const colors = new Array(N)
  for (let i = 0; i < colors.length; i++) {
    if (!colors[i] && !dfs(i, 1)) {
      return false
    }
  }
  return true

  function dfs (cur, color) {
    colors[cur] = color
    if (!graph[cur]) {
      return true
    }
    for (let item of graph[cur]) {
      if (colors[item] === color) {
        return false
      }
      if (!colors[item] && !dfs(item, -color)) {
        return false
      }
    }
    return true
  }
}

console.log(possibleBipartition(4, [[1,2],[1,3],[2,4]]), true)
console.log(possibleBipartition(3, [[1,2],[1,3],[2,3]]), false)
console.log(possibleBipartition(1, []), true)