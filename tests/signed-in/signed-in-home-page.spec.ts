import { SignInPage } from "../../pages/sign-in-page";
import { SignedInHomePage } from "../../pages/signed-in-home-page";
import fs from "fs";
import { test } from "@playwright/test";

test.describe("Signed in - Home page tests", async () => {
  test.beforeEach("Sign in with a newly created user", async ({ page }) => {
    const signInPage = new SignInPage(page);
    const signedInHomePage = new SignedInHomePage(page);

    const newUser = JSON.parse(fs.readFileSync("newUser.json", "utf-8"));
    console.log("User for the tests: " + JSON.stringify(newUser));

    await signInPage.goToPage();
    await signInPage.typeInEmailField(newUser.email);
    await signInPage.typeInPasswordField(newUser.password);
    await signInPage.clickSignInButton();
    await signedInHomePage.verifySignedInAlert();
  });

  test("Navigation and elements", async ({ page }) => {
    const signedInHomePage = new SignedInHomePage(page);

    await signedInHomePage.navigatedToPage();
    await signedInHomePage.verifyElements();
  });
});