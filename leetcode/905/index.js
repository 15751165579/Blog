const sortArrayByParity = (A) => {

  const max = A.length
  if (max <= 1) {
    return A
  }
  let start = 0
  let end = max - 1
  while (start < end) {
    const pre = A[start]
    const next = A[end]
    const preIsOdd = isOdd(pre)
    const nextIsOdd = isOdd(next)
    if (!preIsOdd) {
      // 左边为偶数的情况
      start++
    } else {
      if (!nextIsOdd) {
        A[start] = next
        A[end] = pre
        start++
        end--
      } else {
        end--
      }
    }
  }

  return A
  function isOdd (number) {
    return number % 2 === 1 ? true : false
  }
}

const t1 = [3, 1, 2, 4]
console.log(sortArrayByParity(t1))