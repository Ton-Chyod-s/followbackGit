const puppeteer = require('puppeteer');

async function webScrapingData() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://github.com/settings/tokens");

    const data = await page.evaluate(() => {
        const title = document.querySelector('span');
          return {
            title
        }
    });

    await browser.close();
}

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await webScrapingData();
        console.log(result);
    })();
}