const computeOperation = require('./igo')

for (let i = 1; i < 100; i++) {
  const M = 420 - i
  const N = i
  const storage = []

  for (let i = 0; i < M; i++) {
    storage[i] = [1, 1, 1]
  }
  const ratio = computeOperation(storage, M, N) / ( M * 3 )
  console.log(` ******* 空闲货道 ${i} 比率 ${ratio}`)
}
