
import fakerRU  from 'faker'
import puppeteer from "puppeteer";
const APP = "https://dapsite.ru/"

const lead = {
  name: fakerRU.name.firstName(),
  email: fakerRU.internet.email(),
  address: fakerRU.address.streetAddress(),
  phone: fakerRU.phone.phoneNumber(),
  message: fakerRU.random.words()
};
const width = 1920;
const height = 1080;
let page;
let browser;
let res;
let url

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.goto(APP);
  await page.setViewport({ width, height });
  await page.setRequestInterception(true);
 page.on('request', (request) => {
   if (request.resourceType() === 'xhr' ) {
          return url = request.url()
        }
        request.continue();
    });

    // Monitor responses
  page.on('response', (response) => {
        if (response.request().resourceType() === 'xhr' ) {
          return  res = response.status()
        }
    });
});


afterAll(() => {
  browser.close();
});
test("форма заказть звонок открываеться",async()=>{
  await page.$eval(
  '[data-popupname="Zayavka"]',
  (el) => {
    el.click()
  });
   await page.waitForSelector(".popUpZayavka ");
},10000)





test("форому заказа можно отправить",async()=>{
  await page.click('.inputtext[placeholder="Ваше имя..."]')
  await page.type('.inputtext[placeholder="Ваше имя..."]', 'кирилл')
  await page.click('.phoneNumber')
  await page.waitForSelector('.phoneNumber')
  await page.keyboard.down('0');
  await page.keyboard.down('0');
  await page.keyboard.down('0');
  await page.keyboard.down('0');
  await page.keyboard.down('0');
  await page.keyboard.down('0');
  await page.keyboard.down('0');
  await page.keyboard.down('0');
  await page.keyboard.down('0');
  await page.keyboard.down('0');
  await page.click('.btn[type="submit"]')
  await page.waitForSelector('.aaaa')
},50000)
