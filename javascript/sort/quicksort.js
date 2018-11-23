const quicksort = (arr) => {
  const max = arr.length
  if (max < 2) {
    return arr
  }
  const pivot = arr[0]
  const left = []
  const right = []

  for (let i = 1; i < max; i++) {
    const v = arr[i]
    v >= pivot && right.push(v)
    v < pivot && left.push(v)
  }

  return quicksort(left).concat(pivot, quicksort(right))
}

const max = 10

const testCase = Array(max).fill(0).map(() => Math.floor(Math.random() * 100))

console.log(quicksort(testCase))