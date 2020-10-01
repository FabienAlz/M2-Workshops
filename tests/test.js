const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
 

const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function validWorkshopCreation() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.linkText("Create new workshop")).click();
  } finally {
  }
})();
