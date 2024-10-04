// @ts-check
const { test, expect } = require('@playwright/test');
const {chromium} = require('playwright');

test.use({ userAgent: 'Funda Interviewee/1.0.0 (6ea6847d-a9f5-41a2-9056-88576f6b02ed)' });
test.describe('Funda website', ()=> {


  // Add page objects, Add cookie handling
  // Add Secret handling via github

  
  test('has title', async ({  }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    // The below can be part of cookie utility
    const cookies = [
      {
        name: 'euconsent-v2', // Cookie name (change as per the website)
        value: 'CQF3YIAQF3YIAAHABBENBJFgAP7gAAAAABpYGgNBzC5dRAFCAD5wYNsAOQQVoNAABEQgAAIAAgABwAKAIAQCkEAAFADgAAACAAAAIAIBAAJAEAAAAQAAAAAAAAAAQAAAAAIIIAAAgAIBAAAIAAAAAAAAQAAAgAACAAAAkAAAAIIAQEAABAAAAMQAAwABBT8lABgACCn5SADAAEFPx0AGAAIKfhIAMAAQU_LQAYAAgp-A.f9wAAAAAAAAA',    // Value indicating consent (check the actual value from browser)
        // value: 'true',
        domain: '.funda.nl',  // Domain for the website
        path: '/',            // Path for the cookie
        expires: -1,          // Cookie expiration (-1 means session cookie)
        httpOnly: false,      // Set to true if it's an HTTP-only cookie
        secure: true          // Set to true for HTTPS-only cookies
      }
    ];
    
    // Add the cookie to the context before opening the page
    await context.addCookies(cookies);
    await page.goto('https://www.funda.nl/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Zoek huizen en appartementen te koop / huur in Nederland [funda]');
  });
})

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
