/**
 * Merge Sorted Array
 */
const merge = function (nums1, m, nums2, n) {
  let index1 = m - 1
  let index2 = n - 1
  let index3 = m + n - 1

  while (index1 >= 0 && index2 >= 0) {
    const x = nums1[index1]
    const y = nums2[index2]

    if (x > y) {
      nums1[index3--] = x
      index1--
    } else {
      nums1[index3--] = y
      index2--
    }
  }

  while (index2 >= 0) {
    nums1[index3--] = nums2[index2--]
  }
}