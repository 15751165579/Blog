const fs = require('fs')
const puppeteer = require('puppeteer')
const device = require('puppeteer/DeviceDescriptors')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')
const path = require('path')

const imageDataFromFile = filepath => new Promise(resolve => {
  const img = fs.createReadStream(filepath).pipe(new PNG()).on('parsed', _ => resolve(img.data))
})

!(async () => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  await page.emulate(device['iPhone 6'])

  await page.goto('https://www.baidu.com/')

  await page.screenshot({
    path: path.join(__dirname, 'before.png')
  })

  await page.waitFor('input')
  await page.focus('input#index-kw')
  await page.keyboard.type('hello world')

  await page.screenshot({
    path: path.join(__dirname, 'after.png')
  })

  // comparison

  const oldLayout = await imageDataFromFile(path.join(__dirname, 'before.png'))
  const newLayout = await imageDataFromFile(path.join(__dirname, 'after.png'))

  const diff = new PNG({
    width: 375,
    height: 667
  })

  const diffPixels = pixelmatch(newLayout, oldLayout, diff.data, 375, 667, {
    threshold: 0
  })

  console.log(`diff pixel count： ${diffPixels}`)

  await browser.close()
})()