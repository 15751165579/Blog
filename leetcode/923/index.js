// 923. 3Sum With Multiplicity

const threeSumMulti = (A, target) => {
  const max = A.length

  const MAX = 10 ** 9 + 7
  const hash = {}

  const nums = []
  // 统计数字出现的次数
  for (let i = 0; i < max; i++) {
    const item = A[i]
    if (hash[item] == null) {
      nums.push(item)
      hash[item] = 0
    }
    hash[item]++
  }
  let result = 0

  // 尝试寻找这三个数
  for (let a = 0; a <= target; a++) {
    for (let b = a; b <= target; b++) {
      const c = target - a - b
      // 不合法的情况
      if (!hash[a] || !hash[b] || !hash[c] || c < 0) {
        continue
      }

      // 小心重复的组合
      if (c < b) {
        continue
      }
      /**
       * a <= b <= c
       * 有一个数相等
       * 有两个数相等
       */
      if (a === b && b === c) {
        result += ((hash[a] * (hash[a] - 1) * (hash[a] - 2)) / 6) % MAX
      } else if (a === b && a !== c) {
        result += (hash[a] * (hash[a] - 1) / 2 * hash[c]) % MAX
      } else if (a !== b && b === c) {
        result += (hash[b] * (hash[b] - 1 ) / 2 * hash[a]) % MAX
      } else {
        result += (hash[a] * hash[b] * hash[c]) % MAX
      }
    }
  }

  return result
}

console.log(threeSumMulti([1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 8), 20)
console.log(threeSumMulti([1,1,2,2,2,2], 5), 12)
console.log(threeSumMulti([0, 0, 0], 0), 1)

// Time Limit
const threeSumMulti1 = (A, target) => {
  const max = A.length
  if (max < 3) {
    return 0
  }

  let result = 0

  for (let a = 0; a < max - 2; a++) {
    for (let b = a + 1; b < max - 1; b++) {
      for (let c = b + 1; c < max; c++) {
        if (A[a] + A[b] + A[c] === target) {
          result++
        }
      }
    }
  }

  return result
}

console.log(threeSumMulti1([1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 8), 20)
console.log(threeSumMulti1([1,1,2,2,2,2], 5), 12)
console.log(threeSumMulti1([0, 0, 0], 0), 1)