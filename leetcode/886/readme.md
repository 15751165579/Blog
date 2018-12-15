# JavaScript刷LeetCode -- 886. Possible Bipartition

#### 一、题目

  Given a set of N people (numbered 1, 2, ..., N), we would like to split everyone into two groups of any size.

  Each person may dislike some other people, and they should not go into the same group. 

  Formally, if dislikes[i] = [a, b], it means it is not allowed to put the people numbered a and b into the same group.

  Return true if and only if it is possible to split everyone into two groups in this way.

#### 二、题目大意

  给定N个人，现在需要将这N个人分成两组，但是给定数组dislikes，规定哪些人不能在同一组，如果能够分成两组，那么就返回true，否则false.

#### 三、解题思路

  这是一道二分图的问题，采用着色图解决。

#### 四、代码实现

```JavaScript
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
```