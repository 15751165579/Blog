/**
 * V8中插入排序的实现 当数组的个数小于等于22时，采用插入排序效率是最快的。
 */
const InsertionSort = (a, from, to) => {
  if (to - from <= 1) {
    return a
  }
  for (let i = from + 1; i < to; i++) {
    const element = a[i]
    for (let j = i - 1; j >= from; j--) {
      // 将element插入到适合的位置
      const item = a[j]
      const order = comparefn(element, item)

      if (order > 0) {
        a[j + 1] = item
      } else {
        a[j + 1] = element
        break
      }
    }
  }
}

function comparefn (x, y) {
  return x > y ? 1 : -1
}

const max = 10

const testCase = Array(max).fill(0).map(() => Math.floor(Math.random() * 100))
InsertionSort(testCase, 0, max)
console.log(testCase)

/**
 * v8中快速排序的实现
 */
console.log(' === 快速排序 === ')

// const GetPivot = function (a, from, to) {
//   const t = new Array()
//   const increment = 200 + ((to - from) & 15) // 获取 200 ~ 215
//   let j = 0
//   from += 1
//   to += 1
//   for (let i = from; i < to; i += increment) {
//     t[j] = [i, a[i]]
//     j++ 
//   }

//   t.sort((a, b) => {
//     return comparefn(a[1], b[1])
//   })
//   return t[t.length >> 1][0]
// }

// const QuickSort = function (a, from, to) {
//   let pivot = 0
//   while (true) {
//     if (to - from <= 10) {
//       InsertionSort(a, from, to)
//       return
//     }
//     // 如何选择基准点
//     if (to - from > 1000) {
//       // 很复杂的取法
//       pivot = GetPivot(a, from, to)
//     } else {
//       // 三数取中
//       pivot = from + ((to - from) >> 1)
//     }
    
//     const v0 = a[from]
//     const v1 = a[to - 1]
//     const v2 = a[pivot]

//     const c01 = comparefn(v0, v1)
//     if (c01 > 0) {
//       const temp = v0
//       v0 = v1
//       v1 = temp
//     }
//     const c02 = comparefn(v0, v2)
//     if (c02 >= 0) {

//     }
//   }
// }