/**
 * 递归方法 + in-place的方式
 */
const permutation = (A, index, max) => {
  // 终止条件
  if (index === max) {
    console.log(A.slice(0, max))
  }

  // 在第i位置有几种选择方式
  for (let i = index; i < A.length; i++) {
    [A[i], A[index]] = [A[index], A[i]]
    permutation(A, index + 1, max);
    [A[i], A[index]] = [A[index], A[i]]
  }
}

const A = [1, 2, 3]

permutation(A, 0, 2)