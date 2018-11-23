const arr = [4 ,2 ,3, 1, 7]

// arr.sort((a, b) => {
//   if (a - b > 0) {
//     return 1
//   } else {
//     return -1
//   }
// })

// console.log(arr)

arr.sort((a, b) => {
  console.log(arr)
  if (a > b) {
    return -1
  }
  return 1
})
console.log(arr)