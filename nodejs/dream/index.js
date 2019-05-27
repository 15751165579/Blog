const puppeteer = require('puppeteer')

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
  // const some = []
  // for (let i = 0, max = result.length; i < max - 1; i++) {
  //   const pre = findKNNData(result[i])
  //   some.push(computedKNN(pre))
  // }

  // fs.writeFileSync(path.join(__dirname, './some.json'), JSON.stringify(some))

})()

