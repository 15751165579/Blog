const puppeteer = require('puppeteer')

const predictList = []

!(async () => {

  const browser = await puppeteer.launch({
    headless: true
  })

  const page = await browser.newPage()

  await page.goto('http://trend.caipiao.163.com/dlt/?periodNumber=100')

  const result = await page.evaluate(() => {

    const ret = []
    const termList = Array.from(document.querySelectorAll('#cpdata > tr'))

    termList.forEach(item => {
      let tdList = Array.from(item.querySelectorAll('td'))
      const numList = []
      tdList.forEach(sub => {
        const isBall = sub.getAttribute('data-omit')
        const isRed = sub.classList.contains('f_red')
        const isBlue = sub.classList.contains('f_blue')
        const value = parseInt(sub.innerText.replace(/\t/g, ''))
        if (isBall) {
          if (isRed || isBlue) {
            numList.push({
              vOffset: value // 垂直偏移量
            })
          } else {
            numList.push({
              vOffset: 0,
              value
            })
          }
        }
      })

      // 水平偏移量
      let start = 0
      let blueStart = 0
      for (let i = 0; i < numList.length; i++) {
        const item = numList[i]
        if (item.vOffset == 0) {
          const target = i + 1
          if (i < 35) {
            if (start == 0) {
              start = target
              item.x = 0
            } else {
              item.x = target - start - 1
              start = target
            }
          } else {
            if (blueStart == 0) {
              blueStart = target
              item.x = 0
            } else {
              item.x = target - blueStart - 1
              blueStart = target
            }
          }
        }
      }
      // 排除空数组
      if (numList.length > 0) {
        ret.push(numList)
      }
    })

    return ret
  })
  await browser.close()
  // 计算垂直方向的偏移量
  for (let i = 1; i < result.length; i++) {
    const item = result[i]
    item.forEach((sub, index) => {
      if (sub.value) {
        sub.y = parseInt(result[i - 1][index]['vOffset'])
      }
    })
  }
  // console.log(result[result.length - 1])
  // handleAction(result)
  computedLastTerm(result[result.length - 1])

  for (let i = 0; i < 5; i++) {
    console.log(predictList[Math.floor(Math.random() * (predictList.length - 1))])
  }
})()

// function handleAction (list) {
//   for (let i = 1; i < list.length; i++) {
//     const item = list[i]
//     let x = 0
//     let y = 0
//     for (let j = 0; j < item.length; j++) {
//       const sub = item[j]
//       if (sub.value) {
//         x += sub.x
//         y += sub.y
//       }
//     }
//     // console.log((y / x * 10).toFixed(0))
//   }
// }

function computedLastTerm (term) {
  function combination (data, step, selected_data, amount) {
    if (selected_data.length === amount) {
      some(term, selected_data)
      return
    }
    if (step >= data.length) {
      return
    }
  
    selected_data.push(data[step])
    combination(data, step + 1, selected_data, amount)
    selected_data.pop()
    combination(data, step + 1, selected_data, amount)
  }
  
  combination(Array(47).fill(0).map((item, index) => index), 0, [], 7)
}

function some (term, selected) {
  let y = 0
  let x = 0
  let p1 = null
  let p2 = null
  for (let i = 0; i < 5; i++) {
    const item = selected[i]
    const offset = term[item].vOffset
    y += offset
    if (p1 === null) {
      p1 = item
    } else {
      x += item - p1 - 1
      p1 = item
    }
  }

  for (let i = 5; i < 7; i++) {
    const item = selected[i]
    const offset = term[item].vOffset
    y += offset
    if (p2 === null) {
      p2 = item
    } else {
      x += item - p1 - 1
      p2 = item
    }
  }

  const ratio = parseInt((y / x * 10).toFixed(0))
  if (ratio === 23 || ratio === 17 || ratio === 8 || ratio === 14 || ratio === 21) {
    let isValid = true
    const arr = selected.map((item, index) => {
      if (index <= 4) {
        const t = item + 1
        if (t > 35) {
          isValid = false
        }
        return t
      } else {
        const t = item - 34
        if (t < 1) {
          isValid = false
        }
        return t
      }
    })
    if (isValid && arr.includes(14)) {
      predictList.push(arr)
    }
  }
}