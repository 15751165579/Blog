const fs = require('fs')
const path = require('path')

const data = fs.readFileSync(path.join(__dirname, './demo.json'), {
  encoding: 'utf-8'
})

function walk (data) {
  let obj
  const type = Object.prototype.toString.call(data)
  if (type === '[object Array]') {
    obj = []
  } else if (type === '[object Object]') {
    obj = {}
  } else {
    return data
  }
  if (type === '[object Array]') {
    for (let i = 0, max = data.length; i < max; i++) {
      const temp = walk(data[i])
      if (temp.children && temp.children.length === 0) {
        continue
      }
      obj.push(temp)
    }
  } else {
    for (let key in data) {
      obj[key] = walk(data[key])
    }
  }
  return obj
}

const result = walk(JSON.parse(data))

fs.writeFileSync(path.join(__dirname, './result.json'), JSON.stringify(result, null, 4), {
  encoding: 'utf-8'
})


