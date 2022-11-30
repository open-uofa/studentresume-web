require("chromedriver");

// To test you need to download chromedriver from: https://chromedriver.chromium.org/downloads
// Make sure that you have installed the needed dependencies
// npm install selenium-webdriver chromedriver
// Then go to the src directory and run 
// node test/seleniumTests.js

const { Builder, By, Key, until } = require('selenium-webdriver');

async function testMinimalForm() {
  //open Chrome browser
  let driver = await new Builder().forBrowser('chrome').build();
  try {

    // open the website
    await driver.get('http://localhost:3000/');

    // go to the form page
    await driver.findElement(By.id("goToForm")).click();

    // fill in personal information section
    await driver.findElement(By.xpath('(//*[@id="name"])[1]')).sendKeys('someName');
    await driver.findElement(By.id("label")).sendKeys('SEI');
    await driver.findElement(By.id("email")).sendKeys('email@hotmail.com');
    await driver.findElement(By.id("phone")).sendKeys('(163) 819-2912');
    await driver.findElement(By.id("url")).sendKeys('http://localhost:3000');
    await driver.findElement(By.xpath('(//*[@id="summary"])[1]')).sendKeys('A good summary');
    await driver.findElement(By.id('country')).click();
    await driver.findElement(By.id('DZ')).click();
    await driver.findElement(By.id('state')).click();
    await driver.findElement(By.id('34')).click();
    await driver.findElement(By.id('city')).click();
    await driver.findElement(By.id('Mansourah')).click();

    // fill in education section
    await driver.findElement(By.id("education")).click();
    await driver.findElement(By.id("institution")).sendKeys('My University');
    await driver.findElement(By.id("area")).sendKeys('CS');
    await driver.findElement(By.id("studyType")).sendKeys('Masters');
    await driver.findElement(By.xpath('(//*[@id="startDate"])[3]')).sendKeys('2022-11');
    await driver.findElement(By.xpath('(//*[@id="endDate"])[3]')).sendKeys('2022-12');

    // fill in skills section
    await driver.findElement(By.id("skills")).click();
    await driver.findElement(By.xpath('(//*[@id="name"])[4]')).sendKeys('Skill 1');
    await driver.findElement(By.id("level")).sendKeys('Level 1');
    await driver.findElement(By.id("keywords")).sendKeys('someKeyword');
    await driver.findElement(By.id("skillsaddKeyword")).click();

    //go to review -> theme -> preview pdf
    await driver.findElement(By.id("goToReview")).click();
    await driver.sleep(300);
    await driver.findElement(By.id("ReviewPageSelectTheme")).click();
    await driver.findElement(By.id("theme2")).click();
    await driver.sleep(1000);
    await driver.findElement(By.id("backToForm")).click();

  } finally {
    //close the browser
    await driver.quit();
  }
}

async function testAutoSave() {

  let driver = await new Builder().forBrowser('chrome').build();
  try {

    //open the website
    await driver.get('http://localhost:3000/');

    // go to the form page
    await driver.findElement(By.id("goToForm")).click();

    // fill in personal information section
    await driver.findElement(By.xpath('(//*[@id="name"])[1]')).sendKeys('someName');
    await driver.findElement(By.id("label")).sendKeys('SEI');
    await driver.findElement(By.id("email")).sendKeys('email@hotmail.com');
    await driver.findElement(By.id("phone")).sendKeys('(163) 819-2912');
    await driver.findElement(By.id("url")).sendKeys('http://localhost:3000');
    await driver.findElement(By.xpath('(//*[@id="summary"])[1]')).sendKeys('A good summary');
    await driver.findElement(By.id('country')).click();
    await driver.findElement(By.id('DZ')).click();
    await driver.findElement(By.id('state')).click();
    await driver.findElement(By.id('34')).click();
    await driver.findElement(By.id('city')).click();
    await driver.findElement(By.id('Mansourah')).click();

    // fill in education section
    await driver.findElement(By.id("education")).click();
    await driver.findElement(By.id("institution")).sendKeys('My University');
    await driver.findElement(By.id("area")).sendKeys('CS');
    await driver.findElement(By.id("studyType")).sendKeys('Masters');
    await driver.findElement(By.xpath('(//*[@id="startDate"])[3]')).sendKeys('2022-11');
    await driver.findElement(By.xpath('(//*[@id="endDate"])[3]')).sendKeys('2022-12');

    // fill in skills section
    await driver.findElement(By.id("skills")).click();
    await driver.findElement(By.xpath('(//*[@id="name"])[4]')).sendKeys('Skill 1');
    await driver.findElement(By.id("level")).sendKeys('Level 1');
    await driver.findElement(By.id("keywords")).sendKeys('someKeyword');
    await driver.findElement(By.id("skillsaddKeyword")).click();

    //go to review -> theme -> preview pdf
    await driver.findElement(By.id("goToReview")).click();
    await driver.sleep(300);
    await driver.findElement(By.id("backToForm")).click();
    await driver.findElement(By.id("goToReview")).click();

  } finally {
    //close the browser
    await driver.quit();
  }
}

async function testWholeForm() {
  //open Chrome browser
  let driver = await new Builder().forBrowser('chrome').build();
  try {

    //open the website
    await driver.get('http://localhost:3000/');

    // click on the go to form button
    await driver.findElement(By.id("goToForm")).click();

    await driver.findElement(By.xpath('(//*[@id="name"])[1]')).sendKeys('someName');
    await driver.findElement(By.id("label")).sendKeys('SEI');
    await driver.findElement(By.id("email")).sendKeys('email@hotmail.com');
    await driver.findElement(By.id("phone")).sendKeys('(163) 819-2912');
    await driver.findElement(By.id("url")).sendKeys('http://localhost:3000');
    await driver.findElement(By.xpath('(//*[@id="summary"])[1]')).sendKeys('A good summary');
    await driver.findElement(By.id('country')).click();
    await driver.findElement(By.id('DZ')).click();
    await driver.findElement(By.id('state')).click();
    await driver.findElement(By.id('34')).click();
    await driver.findElement(By.id('city')).click();
    await driver.findElement(By.id('Mansourah')).click();


    await driver.findElement(By.id("education")).click();
    await driver.findElement(By.id("institution")).sendKeys('My University');
    await driver.findElement(By.id("area")).sendKeys('CS');
    await driver.findElement(By.id("studyType")).sendKeys('Masters');
    await driver.findElement(By.xpath('(//*[@id="startDate"])[3]')).sendKeys('2022-11');
    await driver.findElement(By.xpath('(//*[@id="endDate"])[3]')).sendKeys('2022-12');

    await driver.findElement(By.id("skills")).click();
    await driver.findElement(By.xpath('(//*[@id="name"])[4]')).sendKeys('Skill 1');
    await driver.findElement(By.id("level")).sendKeys('Level 1');
    await driver.findElement(By.id("keywords")).sendKeys('someKeyword');
    await driver.findElement(By.id("skillsaddKeyword")).click();

    // await driver.findElement(By.id("work")).click();
    // await driver.findElement(By.xpath('(//*[@id="name"])[2]')).sendKeys('Work 1');
    // await driver.findElement(By.id('position')).sendKeys('Fired');
    // await driver.findElement(By.xpath('(//*[@id="startDate"])[1]')).sendKeys('2022-11');
    // await driver.findElement(By.xpath('(//*[@id="endDate"])[1]')).sendKeys('2022-12');

    // await driver.findElement(By.id("volunteer")).click();
    // await driver.findElement(By.id('organization')).sendKeys('Google');
    // await driver.findElement(By.xpath('(//*[@id="startDate"])[2]')).sendKeys('2022-11');
    // await driver.findElement(By.xpath('(//*[@id="endDate"])[2]')).sendKeys('2022-12');

    // await driver.findElement(By.id("awards")).click();
    // await driver.findElement(By.id('title')).sendKeys('Best Selenium Tests');
    // await driver.findElement(By.id("date")).sendKeys('2022-10');
    // await driver.findElement(By.id('awarder')).sendKeys('Im the best');
    // await driver.findElement(By.xpath('(//*[@id="summary"])[4]')).sendKeys('I deserve it');

    // await driver.findElement(By.id("publications")).click();
    // await driver.findElement(By.xpath('(//*[@id="name"])[3]')).sendKeys('Pub 1');
    // await driver.findElement(By.id('publisher')).sendKeys('somePublisher');
    // await driver.findElement(By.id("releaseDate")).sendKeys('2022-10');
    // await driver.findElement(By.xpath('(//*[@id="summary"])[5]')).sendKeys('someSummary');

    // await driver.findElement(By.id("projects")).click();
    // await driver.findElement(By.xpath('(//*[@id="name"])[5]')).sendKeys('Project1');
    // await driver.findElement(By.id('description')).sendKeys('someDesc');
    // await driver.findElement(By.xpath('(//*[@id="keywords"])[2]')).sendKeys('Project1');
    // await driver.findElement(By.id("projectsaddKeyword")).click();
    // await driver.findElement(By.xpath('(//*[@id="startDate"])[4]')).sendKeys('2022-11');
    // await driver.findElement(By.xpath('(//*[@id="endDate"])[4]')).sendKeys('2022-12');

    await driver.findElement(By.id("goToReview")).click();
    await driver.sleep(300);
    await driver.findElement(By.id("ReviewPageSelectTheme")).click();
    await driver.findElement(By.id("theme2")).click();
    await driver.sleep(1000);
    await driver.findElement(By.id("backToForm")).click();

    //This is to test JSON click here button
    //await driver.findElement(By.linkText("here")).click();

  } finally {
    //close the browser
    await driver.quit();
  }
}


async function testAll() {

  //open Chrome browser
  testMinimalForm();
  testAutoSave();
  //testWholeForm();

}

testAll();