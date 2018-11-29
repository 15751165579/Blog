// 930. Binary Subarrays With Sum

const numSubarraysWithSum = (A, S) => {
  const max = A.length
  let ans = 0
  for (let i = 0; i < max; i++) {
    let result = A[i]
    // 等于自己的情况
    if (result === S) {
      ans++
    }
    let size = i + 1
    while (size < max) {
      const sub = A[size]
      result += sub
      if (result === S) {
        ans++
      } else if (result > S) {
        break
      }
      size++
    }
  }
  return ans
}

const numSubarraysWithSum1 = (A, S) => {
  const max = A.length
  let res = 0
  let preS = 0
  const count = {}
  count['0'] = 1
  for (let i = 0; i < max; i++) {
    preS += A[i]
    res += (count[preS - S] ? count[preS - S] : 0)
    if (!count[preS]) {
      count[preS] = 0
    }
    count[preS]++
  }

  return res
}

console.log(numSubarraysWithSum([1,0,1,0,1], 2), 4)
console.log(numSubarraysWithSum([0,0,0,0,0], 0), 15)
console.log(numSubarraysWithSum([0,1,1,1,1], 3), 3)

console.log(numSubarraysWithSum1([1,0,1,0,1], 2), 4)
console.log(numSubarraysWithSum1([0,0,0,0,0], 0), 15)
console.log(numSubarraysWithSum1([0,1,1,1,1], 3), 3)