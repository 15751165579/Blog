const sortArrayByParityII = (A) => {
  const max = A.length
  const newArray = new Array(max)
  let oddIndex = 1
  let evenIndex = 0
  for (let i = 0; i < max; i++) {
    const item = A[i]
    if (isOdd(item)) {
      newArray[oddIndex] = item
      oddIndex += 2
    } else {
      newArray[evenIndex] = item
      evenIndex += 2
    }
  }
  return newArray
  function isOdd (num) {
    return num % 2 === 1 ? true : false
  }
}

const testCase = [4, 2, 5, 7]
console.log(sortArrayByParityII(testCase))