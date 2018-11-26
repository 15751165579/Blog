const knightDialer = (N) => {
  const max = Math.pow(10, 9) + 7
  // 将二维空间压缩成一维空间
  let init = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0]
  if (N <= 0) {
    return 0
  }
  if (N === 1) {
    return sum(init)
  }

  let dp = []
  for (let i = 0; i < N -1; i++) {
    for (let j = 0; j < init.length; j++) {
      switch (j) {
        case 9:
          break
        case 11:
          dp[j] = 0
          break
        case 0:
          dp[j] = (init[7] + init[5]) % max
          break
        case 1:
          dp[j] = (init[6] + init[8]) % max
          break
        case 2:
          dp[j] = (init[3] + init[7]) % max
          break
        case 3:
          dp[j] = (init[2] + init[8] + init[10]) % max
          break;
        case 4:
          dp[j] = 0
          break
        case 5:
          dp[j] = (init[0] + init[6] + init[10]) % max
          break
        case 6:
          dp[j] = (init[1] + init[5]) % max
          break
        case 7:
          dp[j] = (init[0] + init[2]) % max
          break
        case 8:
          dp[j] = (init[1] + init[3]) % max
          break
        case 10:
          dp[j] = (init[3] + init[5]) % max
      }
    }
    // 交换数组
    init = dp
    dp = []
  }

  return sum(init)
  function sum (data) {
    return (data.reduce((pre, cur) => cur += pre, 0)) % max
  }
}

console.log(knightDialer(1))
console.log(knightDialer(2))
console.log(knightDialer(3))