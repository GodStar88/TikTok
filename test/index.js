const { chromium } = require('playwright')
const CaptchaSolver = require('./CaptchaSolver')

;(async () => {
  const browser = await chromium.launch({ headless: false, channel: 'chrome' })
  const page = await browser.newPage()

  // the captcha solver should be initialized before visiting the page
  const captchaSolver = new CaptchaSolver(page)

  await page.goto('https://www.tiktok.com/@tiktok')

  // solve the captcha
  await captchaSolver.solve()
})()