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

console.log(numSubarraysWithSum([1,0,1,0,1], 2), 4)
console.log(numSubarraysWithSum([0,0,0,0,0], 0), 15)
console.log(numSubarraysWithSum([0,1,1,1,1], 3), 3)