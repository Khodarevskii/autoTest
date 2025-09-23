
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


jest.setTimeout(100000)

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: [`--window-size=${width},${height}`]
  });

  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(APP);
 page.on('request', (request) => {
   if (request.resourceType() === 'xhr' ) {
          console.log( request.url())
          return url = request.url()
        }
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
  await page.type('.inputtext[placeholder="Ваше имя..."]',lead.name)
  await page.click('[type="submit"]')
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
  await page.click('[type="submit"]')
  await page.waitForResponse(url);
  await expect(res).toBe(200)
},1000000)
