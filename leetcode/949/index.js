const largestTimeFromDigits  = (A) => {
  let ans = -1
  function perm(arr, k, array_size) {
    if (k >= array_size) {
      const s = arr.join('')
      if (s <= 2359 && (arr[2] < 6)) {
        ans = Math.max(ans, s)
      }
    }
    else {
      for (var i = k; i < array_size; ++i) {
        swap(arr, k, i);
        perm(arr, k+1, array_size);  // 递归.
        swap(arr, k, i);  // 再交换回来.
      }
    }
    
    function swap(arr, i, j) {
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    } 
  }
  
  perm(A, 0, 4)

  if (ans === -1) {
    return ''
  } else {
    ans = String(ans).padStart(4, '0')
    const temp = ans.split('')
    return `${temp[0]}${temp[1]}:${temp[2]}${temp[3]}`
  }
}

console.log(largestTimeFromDigits([1,2,3,4]))
console.log(largestTimeFromDigits([5,5,5,5]))
console.log(largestTimeFromDigits([0,0,0,0]))