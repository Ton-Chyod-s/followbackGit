const puppeteer = require('puppeteer');
const fs = require('node:fs');
const path = require('path');
const { email, senha } = require('../key/usuario');

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

    // Aguarde até que o seletor esteja disponível na página
    await page.waitForSelector('[class="form-select js-default-token-expiration-select"]');
    // Selecione a opção "No expiration" com o valor 'none'
    await page.select('[class="form-select js-default-token-expiration-select"]', 'none');

    // select all repo
    await page.locator('[value="repo"]').click();
    // select all user
    await page.locator('[value="user"]').click();
    // select all admin:SSH
    await page.locator('[value="admin:ssh_signing_key"]').click();
    
    // generate token
    await page.waitForSelector('button[type="submit"]');
    await page.evaluate(() => {
        const buttons = document.querySelectorAll('button[type="submit"]');
        buttons.forEach(button => {
            if (button.textContent.trim() === 'Generate token') {
                button.click();
            }
        });
    });
    
    // wait for token
    await page.waitForSelector('code[id="new-oauth-token"]');
    const newToken = await page.evaluate(() => {
        const code = document.querySelector('code[id="new-oauth-token"]');
        return code.textContent;
    });
    
    // save token
    (function () {
        const token = `token = ${newToken};\n\nmodule.exports = { token };`
        const filePath = path.join(__dirname, 'key', 'token.js');
        fs.writeFile(filePath, token, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    })();



    
    await browser.close();
    let numGitDict = {
        'numero git': numGit.trim()
    };
    return numGitDict;
}

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await webScrapingData(email, senha);
        console.log(result);
    })();
}