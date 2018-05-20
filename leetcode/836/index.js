/**
 * 836 矩阵重叠
 */

const isRectangleOverlap = function (rec1, rec2) {
  const w1 = Math.abs(rec1[2] - rec1[0])
  const h1 = Math.abs(rec1[1] - rec1[3])

  const w2 = Math.abs(rec2[2] - rec2[0])
  const h2 = Math.abs(rec2[1] - rec2[3])

  if (rec2[0] - rec1[0] < w1 && rec1[3] - rec2[3] < h1 && rec2[0] - rec1[0] >= 0 && rec1[3] - rec2[3] >= 0) {
    return true
  } else if (rec2[0] - rec1[0] < w1 && rec2[3] - rec1[3] < h2 && rec2[0] - rec1[0] >= 0 && rec2[3] - rec1[3] >= 0) {
    return true
  } else if (rec1[0] - rec2[0] < w2 && rec1[3] - rec2[3] < h1 && rec1[0] - rec2[0] >= 0 && rec1[3] - rec2[3] >= 0) {
    return true
  } else if (rec1[0] - rec2[0] < w2 && rec2[3] - rec1[3] < h2 && rec1[0] - rec2[0] >= 0 && rec2[3] - rec1[3] >= 0) {
    return true
  }

  return false
}

console.log(isRectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3]))
console.log(isRectangleOverlap([0, 0, 1, 1], [1, 0, 2, 1]))

console.log(isRectangleOverlap([-4, -9, -2, 3], [1, -5, 9, -1]))