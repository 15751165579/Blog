/**
 * 问题关键 如何找到矩形？
 * 
 * 一条对角线 确定另一条对角线
 */
const minAreaRect = (points) => {
  const m = new Map()
  for (let point of points) {
    const [x, y] = point
    m.set(`${x},${y}`, true)
  }

  let min = Number.MAX_SAFE_INTEGER
  const len = points.length
  for (let i = 0; i < len; i++) {
    const [x1, y1] = points[i]
    for (let j = i + 1; j < len; j++) {
      const [x2, y2] = points[j]

      if (x1 !== x2 && y1 !== y2) {
        // 构成对角线
        if (m.get(`${x1},${y2}`) && m.get(`${x2},${y1}`)) {
          min = Math.min(min, Math.abs(x1 - x2) * Math.abs(y1 - y2))
        }
      }
    }
  }
  // 不存在的情况
  if (min === Number.MAX_SAFE_INTEGER) {
    min = 0
  }
  return min
}

console.log(minAreaRect([[1,1],[1,3],[3,1],[3,3],[2,2]]), 4)
console.log(minAreaRect([[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]), 2)