// 904. Fruit Into Baskets

const totalFruit = tree => {
  const max = tree.length

  const s = new Set()

  let ans = Number.MIN_SAFE_INTEGER
  let sum = 0

  for (let i = 0; i < max; i++) {
    const type = tree[i]
    if (s.size < 2) {
      s.add(type)
      sum++
      continue
    }

    if (s.has(type)) {
      sum++
    } else {
      ans = Math.max(ans, sum)
      let start = i - 1
      while (start > 0) {
        const cur = tree[start]
        const pre = tree[start - 1]
        if (cur === pre) {
          start--
        } else {
          break
        }
      }
      sum = i - start + 1
      s.clear()
      s.add(type)
      s.add(tree[i - 1])
    }
  }

  ans = Math.max(ans, sum)
  return ans
}

console.log(totalFruit([1,2,1]), 3)
console.log(totalFruit([0,1,2,2]), 3)
console.log(totalFruit([1,2,3,2,2]), 4)
console.log(totalFruit([3,3,3,1,2,1,1,2,3,3,4]), 5)
console.log(totalFruit([0, 1, 6, 6, 4, 4, 6]), 5)


const totalFruit1 = tree => {
  const max = tree.length

  const s = new Set()

  let ans = Number.MIN_SAFE_INTEGER
  let sum = 0
  // 维护下一个子数组的起始节点
  let start = 0

  for (let i = 0; i < max; i++) {
    const type = tree[i]
    if (s.size < 2) {
      s.add(type)
      sum++
      start = i
      continue
    }

    if (s.has(type)) {
      sum++
      if (type !== tree[i - 1]) {
        start = i
      }
    } else {
      ans = Math.max(ans, sum)
      sum = i - start + 1
      s.clear()
      s.add(type)
      s.add(tree[i - 1])
      start = i
    }
  }

  ans = Math.max(ans, sum)
  return ans
}

console.log(totalFruit1([1,2,1]), 3)
console.log(totalFruit1([0,1,2,2]), 3)
console.log(totalFruit1([1,2,3,2,2]), 4)
console.log(totalFruit1([3,3,3,1,2,1,1,2,3,3,4]), 5)
console.log(totalFruit1([0, 1, 6, 6, 4, 4, 6]), 5)