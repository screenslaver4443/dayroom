const playwright = require('playwright');
const cheerio = require('cheerio')
const dotenv = require('dotenv')

dotenv.config()

async function daymapScrape(dmapusername, dmappassword) {
    async function login(username, password) {
        let title = await page.title();
        if (title === 'EdPass Service') {
            await page.click('tr[data-idp-name="glenungainternationalhighschool"]');
            await page.click('span[class="continue_button button"]');
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
        else {
            throw new Error('Unknown page: '+title);
        }
        }
    async function extractTaskData() {
        await page.waitForSelector('table[class="rgMasterTable"]');
        let dtaskstble = [];
        await page.waitForLoadState('load');
        let html = await page.content();

        const $ = cheerio.load(html);
        const tablebody = $('table.rgMasterTable').children('tbody');
        tablebody.find('tr').each((index, element) => {
            if ($(element).hasClass('rgGroupHeader')) {
                return; // Skip headers
            }
            let items = [];
            $(element).find('td').each((index, element) => {
                items.push($(element).text());
            });
            dtaskstble.push(items);
        });
        // for loop to convert the array into objects 
        for (let i = 0; i < dtaskstble.length; i++) {
            let obj = {};
            obj['subject'] = dtaskstble[i][2];
            obj['task'] = dtaskstble[i][4];
            obj['due'] = dtaskstble[i][6];
            obj['assesment'] = dtaskstble[i][8];
            obj['status'] = dtaskstble[i][9];
            dtaskstble[i] = obj;
        }
        return dtaskstble;
    }
    const browser = await playwright.chromium.launch({headless: true});

    const page = await browser.newPage();
    await page.goto('https://gihs.daymap.net/daymap/student/assignments.aspx');
    // await page.waitForEvent('load');
    await login(dmapusername, dmappassword);
    var dtaskstble = await extractTaskData();
    await browser.close();
    return dtaskstble;
}

//Test
(async () => {
    console.log(await daymapScrape(process.env["DM_username"], process.env["DM_password"]))
})()