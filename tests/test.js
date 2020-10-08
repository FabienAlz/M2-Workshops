const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const assert = require('assert');
const AssertionError = require('assert').AssertionError;

const { Builder, By, Key, until } = require('selenium-webdriver');
const URL = "http://localhost:3000";
let driver = new Builder().forBrowser('firefox').build();

(async function validWorkshopCreation() {
  try {
    await driver.get(URL);
    await console.log("[~] Test : Trying to add a new valid workshop");
    let startingNumberOfWorkshops = 0;
    await driver.findElements(By.className("media my-4")).then((workshops) => {
      startingNumberOfWorkshops = workshops.length;
    })
    await driver.findElement(By.linkText("Create new workshop")).click();
    assert.strictEqual(await driver.getCurrentUrl(), URL + '/workshop', 'Wrong URL');
    await driver.findElement(By.id("name")).sendKeys('Liquides durs et solides mous', Key.ENTER);
    await driver.findElement(By.id("description")).sendKeys('Découverte de fluides complexes,gels, matériaux granulaires, ...');
    await driver.findElement(By.css("button")).click();

    let currentNumberOfWorkshops = 0;
    await driver.findElements(By.className("media my-4")).then((workshops) => {
      currentNumberOfWorkshops = workshops.length;
    })
    assert.strictEqual(currentNumberOfWorkshops - startingNumberOfWorkshops, 1, 'Wrong number of workshops');

    let workshops = (await driver.findElements(By.className("media-body")));
    let textPromise = workshops[workshops.length - 1].getText();
    await textPromise.then((text) => {
      assert.strictEqual(text, "Liquides durs et solides mous\nDécouverte de fluides complexes,gels, matériaux granulaires, ...", 
      'The text of the created workshop is not the one entered by the user');
    });
    console.log("[+] Test : Trying to add a new valid workshop");
  } catch (e) {
    console.log("[-] Test : Trying to add a new valid workshop\n"+e);
  }
})().then(function () {
  (async function cancelWorkshopCreation() {
    try {
      await driver.get(URL);
      await console.log("[~] Test : Canceling a workshop creation");

      let workshopsBeforeCanceling = (await driver.findElements(By.className("media-body")));
      let workshopsBeforeCancelingText = [];
      for(let i = 0; i < workshopsBeforeCanceling.length; i ++) {
        workshopsBeforeCancelingText.push(workshopsBeforeCanceling[i].getText());
      } 
      let startingNumberOfWorkshops = 0;
      await driver.findElements(By.className("media my-4")).then((workshops) => {
        startingNumberOfWorkshops = workshops.length;
      })
      await driver.findElement(By.linkText("Create new workshop")).click();
      assert.strictEqual(await driver.getCurrentUrl(), URL + '/workshop', 'Wrong URL');
      await driver.findElement(By.id("name")).sendKeys('Liquides durs et solides mous', Key.ENTER);
      await driver.findElement(By.id("description")).sendKeys('Découverte de fluides complexes,gels, matériaux granulaires, ...');
      await driver.findElement(By.linkText("Cancel")).click();
      
      let currentNumberOfWorkshops = 0;
      await driver.findElements(By.className("media my-4")).then((workshops) => {
        currentNumberOfWorkshops = workshops.length;
      })
      assert.strictEqual(currentNumberOfWorkshops, startingNumberOfWorkshops, 'Wrong number of workshops');
      
      // checks if all the workshops after cancelling are the same as the one before
      let workshopsAfterCanceling = (await driver.findElements(By.className("media-body")));
      for(let i = 0; i < workshopsAfterCanceling.length; i++) {
        let textPromise = workshopsAfterCanceling[i].getText();
        let textAfterCanceling = "";
        await textPromise.then((text) => {
          textAfterCanceling = text;
        });
        assert.strictEqual(textAfterCanceling, await workshopsBeforeCancelingText[i], 'The list is different after canceling');
      }
      
      console.log("[+] Test : Canceling a workshop creation");
    } catch (e) {
      console.log("[-] Test : Canceling a workshop creation\n"+e);
    }
  })().then(
    (async function invalidWorkshopCreation() {
      try {
        await driver.get(URL);
        console.log("[~] Test : Trying to add a workshop with blank fields");
        await driver.findElement(By.linkText("Create new workshop")).click();
        await driver.findElement(By.css("button")).click();
        assert.strictEqual(await driver.getCurrentUrl(), URL + "/workshop", 'Wrong URL');
        // checks if we're still on the workshop creation page
        assert.doesNotThrow(() => {
          driver.findElement(By.id("name"));
          driver.findElement(By.id("description"));
          driver.findElement(By.css("button"));
          driver.findElement(By.linkText("Cancel"));
        });
        console.log("[+] Test : Trying to add a workshop with blank fields");
      } catch (e) {
        console.log("[-] Test : Trying to add a workshop with blank fields\n"+e);
      }
    })
  )
});
