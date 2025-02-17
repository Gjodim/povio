import { Locator, Page, expect } from "@playwright/test";

import { HomePage } from "./home-page";

export class SignInPage extends HomePage {
  private url: string;
  private signInForm: Locator;
  private signInText: Locator;
  private signUpButton: Locator;
  private emailField: Locator;
  private passwordField: Locator;
  private rememberMeCheckbox: Locator;
  private signInButton: Locator;
  private flashAlert: Locator;

  constructor(page: Page) {
    super(page);

    this.url = "/users/sign_in";
    this.signInForm = this.page.locator("#new_user");
    this.signInText = this.signInForm.locator("h3", { hasText: "Sign in" });
    this.signUpButton = this.signInForm.locator("a", { hasText: "Sign up" });
    this.emailField = this.signInForm.locator("#user_email");
    this.passwordField = this.signInForm.locator("#user_password");
    this.rememberMeCheckbox = this.signInForm.locator("#user_remember_me");
    this.signInButton = this.signInForm.locator('input[value="Sign in"]');
    this.flashAlert = page.locator("#flash_alert");
  }

  async goToPage(url: string = "/users/sign_in") {
    await this.page.goto(url);
  };

  async navigatedToPage(url: string = this.url) {
    await this.page.waitForURL(url);
    expect(this.page.url().includes(url)).toBe(true);
  };

  async verifyElements() {
    this.verifyHeaderElements();
    await expect(this.signInForm).toBeVisible();
    await expect(this.signInText).toBeVisible();
    await expect(this.signUpButton).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.rememberMeCheckbox).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  };

  async typeInEmailField(input) {
    await this.emailField.fill(input);
  };

  async typeInPasswordField(input) {
    await this.passwordField.fill(input);
  };

  async clickSignInButton() {
    await this.signInButton.click();
  };

  async verifyValidationMessage() {
    await expect(this.flashAlert).toBeVisible();
  };

  async clickSignUpButton() {
    await this.signUpButton.click();
  };
}