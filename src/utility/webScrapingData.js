const puppeteer = require('puppeteer');

async function webScrapingData(nome,senha,nomeToken) {
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
    // Esperar até que o elemento com o atributo data-target específico seja renderizado na página
    await page.waitForSelector('[data-target="sudo-credential-options.githubMobileChallengeValue"]');
    // Em seguida, selecionar o elemento
    const elementHandle = await page.$('[data-target="sudo-credential-options.githubMobileChallengeValue"]');
    // Extrair o texto do elemento usando page.evaluate()
    const numGit = await page.evaluate(element => element.textContent, elementHandle);
    // genereta token
    await page.waitForSelector('[class="btn btn-sm select-menu-button"]');
    await page.locator('[class="btn btn-sm select-menu-button"]').click();
    // generation new token
    await page.locator('[href="/settings/tokens/new"]').click();
    // name token
    await page.waitForSelector('[class="form-control wide"]');
    await page.type('[class="form-control wide"]', 'tokenCheckerFollow');

    // select scope
    // Aguarde até que o seletor esteja disponível na página
    await page.waitForSelector('[class="form-select js-default-token-expiration-select"]');

    // Selecione a opção "No expiration" com o valor 'none'
    await page.select('[class="form-select js-default-token-expiration-select"]', 'none');

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
    let numGitDict = {
        'numero git': numGit.trim()
    
    };
    return numGitDict;
}

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await webScrapingData('hix_x@hotmail.com','Teamomtos2!');
        console.log(result);
    })();
}