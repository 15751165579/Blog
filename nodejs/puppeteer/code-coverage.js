const puppeteer = require('puppeteer')
const device = require('puppeteer/DeviceDescriptors')

!(async () => {

  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  await page.emulate(device['iPhone 6'])

  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
  ])

  await page.goto('https://www.baidu.com/')

  await page.waitFor('input')

  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ])

  const jsTotalBytes = jsCoverage.reduce((pre, next) => pre + next.text.length, 0)
  const cssTotalBytes = cssCoverage.reduce((pre, next) => pre + next.text.length, 0)

  const jsUsedBytes = jsCoverage.reduce((pre, next) => {
    return pre + next.ranges.reduce((subpre, subnext) => subpre + subnext.end - subnext.start - 1, 0)
  }, 0)

  const cssUsedBytes = cssCoverage.reduce((pre, next) => {
    return pre + next.ranges.reduce((subpre, subnext) => subpre + subnext.end - subnext.start - 1, 0)
  }, 0)

  console.log(`js覆盖率： ${(jsUsedBytes / jsTotalBytes * 100).toFixed(2)}%`)
  console.log(`css覆盖率：${(cssUsedBytes / cssTotalBytes * 100).toFixed(2)}%`)

  await browser.close()
  
})()