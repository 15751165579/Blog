const knightDialer = (N) => {
  const max = Math.pow(10, 9) + 7
  let init = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [-1, 1, -1]
  ]
  if (N <= 0) {
    return 0
  }
  if (N === 1) {
    return sum(init)
  }
  
  // 初始化多维数组
  const temp = []
  for (let i = 0; i < 4; i++) {
    temp[i] = []
  }

  for (let k = 0; k < N - 1; k++) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        // 判断位置
        if ((i === 3 && j === 0) || (i === 3 && j === 2)) {
          continue
        }
        if (i === 0 && j === 0) {
          temp[i][j] = (init[2][1] + init[1][2]) % max
        } else if (i === 0 && j === 1) {
          temp[i][j] = (init[2][0] + init[2][2]) % max
        } else if (i === 0 && j === 2) {
          temp[i][j] = (init[1][0] + init[2][1]) % max
        } else if (i === 1 && j === 0) {
          temp[i][j] = (init[0][2] + init[2][2] + init[3][1]) % max
        } else if (i === 1 && j === 1) {
          temp[i][j] = 0
        } else if (i === 1 && j === 2) {
          temp[i][j] = (init[0][0] + init[2][0] + init[3][1]) % max
        } else if (i === 2 && j === 0) {
          temp[i][j] = (init[0][1] + init[1][2]) % max
        } else if (i === 2 && j === 1) {
          temp[i][j] = (init[0][0] + init[0][2]) % max
        } else if (i === 2 && j === 2) {
          temp[i][j] = (init[0][1] + init[1][0]) % max
        } else if (i === 3 && j === 1) {
          temp[i][j] = (init[1][0] + init[1][2]) % max
        }
      }
    }
    // 交换数组
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        init[i][j] = temp[i][j]
      }
    }
  }

  return sum(init)
  function sum (data) {
    let total = 0
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        const item = data[i][j]
        if (item > 0) {
          total = (total + item) % max
        }
      }
    }
    return total
  }
}

console.log(knightDialer(1))
console.log(knightDialer(2))
console.log(knightDialer(3))