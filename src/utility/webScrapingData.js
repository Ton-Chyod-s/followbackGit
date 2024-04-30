const puppeteer = require('puppeteer');


async function webScrapingData(url) {
    const browser = await puppeteer.launch({
        // headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(() => {
        const title = document.querySelector('h1').innerText;
        const description = document.querySelector('p').innerText;
        return {
            title,
            description
        }
    });
    
    await browser.close();
    return data;
}

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await webScrapingData("https://github.com/settings/tokens");
        console.log(result);
    })();
}