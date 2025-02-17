import { HomePage } from "../../pages/home-page";
import { SignInPage } from "../../pages/sign-in-page";
import { SignedInEditAccountPage } from "../../pages/signed-in-edit-account-page";
import { SignedInHomePage } from "../../pages/signed-in-home-page";
import fs from "fs";
import { test as setup } from "@playwright/test";

setup("Sign up and login to application", async ({ page }) => {
  const homePage = new HomePage(page);
  const signedInEditAccountPage = new SignedInEditAccountPage(page);
  const signInPage = new SignInPage(page);
  const signedInHomePage = new SignedInHomePage(page);

  const newUser = JSON.parse(fs.readFileSync("newUser.json", "utf-8"));

  await signInPage.goToPage();
  await signInPage.typeInEmailField(newUser.email);
  await signInPage.typeInPasswordField(newUser.password);
  console.log('These are the users: ' + newUser.name + newUser.password);
  await signInPage.clickSignInButton();
  await signedInHomePage.verifySignedInAlert();
  await signedInEditAccountPage.goToPage();
  await signedInEditAccountPage.navigatedToPage();
  await signedInEditAccountPage.cancelMyAccount();
  await homePage.navigatedToPage();
  await homePage.successfulCanceledAccount();
});