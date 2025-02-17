import { Locator, Page, expect } from "@playwright/test";

export class CampaignsPage {
  private page: Page;
  private heading: Locator;
  private addNewCampaignButton: Locator;
  private createdCampaigns: Locator;
  private createdCampaignNameRow: Locator;
  private createdCampaignDescriptionRow: Locator;
  private createdCampaignActionsRow: Locator;
  private createdCampaignInput: Locator;
  private createdCampaignEditOption: Locator;
  private createdCampaignDestroyOption: Locator;
  private createdCampaignAlert: Locator;
  private editedCampaignAlert: Locator;
  private deletedCampaign: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator("h3", { hasText: "Campaigns" });
    this.addNewCampaignButton = page.locator("a", {
      hasText: "Add New Campaign",
    });
    this.createdCampaigns = page.locator(".table");
    this.createdCampaignNameRow = this.createdCampaigns.locator("th", {
      hasText: "Name",
    });
    this.createdCampaignDescriptionRow = this.createdCampaigns.locator("th", {
      hasText: "Description",
    });
    this.createdCampaignActionsRow = this.createdCampaigns.locator("th", {
      hasText: "Actions",
    });
    this.createdCampaignInput = this.createdCampaigns
      .locator("tr")
      .locator("td");
    this.createdCampaignEditOption = this.createdCampaigns
      .locator("tr")
      .locator('a')
      .getByText("Edit")
    this.createdCampaignDestroyOption = this.createdCampaigns
      .locator("tr")
      .locator('a')
      .getByText("Destroy")
    this.createdCampaignAlert = page.locator("#flash_notice", {
      hasText: "Campaign was successfully created.",
    });
    this.editedCampaignAlert = page.locator("#flash_notice", {
      hasText: "Campaign was successfully updated.",
    });
    this.deletedCampaign = page.locator("#flash_notice", {
        hasText: "Campaign was successfully destroyed.",
      });
  }

  async goToPage(url: string = "/campaigns") {
    await this.page.goto(url);
  };

  async navigatedToPage(url: string = "/campaigns") {
    await this.page.waitForURL(url);
    expect(this.page.url().includes(url)).toBe(true);
    await expect(this.heading).toBeVisible();
  };

  async verifyElementsEmptyCampaign() {
    await expect(this.heading).toBeVisible();
    await expect(this.addNewCampaignButton).toBeVisible();
  };

  async verifyElementsPopulatedCampaign(
    campaignName: string,
    campaignDescription: string,
    type: string = "new"
  ) {
    if (type === "new") await expect(this.createdCampaignAlert).toBeVisible();
    if (type === "edit") await expect(this.editedCampaignAlert).toBeVisible();
    await expect(this.heading).toBeVisible();
    await expect(this.addNewCampaignButton).toBeVisible();
    await expect(this.createdCampaigns).toBeVisible();
    await expect(this.createdCampaignNameRow).toBeVisible();
    await expect(this.createdCampaignDescriptionRow).toBeVisible();
    await expect(this.createdCampaignActionsRow).toBeVisible();
    const name = this.createdCampaignInput.getByText(campaignName);
    await expect(name).toBeVisible();
    const description =
      this.createdCampaignInput.getByText(campaignDescription);
    await expect(description).toBeVisible();
    await expect(this.createdCampaignEditOption).toBeVisible();
    await expect(this.createdCampaignDestroyOption).toBeVisible();
  };

  async clickNewCampaign() {
    await this.addNewCampaignButton.click();
  };

  async clickEditCampaign() {
    await this.createdCampaignEditOption.click();
  };

  async verifyExistingCampaign() {
    await expect(this.createdCampaigns).toBeVisible
  }

  async clickDestroyCampaign() {
    this.page.on("dialog", async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
      });
      
    await this.createdCampaignDestroyOption.click();
  };

  async verifyNoCampaigns() {
    await expect(this.createdCampaigns).not.toBeVisible();
    await expect(this.deletedCampaign).toBeVisible();
  }
}