# 前端中的排序算法

### 前言

  对于排序算法，时间复杂度和空间复杂度同样重要。根据是否使用额外的内存空间又将排序算法分为：原地排序算法和其他算法。

### 选择排序

  选择排序的核心：不断从右边寻找到最小的元素，与左边有序序列交换。实现：

```JavaScript
const selection = (arr) => {
  const max = arr.length
  for (let i = 0; i < max; i++) {
    let min = i
    for (let j = i + 1; j < max; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    // 交换
    if (i !== min) {
      const temp = arr[min]
      arr[min] = arr[i]
      arr[i] = temp
    }
  }
}
```

  其主要特点是运行时间与输入无关，这也导致有序序列与随机序列花费的时间一样长。

  当然它也有一个优点：数据移动是最少的。从上述的实现中可以发现只发生N次交换。

  时间复杂度: O(n^2)

  空间复杂度: O(1)

### 插入排序

  插入排序: 将数组分成两部分，左边为有序序列，右边原始序列，遍历右边的序列不断的将元素插入在左边的合适位置中。

```JavaScript
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
```

  它的时间复杂度最坏的情况是O(n^2)，最好的情况是O(n)。这里实际上就摆脱了前面选择排序忽视输入的问题。

  空间复杂度O(1)