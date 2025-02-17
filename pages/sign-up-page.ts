import { Locator, Page, expect } from "@playwright/test";

import { HomePage } from "./home-page";

export class SignUpPage extends HomePage {
  private url: string;
  private signUpForm: Locator;
  private signInText: Locator;
  private namelField: Locator;
  private emailField: Locator;
  private passwordField: Locator;
  private confirmPasswordField: Locator;
  private signUpButton: Locator;
  private validationMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.url = "/users/sign_up";
    this.signUpForm = this.page.locator("#new_user");
    this.signInText = this.signUpForm.locator("h3", { hasText: "Sign up" });
    this.namelField = this.signUpForm.locator("#user_name");
    this.emailField = this.signUpForm.locator("#user_email");
    this.passwordField = this.signUpForm.locator("#user_password");
    this.confirmPasswordField = this.signUpForm.locator(
      "#user_password_confirmation"
    );
    this.signUpButton = this.signUpForm.locator("input", {
      hasText: "Sign up",
    });
    this.validationMessage = this.signUpForm.locator("#error_explanation");
  }

  async navigatedToPage(url: string = this.url) {
    await this.page.waitForURL(url);
    expect(this.page.url().includes(url)).toBe(true);
  };

  async verifyElements() {
    this.verifyHeaderElements();
    await expect(this.signUpForm).toBeVisible();
    await expect(this.signInText).toBeVisible();
    await expect(this.namelField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.confirmPasswordField).toBeVisible();
    await expect(this.signUpButton).toBeVisible();
  };

  async typeInNameField(input: string) {
    await this.namelField.fill(input);
  };

  async typeInEmailField(input: string) {
    await this.emailField.fill(input);
  };

  async typeInPasswordField(input: string) {
    await this.passwordField.fill(input);
  };

  async typeInConfirmPasswordField(input: string) {
    await this.confirmPasswordField.fill(input);
  };

  async clickSignUpButton() {
    await this.signUpButton.click();
  };

  async verifyValidationMessage(validationText: string) {
    await expect(this.validationMessage).toBeVisible();
    await expect(this.validationMessage).toContainText(validationText);
  };
}