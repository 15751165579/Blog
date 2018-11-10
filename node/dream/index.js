const puppeteer = require('puppeteer')

!(async () => {

  const browser = await puppeteer.launch({
    headless: true
  })

  const page = await browser.newPage()

  await page.goto('http://trend.caipiao.163.com/dlt/')

  const result = await page.evaluate(() => {

    const ret = []
    const termList = Array.from(document.querySelectorAll('#cpdata > tr'))

    termList.forEach(item => {
      let tdList = Array.from(item.querySelectorAll('td'))
      const numList = []
      tdList.forEach(sub => {
        const omit = sub.getAttribute('data-omit')
        if (omit != null) {
          numList.push({
            vOffset: omit // 垂直偏移量
          })
        }
      })

      let start = 0
      for (let i = 0; i < numList.length; i++) {
        const item = numList[i]
        if (item.vOffset == 0) {

          // 1 ~ 35
          if (i < 35) {
            const target = i + 1
            item.value = target
            if (start == 0) {
              start = target
              item.x = 0
            } else {
              item.x = target - start - 1
              start = target
            }
          } else {
            item.vaue = i + 1 - 35
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
      if (sub.value && index < 35) {
        sub.y = parseInt(result[i - 1][index]['vOffset'])
      }
    })
  }

  handleAction(result)
})()

function handleAction (list) {
  for (let i = 1; i < list.length; i++) {
    const item = list[i]
    let x = 0
    let y = 0
    for (let j = 0; j < 35; j++) {
      const sub = item[j]
      if (sub.value) {
        x += sub.x
        y += sub.y
      }
    }
    console.log(y / x)
  }
}