
const bubble = (arr) => {
  const max = arr.length

  for (let i = max; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] - arr[j + 1] > 0) {
        const temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
}

const max = 10
const testCase = Array(max).fill(0).map(() => Math.floor(Math.random() * 100))
bubble(testCase)

console.log(testCase)