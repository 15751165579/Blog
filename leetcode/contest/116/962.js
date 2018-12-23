const maxWidthRamp = A => {
  const s = {}

  let ans = 0
  const max = A.length
  if (max < 2) {
    return 0
  }

  let minIndex = 0
  for (let i = 0; i < max; i++) {
    const item = A[i]
    if (item >= A[minIndex]) {
      ans = Math.max(i - minIndex, ans)
      let start = 0
      while (start < i) {
        if (item >= A[start]) {
          ans = Math.max(i - start, ans)
          break
        }
        start++
      }
    } else {
      if (s[item] === undefined) {
        s[item] = i
      }
      minIndex = i
    }
  }
  return ans
}

console.log(maxWidthRamp([6,0,8,2,1,5]), 4)
console.log(maxWidthRamp([9,8,1,0,1,9,4,0,4,1]), 7)
console.log(maxWidthRamp([2, 2, 1]), 1)
console.log(maxWidthRamp([1, 0]), 0)
console.log(maxWidthRamp([3,2,1]), 0)