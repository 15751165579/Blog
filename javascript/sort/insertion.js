const insertion = (arr) => {
  const max = arr.length
  for (let i = 1; i < max; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] >= arr[j - 1]) {
        break
      }
      const temp = arr[j]
      arr[j] = arr[j - 1]
      arr[j - 1] = temp
    }
  }
}

const arr = [4 ,2 ,3, 1, 7]
insertion(arr)
console.log(arr)