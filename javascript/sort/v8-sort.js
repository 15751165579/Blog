/**
 * V8中插入排序的实现 当数组的个数小于等于22时，采用插入排序效率是最快的。
 */
const a = [1, 4, 3, 2]
const InsertionSort = (a, from, to) => {
  if (to - from <= 1) {
    return a
  }
  for (let i = from + 1; i < to; i++) {
    const element = a[i]
    for (var j = i - 1; j >= from; j--) {
      // 将element插入到适合的位置
      const item = a[j]
      const order = comparefn(item, element)
      if (order > 0) {
        a[j + 1] = item
      } else {
        break
      }
    }
    // 插入的位置
    a[j + 1] = element
  }
}

function comparefn (x, y) {
  return x > y ? 1 : -1
}
console.log(' === 插入排序 === ')
InsertionSort(a, 0, a.length)
console.log(a)

/**
 * v8中快速排序的实现
 * 
 * 1、分治的思想
 * 
 * 2、如果寻找基准
 * （1）固定基准值，对于随机序列处理时间是可以接受的，对于已经有序的数据，则时间复杂度为O(n^2)
 * （2）随机基准元，仍然会存在最坏的情况，但是概率相当的小
 * （3）三数取中（一般是中心位置）
 * 
 * 3、分割操作：
 * （1）将所有比基准点小的元素放在左边
 * （2）将所有比基准点大的元素放在右边
 */
console.log(' === 快速排序 === ')

const getThirdIndex = function (a, from, to) {
  const t = new Array()
  const increment = 200 + ((to - from) & 15) // 获取 200 ~ 215
  let j = 0
  from += 1
  to += 1
  for (let i = from; i < to; i += increment) {
    t[j] = [i, a[i]]
    j++ 
  }

  t.sort((a, b) => {
    return comparefn(a[1], b[1])
  })
  return t[t.length >> 1][0]
}

const QuickSort = function (a, from, to) {
  let thirdIndex = 0
  /* eslint-disable */
  while (true) {
    if (to - from <= 10) {
      InsertionSort(a, from, to)
      return
    }
    // 如何选择基准点
    if (to - from > 1000) {
      // 很复杂的取法
      thirdIndex = getThirdIndex(a, from, to)
    } else {
      // 中位数
      thirdIndex = from + ((to - from) >> 1)
    }
    
    let v0 = a[from]
    let v1 = a[to - 1]
    let v2 = a[thirdIndex]
    // v0 <= v1 <= v2
    const c01 = comparefn(v0, v1)
    if (c01 > 0) {
      // 如果v0 > v1 那么 需要将两者交换
      const temp = v0
      v0 = v1
      v1 = temp
    }
    const c02 = comparefn(v0, v2)
    if (c02 >= 0) {
      const tmp = v0
      v0 = v2
      v2 = v1
      v1 = tmp
    } else {
      const c12 = comparefn(v1, v2)
      if (c12 > 0) {
        const tmp = v1
        v1 = v2
        v2 = tmp
      }
    }

    // 最终完成 v0 <= v1 <= v2
    a[from] = v0
    a[to - 1] = v2
    const pivot = v1
    let low_end = from + 1
    let high_start = to - 1

    a[thirdIndex] = a[low_end]
    a[low_end] = pivot

    console.log(a)

    // 分割操作
    for (let i = low_end + 1; i < high_start; i++) {
      var element = a[i];
      var order = comparefn(element, pivot)
      if (order < 0) {
        a[i] = a[low_end]
        a[low_end] = element
        low_end++
      } else if (order > 0) {
        // 找到右边比基准小的数
        do {
          high_start--
          if (high_start == i) break // 此时退出循环
          var top_elem = a[high_start]
          order = comparefn(top_elem, pivot)
        } while (order > 0)
        a[i] = a[high_start]
        a[high_start] = element
        if (order < 0) {
          // 如果交换过来的数 比基准还小 那么就需要向前移动一位，
          element = a[i]
          a[i] = a[low_end]
          a[low_end] = element
          low_end++
        }
      }
    }

    // 上述将基准两边的数据按照分割完毕
    console.log(' ==== 一轮 ==== ')
    console.log(from, to)
    console.log(thirdIndex)
    console.log(low_end, high_start)
    console.log(a)
    // 这里到底优化了什么？当子序列长的时候 还在这个循环中执行
    // if (to - high_start < low_end - from) {
    //   QuickSort(a, high_start, to)
    //   to = low_end // 再次进入循环 对 from ~ to 进行的重新处理
    // } else {
    //   QuickSort(a, from, low_end)
    //   from = high_start
    // }
    QuickSort(a, high_start, to)
    to = low_end // 再次进入循环 对 from ~ to 进行的重新处理
  }
}
const b = [1, 23, 42, 3, 5, 8, 2, 50, 38, 29, 64, 17, 9, 4, 30, 70, 68]
QuickSort(b, 0, b.length)
console.log(b)