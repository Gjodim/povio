import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  protected heading: Locator;
  protected page: Page;
  protected headerNavBar: Locator;
  protected headerLogo: Locator;
  protected headerHomeNav: Locator;
  protected headerSignInNav: Locator;
  protected headerSignUpNav: Locator;
  protected signedOutAlert: Locator;
  protected canceledAccountAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator("h3", { hasText: "Welcome" });
    this.headerNavBar = page.locator(".navbar-povio");
    this.headerLogo = this.headerNavBar.locator(".logo");
    this.headerHomeNav = this.headerNavBar.getByText("Home");
    this.headerSignInNav = this.headerNavBar.getByText("Sign in");
    this.headerSignUpNav = this.headerNavBar.getByText("Sign up");
    this.signedOutAlert = page.locator("#flash_notice", {
      hasText: "Signed out successfully.",
    });
    this.canceledAccountAlert = page.locator("#flash_notice", {
      hasText:
        "Bye! Your account has been successfully cancelled. We hope to see you again soon.",
    });
  }

  async goToPage(url: string = "/") {
    await this.page.goto(url);
  };

  async navigatedToPage(url: string = "/") {
    await this.page.waitForURL(url);
    expect(this.page.url().includes(url)).toBe(true);
    await expect(this.heading).toBeVisible();
  };

  async verifyHeaderElements() {
    await expect(this.headerNavBar).toBeVisible();
    await expect(this.headerLogo).toBeVisible();
    await expect(this.headerLogo).toHaveAttribute("href", "/");
    await expect(this.headerHomeNav).toBeVisible();
    await expect(this.headerHomeNav).toHaveAttribute("href", "/");
    await expect(this.headerSignInNav).toBeVisible();
    await expect(this.headerSignInNav).toHaveAttribute(
      "href",
      "/users/sign_in"
    );
    await expect(this.headerSignUpNav).toBeVisible();
    await expect(this.headerSignUpNav).toHaveAttribute(
      "href",
      "/users/sign_up"
    );
  };

  async clickHomeButton() {
    await this.headerHomeNav.click();
  };

  async clickSignInButton() {
    await this.headerSignInNav.click();
  };

  async clickSignUpButton() {
    await this.headerSignUpNav.click();
  };

  async successfulSignOut() {
    await expect(this.signedOutAlert).toBeVisible();
  };

  async successfulCanceledAccount() {
    await expect(this.canceledAccountAlert).toBeVisible();
  };
}