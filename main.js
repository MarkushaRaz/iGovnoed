const puppeteer = require('puppeteer');

let Name = GetName();

function GetName() {
    let result;

    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            result = `${data.results[0].name.first} ${data.results[0].name.last}`;
            return result;
        });
}

async function main() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.evaluateOnNewDocument(() => {
        delete navigator.__proto__.webdriver;
    });

    console.log('> Successful new session');

    await page.goto('http://rz.rf.gd', {waitUntil:'domcontentloaded'});

    page.type('#name', Name);
    page.type('#comment', 'Роблокс!');

    await browser.close();
}

setTimeout(main, 2000);