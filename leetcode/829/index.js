/**
 * Consecutive Numbers Sum
 */

// time limit
// const consecutiveNumbersSum = function (N) {
//   let result = 0
//   for (let i = 1; i <= N; i++) {

//     for (let j = 1; j <= N; j++) {
//       let sum = 0
//       for (let k = j; k < j + i; k++) {
//         sum += k
//       }
//       if (sum === N) {
//         result++
//       }
//     }
//   }
//   return result
// }

const consecutiveNumbersSum = function (N) {
  let ans = 0
  for (let j = 2; j * (j + 1) / 2 <= N; j++) {
    for (let i = Math.max(parseInt(N / j - j / 2), 1), t = 0; t < N; i++) {
      t = (i - 1) * j + j * (j + 1) / 2
      if (t === N) {
        ans++
      }
    }
  }
  return ans + 1
}

console.log(consecutiveNumbersSum(5), 2)
console.log(consecutiveNumbersSum(9), 3)
console.log(consecutiveNumbersSum(15), 4)