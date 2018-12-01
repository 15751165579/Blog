// 926. Flip String to Monotone Increasing
const minFlipsMonoIncr = (S) => {
  const max = S.length

  // l[i] 表示前i + 1个元素是0的情况
  let l = []
  l[0] = S[0] == '1' ? 1 : 0
  for (let i = 1; i < max; i++) {
    const item = S[i]
    l[i] = l[i - 1] + (item === '1' ? 1 : 0)
  }

  // r[i] 表示后i + 1 个元素是1的情况
  let r = []
  r[0] = S[max - 1] == '0' ? 1 : 0
  for (let i = 1; i < max; i++) {
    const item = S[max - i - 1]
    r[i] = r[i - 1] + (item === '1' ? 0 : 1)
  }

  const rMax = r[max - 1] // 全部是1的情况
  const lMax = l[max - 1] // 全部是0的情况
  let min = Math.min(rMax, lMax)


  for (let i = 1; i < max ; i++) {
    const lItem = l[i - 1]
    const rItem = r[max - 1 - i]
    min = Math.min(rItem + lItem, min)
  }
  return min
}

console.log(minFlipsMonoIncr('010110'), 2)
console.log(minFlipsMonoIncr('00110'), 1)
console.log(minFlipsMonoIncr('00011000'), 2)
console.log(minFlipsMonoIncr('01110'), 1)
console.log(minFlipsMonoIncr("00000000000000000000000000000000000000000000000000000000000000000010100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"), 2)
