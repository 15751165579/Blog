/* eslint-disable */
const puppeteer = require('puppeteer')
const device = require('puppeteer/DeviceDescriptors')

!(async () => {

  const browser = await puppeteer.launch({
    headless: true
    // slowMo: 250
  })

  const page = await browser.newPage()

  await page.emulate(device['iPhone 6'])
  await page.goto('https://www.baidu.com/')

  const list = await page.evaluate(_ => {
    const news = document.querySelectorAll('.rn-container')
    return Array.from(news).map(item => {
      const h1 = item.querySelector('.rn-h1')
      const h2 = item.querySelector('.rn-h2')
      if (h1) {
        return h1.textContent
      }
      return h2.textContent
    })
  })
  console.log(list)
  await browser.close()
})()