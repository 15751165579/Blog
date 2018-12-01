// 926. Flip String to Monotone Increasing
const minFlipsMonoIncr = (S) => {
  const max = S.length

  if (max <= 1) {
    return 0
  }

  // l[i] 表示 0 ~ i 为0的情况
  let l = []
  l[0] = 0 // 左边没有0
  for (let i = 1; i <= max; i++) {
    const item = S[i - 1] // 注意下标
    l[i] = l[i - 1] + (item === '1' ? 1 : 0)
  }

  // r[i] 表示后 max - 1 - i ~ max - 1 为1的情况
  let r = []
  r[0] = 0 // 右边没有1
  for (let i = 1; i <= max; i++) {
    const item = S[max - i] // 注意下标
    r[i] = r[i - 1] + (item === '1' ? 0 : 1)
  }

  let min = Number.MAX_SAFE_INTEGER
  for (let i = 0; i <= max ; i++) {
    const lItem = l[i]
    const rItem = r[max - i]
    min = Math.min(rItem + lItem, min)
  }
  return min
}

console.log(minFlipsMonoIncr('010110'), 2)
console.log(minFlipsMonoIncr('00110'), 1)
console.log(minFlipsMonoIncr('00011000'), 2)
console.log(minFlipsMonoIncr('01110'), 1)
console.log(minFlipsMonoIncr("00000000000000000000000000000000000000000000000000000000000000000010100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"), 2)
