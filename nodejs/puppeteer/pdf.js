const puppeteer = require('puppeteer')
const path = require('path')

!(async () => {

  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  await page.goto('https://www.baidu.com/')

  await page.pdf({
    path: path.join(__dirname, 'example.pdf'),
    format: 'A4'
  })
  
  await browser.close()
})()