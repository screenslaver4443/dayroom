const playwright = require('playwright');
const cheerio = require('cheerio')
const dotenv = require('dotenv')
dotenv.config()

async function main(dmapusername, dmappassword) {
    async function login(username, password) {
        let title = await page.title();
        if (title === 'EdPass Service') {
            await page.click('tr[data-idp-name="glenungainternationalhighschool"]');
            // await page.click('span[class="continue_button button"]');
            await page.waitForLoadState('load')
            await page.fill('input[name="username"]', username);
            await page.fill('input[name="password"]', password);
            await page.click('input[id="okta-signin-submit"]');
        }
        else if (title === 'EdPass (0927) - Education South Australia - Sign In') {
            await page.fill('input[name="username"]', username);
            await page.fill('input[name="password"]', password);
            await page.click('input[id="okta-signin-submit"]');
        }
        // else {
        //     throw new Error('Unknown page '+title);
        // }
        }
    const browser = await playwright.chromium.launch({headless: false});

    const page = await browser.newPage();
    await page.goto('https://gihs.daymap.net/daymap/student/assignments.aspx');
    await page.waitForEvent('load');
    await login(dmapusername, dmappassword);
    console.log('logged in')
    // await page.waitForSelector('table[class="rgMasterTable"]')
    // let dtaskstble = []
    // await page.waitForLoadState('load')
    // let html = await page.content();

    // const ch = cheerio.load(html);
    // dtaskstble.push(ch('tr.rgRow').text())
    // console.log(dtaskstble)

    await browser.close();
}

//Test
main(process.env["DM_username"], process.env["DM_password"]);