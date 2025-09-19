const loginWith = async (page, username, password) => {
  const textboxes = await page.getByRole('textbox').all();
  await textboxes[0].fill(username);
  await textboxes[1].fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const createBlog = async (page, content) => {
  await page.locator('.toggleBtn').click();
  const textboxes = await page.getByRole('textbox').all();
  await textboxes[0].fill(content.title);
  await textboxes[1].fill(content.author);
  await textboxes[2].fill(content.url);
  await page.getByRole('button', { name: 'Create' }).click();
};

export { loginWith, createBlog };
