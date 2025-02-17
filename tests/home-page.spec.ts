import { interceptGetRequest, verifyGetRequest } from "../api/api-steps";

import { HomePage } from "../pages/home-page";
import { test } from "@playwright/test";

test.describe("Home page tests", async () => {
  test("Navigation and elements", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToPage();
    await homePage.navigatedToPage();
    await homePage.clickHomeButton();
    await homePage.verifyHeaderElements();
  });
});