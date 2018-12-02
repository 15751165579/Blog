/**
 * 字典序
 */

const permutation = (A) => {
  const max = A.length

  /* eslint-disable */
  while (true) {
    console.log(A)
    let j = max - 1
    let index = -1

    for (let i =  j - 1; i >= 0; i--) {
      // 找出第一个非递增的数
      const pre = A[i]
      const next = A[i + 1]
      if (pre < next) {
        index = i
        break
      }
      if (i === 0) {
        // 退出循环
        return false
      }
    }

    let targetIndex = -1
    for (let i = j; i >= 0; i--) {
      if (A[i] > A[index]) {
        targetIndex = i
        break
      }
    }

    // 交换两个数据
    [A[index], A[targetIndex]] = [A[targetIndex], A[index]]
    reverse(A, index + 1)
  }

  function reverse (A, index) {
    let end = A.length - 1
    let start = index
    while (start < end) {
      [A[start], A[end]] = [A[end], A[start]]
      start++
      end--
    }
  }
}

const A = [1, 2, 3, 4]

permutation(A)