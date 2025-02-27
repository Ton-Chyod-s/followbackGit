const puppeteer = require('puppeteer');
const fs = require('node:fs');
const path = require('path');

require('dotenv').config({ path: ".env" });

const nome = process.env.USER;
const senha = process.env.PASSWORD;

async function webScrapingData() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://github.com/settings/tokens");
    
    await page.type('[id="login_field"]', nome);
    await page.type('[id="password"]', senha);

    await page.locator('[value="Sign in"]').click();
    
    await page.waitForSelector('[data-target="sudo-credential-options.githubMobileChallengeValue"]');
    
    const elementHandle = await page.$('[data-target="sudo-credential-options.githubMobileChallengeValue"]');
    
    const numGit = await page.evaluate(element => element.textContent, elementHandle);
    console.log(`Digite o número: ${numGit.trim()}`);

    await page.waitForSelector('[class="btn btn-sm select-menu-button"]');
    await page.locator('[class="btn btn-sm select-menu-button"]').click();
    
    await page.locator('[href="/settings/tokens/new"]').click();
    
    await page.waitForSelector('[class="form-control wide"]');
    await page.type('[class="form-control wide"]', 'tokenCheckerFollow');

    await page.waitForSelector('[class="form-select js-default-token-expiration-select"]');
    
    await page.select('[class="form-select js-default-token-expiration-select"]', 'none');

    await page.locator('[value="repo"]').click();
    
    await page.locator('[value="user"]').click();
    
    await page.locator('[value="admin:ssh_signing_key"]').click();
    
    await page.waitForSelector('button[type="submit"]');
    await page.evaluate(() => {
        const buttons = document.querySelectorAll('button[type="submit"]');
        buttons.forEach(button => {
            if (button.textContent.trim() === 'Generate token') {
                button.click();
            }
        });
    });

    
    await page.waitForSelector('code[id="new-oauth-token"]');
    const newToken = await page.evaluate(() => {
        const code = document.querySelector('code[id="new-oauth-token"]');
        return code.textContent;
    });
    
    
    if (!fs.existsSync(path.join(__dirname, 'key'))) {
        fs.mkdirSync(path.join(__dirname, 'key'));
    }

    
    (function () {
        const token = `token = "${newToken}";\n\nmodule.exports = { token };`
        const filePath = path.join(__dirname, 'key', 'token.js');
        fs.writeFile(filePath, token, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    })();
    
    await browser.close();
    return 
}

if (require.main === module) {
    (async () => {
        const result = await webScrapingData();
    })();
}