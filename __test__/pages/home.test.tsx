// import 'expect-puppeteer';
// import puppeteer from 'puppeteer';

// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer');

const timeout = process.env.SLOWMO ? 30000 : 10000;

describe('index.tsx', () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should be titled "Panoptic"', async () => {
    await expect(page.title()).resolves.toMatch('Panoptic');
  });

  it('Functional Login Nav Btn', async () => {
    await page.waitForSelector('#navLoginBtn');
    await page.click('#navLoginBtn');
    await page.waitForSelector('#loginBtn');
    const html = await page.$eval('#loginBtn', (e) => e.innerHTML);
    expect(html).toBe('Login');
  });

  it(
    'Does Login Work?',
    async () => {
      await page.waitForSelector('#navLoginBtn');
      await page.click('#navLoginBtn');
      await page.waitForSelector('form');

      await page.type('#username', 'admin2');
      await page.type('#password', 'admin2');
      await page.click('#loginBtn');
      await page.waitForNavigation();
      await page.waitForTimeout(1000);
    },
    timeout
  );
});
