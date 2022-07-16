
const puppeteer = require('puppeteer');

// const timeout = process.env.SLOWMO ? 30000 : 10000;

describe('index.tsx', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  afterEach(async () => {
    await page.close();
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

  it('Does Login Work?', async () => {
    await page.waitForSelector('#navLoginBtn');
    await page.click('#navLoginBtn');
    await page.waitForSelector('form');

    await page.type('#username', 'admin2');
    await page.type('#password', 'admin2');
    await page.click('#loginBtn');
    await page.waitForNavigation();

    await expect(page.url()).toMatch('http://localhost:3000/dashboard');
  }, 3000);

  it('Does Docs Btn work?', async () => {
    await page.waitForSelector('#docsBtn');

    await page.click('#docsBtn');
    await page.waitForNavigation();
    await expect(page.url()).toMatch('http://localhost:3000/docs');
  }, 1000);

  it('Does Demo Btn work?', async () => {
    await page.waitForSelector('#demoBtn');

    await page.click('#demoBtn');
    await page.waitForNavigation();
    await expect(page.url()).toMatch('http://localhost:3000/demo');
  }, 1000);

  it('Does Demo Btn work?', async () => {
    await page.waitForSelector('#demoBtn');

    await page.click('#demoBtn');
    await page.waitForNavigation();
    await expect(page.url()).toMatch('http://localhost:3000/demo');
    await page.waitForSelector('#urlData');

    await page.type('#urlData', 'http://netflix.com');
    await page.click('#runDemoBtn');
    await page.waitForSelector('#controlGauges');
    const html = await page.$eval('#performanceBtn', (e) =>
      e.getAttribute('id')
    );
    console.log(html);
    await expect(html).toBe('performanceBtn');

    await page.click('#accessibilityBtn');

    await page.waitForSelector('#metricTitle');

    const metricTitle = await page.$eval('#metricTitle', (e) => e.innerText);
    // console.log(metricTitle);
    await expect(metricTitle).toBe('Accessibility Metrics');
    // await page.waitForTimeout(5000);
  }, 30000);
});
