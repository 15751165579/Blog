function decode (qs, sep = '&', eq = '=') {
  const obj = {}
  qs = qs.split(sep)

  for (let i = 0, max = qs.length; i < max; i++) {
    const item = qs[i]
    const index = item.indexOf(eq)

    let key, value

    if (~index) {
      key = item.substr(0, index)
      value = item.substr(index + 1)
    } else {
      key = item
      value = ''
    }
    
    key = decodeURIComponent(key)
    value = decodeURIComponent(value)

    if (!obj.hasOwnProperty(key)) {
      obj[key] = value
    }
  }
  return obj
}

console.log(decode('a=1&b=2'))