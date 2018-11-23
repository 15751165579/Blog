
const selection = (arr) => {
  const max = arr.length
  for (let i = 0; i < max; i++) {
    let min = i
    for (let j = i + 1; j < max; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    // 交换
    if (i !== min) {
      const temp = arr[min]
      arr[min] = arr[i]
      arr[i] = temp
    }
  }
}

const max = 10
const testCase = []
for (let i = 0; i < max; i++) {
  testCase.push(Math.floor(Math.random() * 100))
}

selection(testCase)
console.log(testCase)