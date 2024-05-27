const  {test,expect} = require('@playwright/test')

test('Valid Login',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button.radius[type="submit"]');
    await page.waitForURL('https://the-internet.herokuapp.com/secure');
    const secureAreaMessage = await page.textContent('#flash-messages');
    console.assert(secureAreaMessage.includes('You logged into a secure area!'), 'Valid login test complete');

})

test('Invalid Login',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmithasdfasdf');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button.radius[type="submit"]');
    const secureAreaMessage = await page.textContent('#flash-messages');
    console.assert(secureAreaMessage.includes('Your username is invalid!'), 'Invalid login test complete');

})

test('Invalid Password',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecr11etPassword!');
    await page.click('button.radius[type="submit"]');
    const secureAreaMessage = await page.textContent('#flash-messages');
    console.assert(secureAreaMessage.includes('Your password is invalid!'), 'Invalid password test complete');

})