const isLongPressedName = (name, typed) => {
  const max = typed.length
  const min = name.length
  if (max < min) {
    return false
  }
  let n = 0
  let t = 0
  while (n < min) {
    const n1 = name[n]
    const t1 = typed[t]
    if (n1 === t1) {
      n++
      t++
    } else {
      if (t1 === name[n - 1]) {
        t++
      } else {
        break
      }
    }
  }
  if (n !== min) {
    return false
  }
  return true
}

console.log(isLongPressedName('alex', 'aaleex'), true)
console.log(isLongPressedName('saeed', 'ssaaedd'), false)
console.log(isLongPressedName('leelee', 'lleeelee'), true)
console.log(isLongPressedName('laiden', 'laiden'), true)