import { Locator, Page, expect } from "@playwright/test";

export class SignedInEditAccountPage {
  private page: Page;
  private heading: Locator;
  private cancelMyAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator("h3", { hasText: "Edit User" });
    this.cancelMyAccountButton = page.locator(
      'input[value="Cancel my account"]'
    );
  }

  async goToPage(url: string = "/users/edit") {
    await this.page.goto(url);
  };

  async navigatedToPage(url: string = "/users/edit") {
    await this.page.waitForURL(url);
    expect(this.page.url().includes(url)).toBe(true);
    await expect(this.heading).toBeVisible();
  };

  async cancelMyAccount() {
    this.page.on("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });

    await this.cancelMyAccountButton.click();
  };
}