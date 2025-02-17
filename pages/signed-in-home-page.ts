import { Locator, Page, expect } from "@playwright/test";

import { HomePage } from "./home-page";

export class SignedInHomePage extends HomePage {
  private signedInAlert: Locator;
  private signedUpAlert: Locator;
  private headerEditAccountNav: Locator;
  private headerCampaignsNav: Locator;
  private headerSignOutNav: Locator;

  constructor(page: Page) {
    super(page);

    this.signedInAlert = page.locator("#flash_notice", {
      hasText: "Signed in successfully.",
    });
    this.signedUpAlert = page.locator("#flash_notice", {
      hasText: "Welcome! You have signed up successfully.",
    });
    this.headerEditAccountNav = this.headerNavBar.getByText("Edit account");
    this.headerCampaignsNav = this.headerNavBar.getByText("Campaigns");
    this.headerSignOutNav = this.headerNavBar.getByText("Sign out");
  };

  async navigatedToPage(url: string = "/") {
    await this.page.waitForURL(url);
    expect(this.page.url().includes(url)).toBe(true);
    await expect(this.heading).toBeVisible();
  };

  async verifyElements() {
    await expect(this.headerNavBar).toBeVisible();
    await expect(this.headerLogo).toBeVisible();
    await expect(this.headerLogo).toHaveAttribute("href", "/");
    await expect(this.headerHomeNav).toBeVisible();
    await expect(this.headerHomeNav).toHaveAttribute("href", "/");
    await expect(this.headerEditAccountNav).toBeVisible();
    await expect(this.headerEditAccountNav).toHaveAttribute(
      "href",
      "/users/edit"
    );
    await expect(this.headerCampaignsNav).toBeVisible();
    await expect(this.headerCampaignsNav).toHaveAttribute("href", "/campaigns");
    await expect(this.headerSignOutNav).toBeVisible();
    await expect(this.headerSignOutNav).toHaveAttribute(
      "href",
      "/users/sign_out"
    );
  }

  async verifySignedInAlert() {
    await expect(this.signedInAlert).toBeVisible();
  };

  async verifySignedUpAlert() {
    await expect(this.signedUpAlert).toBeVisible();
  };

  async clickCampaignsNav() {
    await this.headerCampaignsNav.click();
  };
}