function throttle(fn, delay) {
  let timer = null
  let isFirst = true

  return function () {
    if (isFirst) {
      fn.apply(this, arguments)
      isFirst = false
      return
    }
    if (timer !== null) {
      return
    }

    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(this, arguments)
    }, delay || 500)
  }
}

console.log(throttle)