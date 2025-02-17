import { HomePage } from "../../pages/home-page";
import { SignUpPage } from "../../pages/sign-up-page";
import { SignedInHomePage } from "../../pages/signed-in-home-page";
import { TestData as data } from "../../Data/test-data";
import fs from "fs";
import { generateUniqueString } from "../../utils/utils";
import { test as setup } from "@playwright/test";

const name = generateUniqueString(data.signUpData.Name);
const email = generateUniqueString(data.signUpData.Name) + "@tst.com";
const password = data.signUpData.Password;

setup("Sign up and login to application", async ({ page }) => {
  const homePage = new HomePage(page);
  const signUpPage = new SignUpPage(page);
  const signedInHomePage = new SignedInHomePage(page);

  fs.writeFileSync("newUser.json", JSON.stringify({ name, email, password }));

  await homePage.goToPage();
  await homePage.navigatedToPage();
  await homePage.clickSignUpButton();
  await signUpPage.typeInNameField(name);
  await signUpPage.typeInEmailField(email);
  await signUpPage.typeInPasswordField(password);
  await signUpPage.typeInConfirmPasswordField(password);
  await signUpPage.clickSignUpButton();
  await signedInHomePage.verifySignedUpAlert();
});