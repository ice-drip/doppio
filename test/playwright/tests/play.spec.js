const { test, expect } = require('@playwright/test');
const {resolve} = require("path");
const cwd = process.cwd()
const indexPath = "file://"+resolve(cwd,"src/index.html");
test('basic test', async ({ page }) => {

  await page.goto(indexPath);
  page.on("dialog",async (dialog) => {
    console.log(dialog.message());
    expect(dialog.message()).toEqual("Please use a regular browser to access")
    await dialog.accept();
  });
  const h1 = page.locator("h1");
  console.log(h1);
  await expect(h1).toHaveText("page data")

});