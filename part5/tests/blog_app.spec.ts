import { test, expect } from '@playwright/test';
import { createBlog, loginWith } from './helper';

test.beforeEach('for test', async ({ page }) => {
  // await page.goto('http://localhost:5173');
  await page.goto('/');
});

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
    await request.post('/api/users', {
      data: {
        name: 'user2',
        username: 'user2',
        password: 'user2',
      },
    });

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await page.goto('/');

    const locator = page.getByText('Login').first();
    await expect(locator).toBeVisible();
    await expect(page.getByText('username')).toBeVisible();
    await expect(page.getByText('password')).toBeVisible();
  });

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // const textboxes = await page.getByRole('textbox').all();
      // await textboxes[0].fill('qqq');
      // await textboxes[1].fill('bbb');
      await loginWith(page, 'miamiamia', 'miamiamia');
      await expect(page.getByText('login succeeded')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'crtest', 'wrong');
      const errorDiv = page.locator('.msgWrap');
      await expect(page.getByText('login fail')).toBeVisible();
      await expect(errorDiv).toHaveCSS('border-style', 'solid');
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');
      await expect(page.getByText('crtest logged in')).not.toBeVisible();
    });
  });

  test.describe('when logged in', () => {
    test('a new note can be created', async ({ page }) => {
      await loginWith(page, 'miamiamia', 'miamiamia');
      await createBlog(page, {
        title: 'title-test',
        author: 'author-test',
        url: 'url-test',
      });
      await expect(page.getByText('add succeed')).toBeVisible();
      await expect(page.getByText('title-test')).toBeVisible();
    });
  });

  test.describe('when after logged in', () => {
    test('a new note can be created', async ({ page }) => {
      await loginWith(page, 'miamiamia', 'miamiamia');
      await createBlog(page, {
        title: 'title-test',
        author: 'author-test',
        url: 'url-test',
      });
      await expect(page.getByText('add succeed')).toBeVisible();
      await expect(page.getByText('title-test')).toBeVisible();
    });

    test('a new note can be liked', async ({ page }) => {
      await loginWith(page, 'miamiamia', 'miamiamia');
      await createBlog(page, {
        title: 'liked-title-test',
        author: 'author-test',
        url: 'url-test',
      });

      await page.locator('.showAllBtn').click();
      await page.locator('.likesBtn').click();

      await expect(page.getByText('likes succeed')).toBeVisible();
    });

    test('only the user who added the blog sees the delete button', async ({
      page,
    }) => {
      await loginWith(page, 'miamiamia', 'miamiamia');
      await expect(page.locator('.toggleBtn')).toBeVisible();
      await createBlog(page, {
        title: 'removed-title-test-1',
        author: 'author-test',
        url: 'url-test',
      });
      await page.locator('.logoutBtn').click();
      await loginWith(page, 'user2', 'user2');
      await page.locator('.showAllBtn').click();
      await expect(page.locator('.removeBtn')).not.toBeVisible();
    });

    test('the user who added the blog can delete the blog', async ({
      page,
    }) => {
      await loginWith(page, 'miamiamia', 'miamiamia');
      await expect(page.locator('.toggleBtn')).toBeVisible();
      await createBlog(page, {
        title: 'removetest',
        author: 'author-test',
        url: 'url-test',
      });
      await expect(
        page.locator('.blogTitle', { hasText: 'removetest' })
      ).toBeVisible();
      const blogItem = page.locator('.blogItemWrap');
      await blogItem.locator('.showAllBtn').click();
      await expect(blogItem.locator('.removeBtn')).toBeVisible();

      // 先监听弹窗
      page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept(); // 点 "确定"
      });

      // 然后再点击删除按钮
      await page.locator('.removeBtn').click();
      await expect(blogItem).toHaveCount(0, { timeout: 5000 });
      await expect(page.getByText('delete succeed')).toBeVisible();
    });

    test.only('blogs are arranged in the order according to the likes', async ({
      page,
    }) => {
      await loginWith(page, 'miamiamia', 'miamiamia');
      await createBlog(page, {
        title: 'Blog 1',
        author: 'Author A',
        url: 'url1',
      });
      await createBlog(page, {
        title: 'Blog 2',
        author: 'Author B',
        url: 'url2',
      });
      await createBlog(page, {
        title: 'Blog 3',
        author: 'Author C',
        url: 'url3',
      });
      await expect(page.getByText('Blog 1')).toBeVisible();
      await expect(page.getByText('Blog 2')).toBeVisible();
      await expect(page.getByText('Blog 3')).toBeVisible();

      const blogItems = await page.locator('.blogItemWrap').all();

      await blogItems[0].locator('.showAllBtn').click();
      await blogItems[0].locator('.likesBtn').click();
      await blogItems[0].locator('.likesBtn').click();

      // Like Blog 2 five times
      await blogItems[1].locator('.showAllBtn').click();
      for (let i = 0; i < 5; i++) {
        await blogItems[1].locator('.likesBtn').click();
      }

      // Blog 3 no likes

      const blogsAfterLikes = await page.locator('.blogItem').all();

      const likesArray = [];
      for (const blog of blogsAfterLikes) {
        const likesText = await blog.locator('.likesCount').innerText();
        likesArray.push(Number(likesText));
      }

      const sortedLikes = [...likesArray].sort((a, b) => b - a);
      expect(likesArray).toEqual(sortedLikes);
    });
  });
});
