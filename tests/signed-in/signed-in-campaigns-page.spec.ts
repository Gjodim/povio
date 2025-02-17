import { CampaignsPage } from "../../pages/campaigns-page";
import { NewCampaignPage } from "../../pages/new-campaign-page";
import { SignInPage } from "../../pages/sign-in-page";
import { SignedInHomePage } from "../../pages/signed-in-home-page";
import { TestData as data } from "../../Data/test-data";
import fs from "fs";
import { generateUniqueString } from "../../utils/utils";
import { test } from "@playwright/test";

const campaignName1 = `01-${generateUniqueString(data.campaignData.Name)}`;
const campaignDescription1 = `01-${generateUniqueString(
  data.campaignData.Description
)}`;
const campaignName1_Edited = `01-Edited-${generateUniqueString(
  data.campaignData.Name
)}`;
const campaignDescription1_Edited = `01-Edited-${generateUniqueString(
  data.campaignData.Description
)}`;

test.describe.serial("Signed in - Campaings page tests", async () => {
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
    await signedInHomePage.clickCampaignsNav();
  });

  test("Navigation and elements", async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);

    await campaignsPage.navigatedToPage();
    await campaignsPage.verifyElementsEmptyCampaign();
  });

  test("Add new campaigns", async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);
    const newCampaignPage = new NewCampaignPage(page);

    await campaignsPage.navigatedToPage();
    await campaignsPage.clickNewCampaign();

    await newCampaignPage.navigatedToPage();
    await newCampaignPage.verifyElementsEmptyCampaignForm();
    await newCampaignPage.typeInNameField(campaignName1);
    await newCampaignPage.typeInDescriptionField(campaignDescription1);
    await newCampaignPage.clickOneTimeOption();
    await newCampaignPage.clickCreateCampaign();
    await campaignsPage.navigatedToPage();
    await campaignsPage.verifyElementsPopulatedCampaign(
      campaignName1,
      campaignDescription1
    );
  });

  test("Edit campaign", async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);
    const newCampaignPage = new NewCampaignPage(page);

    await campaignsPage.navigatedToPage();
    await campaignsPage.clickEditCampaign();

    await newCampaignPage.verifyElementsPopulatedCampaignForm(
      campaignName1,
      campaignDescription1
    );
    await newCampaignPage.typeInNameField(campaignName1_Edited);
    await newCampaignPage.typeInDescriptionField(campaignDescription1_Edited);
    await newCampaignPage.clickRepeatableOption();
    await newCampaignPage.clickUpdateCampaign();
    await campaignsPage.navigatedToPage();
    await campaignsPage.verifyElementsPopulatedCampaign(
      campaignName1_Edited,
      campaignDescription1_Edited,
      "edit"
    );
  });

  test("Destroy campaign", async ({ page }) => {
    const campaignsPage = new CampaignsPage(page);
    const newCampaignPage = new NewCampaignPage(page);

    await campaignsPage.navigatedToPage();
    await campaignsPage.verifyExistingCampaign();
    await campaignsPage.clickDestroyCampaign();
    await campaignsPage.verifyNoCampaigns();
  });
});