# JavaScript刷LeetCode -- 863. All Nodes Distance K in Binary Tree [Medium]

#### 一、题目

  &emsp;&emsp;We are given a binary tree (with root node root), a target node, and an integer value K.

  &emsp;&emsp;Return a list of the values of all nodes that have a distance K from the target node.  The answer can be returned in any order.

#### 二、题目大意

  &emsp;&emsp;返回距离目标节点K的所有节点的值列表。

#### 三、解题思路

  &emsp;&emsp;将二叉树转化为无向图，然后采用BFS即可。在处理无向图时，记得标记访问过的节点。

#### 四、解题思路

```JavaScript
const distanceK = (root, target, K) => {
  
  const graph = {}
  let ans = []

  // 边界条件
  if (!root) {
    return ans
  }
  const tv = target.val
  // 边界条件
  if (K === 0) {
    return [tv]
  }

  // 构建无向图
  buildGraph(null, root)

  ans = graph[tv] || []

  const record = new Set() // 记录访问过的节点

  record.add(tv)

  let step = K

  while (--step && ans.length) {
    const max = ans.length

    for (let i = 0; i < max; i++) {
      const item = ans.pop()
      record.add(item)
      const sub = graph[item]
      for (let j = 0; j < sub.length; j++) {
        const x = sub[j]
        if (!record.has(x)) {
          ans.unshift(x)
          record.add(x)
        }
      }
    }
  }

  return ans


  return ans
  function buildGraph (parent, child) {
    if (parent && child) {
      const pv = parent.val
      const cv = child.val
      if (!graph[pv]) {
        graph[pv] = []
      }
      if (!graph[cv]) {
        graph[cv] = []
      }
      graph[pv].push(cv)
      graph[cv].push(pv)
    }

    if (child.left) {
      buildGraph(child, child.left)
    }
    if (child.right) {
      buildGraph(child, child.right)
    }
  }
}
```