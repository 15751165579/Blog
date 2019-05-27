const puppeteer = require('puppeteer')
const device = require('puppeteer/DeviceDescriptors')
const fs = require('fs')
const path = require('path')
const lighthouse = require('lighthouse')

!(async () => {

  const browser = await puppeteer.launch({
    args: ['--remote-debugging-port=9222']
  })

  const page = await browser.newPage()

  await page.emulate(device['iPhone 6'])

  const result = await lighthouse('https://www.baidu.com/')

  fs.writeFileSync(path.join(__dirname, 'lighthouse.json'), JSON.stringify(result, null, 4), 'utf-8')

  console.log(`Audit finished, score is ${result.score}`)

  await browser.close()
})()