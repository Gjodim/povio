import { interceptGetRequest, verifyGetRequest } from "../api/api-steps";

import { HomePage } from "../pages/home-page";
import { SignInPage } from "../pages/sign-in-page";
import { SignUpPage } from "../pages/sign-up-page";
import { SignedInHomePage } from "../pages/signed-in-home-page";
import { TestData as data } from "../Data/test-data";
import { generateUniqueString } from "../utils/utils";
import { test } from "@playwright/test";

const username = process.env.SIGNIN_USERNAME;
const password = process.env.SIGNIN_PASSWORD;

test.describe("Sign in page tests", async () => {
  test.beforeEach("Navigate to application", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToPage();
    await homePage.navigatedToPage();
  });

  test("Navigation and elements", async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);

    interceptGetRequest(page, "/users/sign_in");
    await homePage.clickSignInButton();
    verifyGetRequest(page, "/users/sign_in");
    await signInPage.navigatedToPage();
    await signInPage.verifyElements();
  });

  test("Sign up link navigation", async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);
    const signUpPage = new SignUpPage(page);

    await homePage.clickSignInButton();
    await signInPage.clickSignUpButton();
    await signUpPage.navigatedToPage();
  });

  test("Empty sign in / error", async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);

    await homePage.clickSignInButton();
    await signInPage.clickSignInButton();
    await signInPage.verifyValidationMessage();
    await signInPage.navigatedToPage();
  });

  test("Invalid credentials / error", async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);

    const invalidEmail =
      generateUniqueString(data.signInData.invalidUsername) + "@tst.com";
    const invalidPassword = generateUniqueString(
      data.signInData.invalidPassword
    );

    await homePage.clickSignInButton();
    await signInPage.typeInEmailField(invalidEmail);
    await signInPage.typeInPasswordField(invalidPassword);
    await signInPage.clickSignInButton();
    await signInPage.verifyValidationMessage();
    await signInPage.navigatedToPage();
  });

  test("Sign in with valid credentials / user", async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);
    const signedInHomePage = new SignedInHomePage(page);

    await homePage.clickSignInButton();
    await signInPage.typeInEmailField(username);
    await signInPage.typeInPasswordField(password);
    await signInPage.clickSignInButton();
    await signedInHomePage.verifySignedInAlert();
  });
});