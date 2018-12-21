const computeOperation = require('./igo')

for (let i = 1; i < 200; i++) {
  const M = 420 - i
  const N = i
  const storage = []

  for (let i = 0; i < M; i++) {
    storage[i] = [1, 1, 1]
  }
  const op = computeOperation(storage, M, N, 3)
  const ratio = (op / (M * 3)).toFixed(2)
  console.log(` ******* 【空闲货道】 ${i} 【操作数】${op} 【效率比】 ${ratio}`)
}
