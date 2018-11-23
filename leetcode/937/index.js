
const reorderLogFiles = (logs) => {
  const max = logs.length
  if (max < 2) {
    return logs
  }
  const str = []
  const num = []
  for (let log of logs) {
    if (log[log.indexOf(' ') + 1].charCodeAt() < 97) {
      num.push(log)
    } else {
      str.push(log)
    }
  }

  str.sort((a, b) => {
    const x = a.slice(a.indexOf(' ') + 1)
    const y = b.slice(b.indexOf(' ') + 1)
    return x > y ? 1 : -1
  })

  return str.concat(num)
}

const t1 = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
console.log(reorderLogFiles(t1))
const t2 = ["j je", "b fjt", "7 zbr", "m le", "o 33"]
console.log(reorderLogFiles(t2))