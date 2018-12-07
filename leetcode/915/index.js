// 915. Partition Array into Disjoint Intervals

const partitionDisjoint = A => {
  const len = A.length

  // 左边的最大值 应该小于右边的最小值
  const max = []
  max[0] = Number.MIN_SAFE_INTEGER
  const min = []
  min[0] = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < len; i++) {
    max[i + 1] = Math.max(max[i], A[i])
    min[i + 1] = Math.min(min[i], A[len - 1 - i])
  }

  let ans
  for (let i = 1; i < len; i++) {
    const start = max[i]
    const end = min[len - i]
    if (start <= end) {
      ans = i
      break
    }
  }
  return ans
}

console.log(partitionDisjoint([5,0,3,8,6]), 3)
console.log(partitionDisjoint([1,1,1,0,6,12]), 4)