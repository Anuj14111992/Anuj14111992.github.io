// @ts-check
const { test, expect } = require('@playwright/test');

const sections = [
  { link: 'About', id: 'about' },
  { link: 'Work', id: 'work' },
  { link: 'Skills', id: 'skills' },
  { link: 'Experience', id: 'experience' },
  { link: 'Contact', id: 'contact' },
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('page loads with title and hero', async ({ page }) => {
  await expect(page).toHaveTitle(/Anuj Chauhan/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('test automation');
});

for (const { link, id } of sections) {
  test(`nav link "${link}" scrolls to #${id}`, async ({ page, isMobile }) => {
    if (isMobile) await page.getByTestId('menu-button').click();
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: link, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  });
}

test('contact links point to the right places', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:anujchauhan411@gmail.com');
  await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', /linkedin\.com\/in\/anuj-chauhan-b99564132/);
  await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', /github\.com\//);
});

test('page has no JavaScript errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));   // uncaught JS errors only, not font/network hiccups
  await page.reload();
  expect(errors).toEqual([]);
});

test('no horizontal scroll on this viewport', async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
