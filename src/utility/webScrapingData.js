const puppeteer = require('puppeteer');

async function webScrapingData(nome,senha) {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://github.com/settings/tokens");

    // Preencher um campo
    await page.type('[id="login_field"]', nome);
    // Preencher um campo
    await page.type('[id="password"]', senha);
    // clicar
    await page.locator('[value="Sign in"]').click();



    // // esperando até encontrar o selector
    // await page.waitForSelector('table[id="tbDiarios"]');
    // // Aguardar um pouco
    // await new Promise(resolve => setTimeout(resolve, 500));

    // const data = await page.evaluate(() => {
    //     const title = document.querySelector('span');
    //       return {
    //         title
    //     }
    // });

    await browser.close();
}

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await webScrapingData('hix_x@hotmail.com','Teamomtos2!');
        console.log(result);
    })();
}