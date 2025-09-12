import { test, expect } from '@playwright/test';
import { createBlog, loginWith } from './helper';

// test.beforeEach('for test', async ({ page }) => {
//   await page.goto('http://localhost:5173');
// });

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'miamiamia',
        username: 'miamiamia',
        password: 'miamiamia',
      },
    });

    await page.goto('http://localhost:5173');
  });
  test('front page can be opened', async ({ page }) => {
    // await page.goto('http://localhost:5173');
    await page.goto('/');

    const locator = page.getByText('Login').first();
    await expect(locator).toBeVisible();
    await expect(page.getByText('username')).toBeVisible();
  });

  test('user can log in', async ({ page }) => {
    // await page.goto('http://localhost:5173');
    await page.goto('/');

    // const textboxes = await page.getByRole('textbox').all();
    // await textboxes[0].fill('qqq');
    // await textboxes[1].fill('bbb');
    await loginWith(page, 'miamiamia', 'miamiamia');
    await expect(page.getByText('login succeeded')).toBeVisible();
  });

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'miamiamia', 'miamiamia');
    });

    test('login fails with wrong password', async ({ page }) => {
      await loginWith(page, 'crtest', 'wrong');
      const errorDiv = page.locator('.msgWrap');
      await expect(page.getByText('login fail')).toBeVisible();
      await expect(errorDiv).toHaveCSS('border-style', 'solid');
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');
      await expect(page.getByText('crtest logged in')).not.toBeVisible();
    });

    test('a new note can be created', async ({ page }) => {
      createBlog(page, {
        title: 'title-test',
        author: 'author-test',
        url: 'url-test',
      });
      await expect(page.getByText('add succeed')).toBeVisible();
    });
  });
});
