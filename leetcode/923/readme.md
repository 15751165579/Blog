# JavaScript刷LeetCode -- 923. 3Sum With Multiplicity

#### 一、题目

  Given an integer array A, and an integer target, return the number of tuples i, j, k  such that i < j < k and A[i] + A[j] + A[k] == target.

  As the answer can be very large, return it modulo 10^9 + 7.

#### 二、题目大意

  从数组A中找出三个数的组合，使得相加的结果为target，要求给出所有这种组合的个数。(答案可能很大，记得取模运算)

```s
  Note:
  3 <= A.length <= 3000
  0 <= A[i] <= 100
  0 <= target <= 300
```

#### 三、解题思路

  最容易想到的就是找出数组中的所有组合，然后和值是否满足target：

``` JavaScript
const threeSumMulti = (A, target) => {
  const max = A.length
  if (max < 3) {
    return 0
  }

  let result = 0

  for (let a = 0; a < max - 2; a++) {
    for (let b = a + 1; b < max - 1; b++) {
      for (let c = b + 1; c < max; c++) {
        if (A[a] + A[b] + A[c] === target) {
          result++
        }
      }
    }
  }

  return result
}
```

  同题目中的限制条件可以看出数组A的范围还是很大的，所以这种暴力求解的方法会超时。

  另一种思路则是从target出发，通过三重循环（target的范围并不是特别的大）找出能够构成三数之和为target的组合，再判断这些数是否能从数组中取出。

  在实现的过程中需要注意几点：

  - 通过target - a -b可以计算出第三个数，从而减少一层循环。
  - 遍历数组A记录其中元素的个数，用来判断3数是否合法以及计算后面的组合个数。
  - 涉及到数学中的组合知识。

#### 四、代码实现

```JavaScript
const threeSumMulti = (A, target) => {
  const max = A.length

  const MAX = 10 ** 9 + 7
  const hash = {}
  // 统计数字出现的次数
  for (let i = 0; i < max; i++) {
    const item = A[i]
    if (hash[item] == null) {
      hash[item] = 0
    }
    hash[item]++
  }
  let result = 0

  // 尝试寻找这三个数
  for (let a = 0; a <= target; a++) {
    for (let b = a; b <= target; b++) {
      const c = target - a - b
      // 不合法的情况
      if (!hash[a] || !hash[b] || !hash[c] || c < 0) {
        continue
      }

      // 小心重复的组合
      if (c < b) {
        continue
      }
      /**
       * a <= b <= c
       * 有一个数相等
       * 有两个数相等
       * 
       */
      if (a === b && b === c) {
        result += ((hash[a] * (hash[a] - 1) * (hash[a] - 2)) / 6) % MAX
      } else if (a === b && a !== c) {
        result += (hash[a] * (hash[a] - 1) / 2 * hash[c]) % MAX
      } else if (a !== b && b === c) {
        result += (hash[b] * (hash[b] - 1 ) / 2 * hash[a]) % MAX
      } else {
        result += (hash[a] * hash[b] * hash[c]) % MAX
      }
    }
  }

  return result
}
```

