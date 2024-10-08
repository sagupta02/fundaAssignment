const { test, expect } = require('@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default
const { setGDPRCookies } = require('../helpers/login.helper');

test.use({
 userAgent: `Funda Interviewee/1.0.0 (${process.env.USER_AGENT_SECRET})`,
})
test.beforeEach(async ({context, page}) => {
  await setGDPRCookies(context);
  await page.goto('https://www.funda.nl/')
})

test.describe('Funda website homepage:', () => {
 test('should be loaded', async ({page}) => {
  await expect(page).toHaveTitle(
   'Zoek huizen en appartementen te koop / huur in Nederland [funda]'
  )
 })

 test('should show important buttons', async ({ page }) => {
  await expect(page.getByTestId('search-box')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Inloggen' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Huur' })).toBeVisible()
  await expect(page.getByLabel('Zoek op kaart')).toBeVisible()
 })
})

test.describe('Funda Search functionality: ', () => {
  test('search page should load results', async ({ page }) => {
    await page.getByTestId('search-box').click();
    await page.getByTestId('search-box').fill('Den Haag');
    await page.getByRole('option', { name: 'Den Haag Plaats in Zuid-' }).click();
    await expect(page.locator('[data-test-id="filter-count-button"]')).toBeVisible();
    await expect(page.locator('div[data-test-id="search-result-item"]')).not.toHaveCount(0)
  })
  
  test('search page should show filters', async ({ page }) => {
  })
})

test.describe('Funda Property Detail page:', () => {
  test('should load the property details', async ({ page }) => {
    await page.getByTestId('search-box').click();
    await page.getByTestId('search-box').fill('Den Haag');
    
})
})

test.describe('Funda User Authentication', () => {
  test('should let user login', async ({ page }) => {
    await page.getByRole('button', { name: 'Inloggen' }).click()
    await page.getByLabel('E-mailadres').click();
    await page.getByLabel('E-mailadres').fill(process.env.LOGIN_USERNAME);
    await page.getByLabel('Wachtwoord').click();
    await page.getByLabel('Wachtwoord').fill(process.env.LOGIN_PASSWORD);
    await page.getByRole('button', { name: 'Log in' }).click();
  
    await expect(page).toHaveTitle(
      'Zoek huizen en appartementen te koop / huur in Nederland [funda]'
     )   
  })
})

test.describe('Funda Mobile responsiveness', () => {})

test.describe('Funda Home page performance', () => {
  test('should match the thresholds', async ({ page }) => {
    const startTime = Date.now();
    await page.waitForLoadState('load')

    const metrics = await page.evaluate(() => {
      const [navigationEntry] = performance.getEntriesByType('navigation');

      return {
        domContentLoaded: navigationEntry.domContentLoadedEventEnd,
        loadEvent: navigationEntry.loadEventEnd,
        timeToFirstByte: navigationEntry.responseStart - navigationEntry.requestStart,
      };

    })
    console.log('Page Load Performance Metrics:', metrics);
    expect(metrics.domContentLoaded).toBeLessThan(1000);// 1 seconds max for DOMContentLoaded
    expect(metrics.loadEvent).toBeLessThan(1000); // 1 seconds max for full page load
    expect(metrics.timeToFirstByte).toBeLessThan(500); 
  })
})

test.describe('Funda Home page accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://www.funda.nl/');

    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
})

test.describe('Funda Home page visual checks', () => {
  test('clicking on Map should load correct city map', async ({ page }) => {
    await page.getByTestId('search-box').click();
    await page.getByTestId('search-box').fill('Den Haag');
    await page.getByRole('option', { name: 'Den Haag Plaats in Zuid-' }).click();
    await page.getByRole('button', { name: 'Kaart' }).click();

    await expect(page).toHaveScreenshot();
  });
})
