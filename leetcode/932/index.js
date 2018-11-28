const beautifulArray = (N) => {
  // 初始化数组
  let result = [1]

  while (result.length < N) {
    let x = result.map(item => item * 2 - 1)
    let y = result.map(item => item * 2)
    result = x.concat(y)
  }

  let ans = []
  for (let i = 0; i < result.length; i++) {
    const item = result[i]
    if (item <= N) {
      ans.push(item)
    }
  }

  return ans
}

console.log(beautifulArray(4), [2, 1, 3, 4])
console.log(beautifulArray(5), [3,1,2,5,4])