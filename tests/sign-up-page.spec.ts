import { interceptGetRequest, verifyGetRequest } from "../api/api-steps";

import { HomePage } from "../pages/home-page";
import { SignInPage } from "../pages/sign-in-page";
import { SignUpPage } from "../pages/sign-up-page";
import { SignedInHomePage } from "../pages/signed-in-home-page";
import { TestData as data } from "../Data/test-data";
import { generateUniqueString } from "../utils/utils";
import { test } from "@playwright/test";

test.describe.serial("Sign up page tests", async () => {
  test.beforeEach("Navigate to application", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToPage();
    await homePage.navigatedToPage();
  });

  test("Navigation and elements", async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);

    interceptGetRequest(page, "/users/sign_up");
    await homePage.clickSignUpButton();
    verifyGetRequest(page, "/users/sign_up");
    await signUpPage.navigatedToPage();
    await signUpPage.verifyElements();
  });

  test("Empty sign up / error", async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);

    await homePage.clickSignUpButton();
    await signUpPage.clickSignUpButton();
    await signUpPage.verifyValidationMessage("Email can't be blank");
    await signUpPage.verifyValidationMessage("Password can't be blank");
  });

  test("Unmatching passwords / error", async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);

    const name = generateUniqueString(data.signUpData.Name);
    const email = generateUniqueString(data.signUpData.Name) + "@tst.com";
    const password = data.signUpData.Password;
    const passwordChallenge = data.signUpData.UnmatchingPassword;

    await homePage.clickSignUpButton();
    await signUpPage.typeInNameField(name);
    await signUpPage.typeInEmailField(email);
    await signUpPage.typeInPasswordField(password);
    await signUpPage.typeInConfirmPasswordField(passwordChallenge);
    await signUpPage.clickSignUpButton();
    await signUpPage.verifyValidationMessage(
      "Password confirmation doesn't match Password"
    );
  });

  test("Empty email / error", async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);

    const name = generateUniqueString(data.signUpData.Name);
    const password = data.signUpData.Password;

    await homePage.clickSignUpButton();
    await signUpPage.typeInNameField(name);
    await signUpPage.typeInEmailField("");
    await signUpPage.typeInPasswordField(password);
    await signUpPage.typeInConfirmPasswordField(password);
    await signUpPage.clickSignUpButton();
    await signUpPage.verifyValidationMessage("Email can't be blank");
  });

  test("Existing email / error", async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);

    const name = generateUniqueString(data.signUpData.Name);
    const email = `${process.env.SIGNIN_USERNAME}`;
    const password = `${process.env.SIGNIN_PASSWORD}`;

    await homePage.clickSignUpButton();
    await signUpPage.typeInNameField(name);
    await signUpPage.typeInEmailField(email);
    await signUpPage.typeInPasswordField(password);
    await signUpPage.typeInConfirmPasswordField(password);
    await signUpPage.clickSignUpButton();
    await signUpPage.verifyValidationMessage("Email has already been taken");
  });

  const name = generateUniqueString(data.signUpData.Name);
  const email = generateUniqueString(data.signUpData.Name) + "@tst.com";
  const password = data.signUpData.Password;

  test("Sign up with valid credentials / input", async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);
    const signedInHomePage = new SignedInHomePage(page);

    await homePage.clickSignUpButton();
    await signUpPage.typeInNameField(name);
    await signUpPage.typeInEmailField(email);
    await signUpPage.typeInPasswordField(password);
    await signUpPage.typeInConfirmPasswordField(password);
    await signUpPage.clickSignUpButton();
    await signedInHomePage.verifySignedUpAlert();
  });

  test("Sign in with newly created user", async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);
    const signedInHomePage = new SignedInHomePage(page);

    await homePage.clickSignInButton();
    await signInPage.typeInEmailField(email);
    await signInPage.typeInPasswordField(password);
    await signInPage.clickSignInButton();
    await signedInHomePage.verifySignedInAlert();
  });
});