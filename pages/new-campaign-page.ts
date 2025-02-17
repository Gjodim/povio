import { Locator, Page, expect } from "@playwright/test";

export class NewCampaignPage {
  private page: Page;
  private heading: Locator;
  private campaignName: Locator;
  private campaignDescription: Locator;
  private oneTimeType: Locator;
  private repeatableType: Locator;
  private createCampaignButton: Locator;
  private updateCampaignButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator("h3", { hasText: "Campaigns" });
    this.campaignName = page.locator('input[name="campaign[name]"]');
    this.campaignDescription = page.locator(
      'input[name="campaign[description]"]'
    );
    this.oneTimeType = page.locator('input[value="one_time"]');
    this.repeatableType = page.locator('input[value="repeatable"]');
    this.createCampaignButton = page.locator('input[value="Create Campaign"]');
    this.updateCampaignButton = page.locator('input[value="Update Campaign"]');
  }

  async goToPage(url: string = "/campaigns/new") {
    await this.page.goto(url);
  };

  async navigatedToPage(url: string = "/campaigns/new") {
    await this.page.waitForURL(url);
    expect(this.page.url().includes(url)).toBe(true);
    await expect(this.heading).toBeVisible();
  };

  async verifyElementsEmptyCampaignForm() {
    await expect(this.campaignName).toBeVisible();
    await expect(this.campaignDescription).toBeVisible();
    await expect(this.oneTimeType).toBeVisible();
    await expect(this.repeatableType).toBeVisible();
    await expect(this.createCampaignButton).toBeVisible();
  };

  async verifyElementsPopulatedCampaignForm(
    campaignName: string,
    campaignDescription: string
  ) {
    await expect(this.campaignName).toBeVisible();
    await expect(this.campaignName).toHaveAttribute("value", campaignName);
    await expect(this.campaignDescription).toBeVisible();
    await expect(this.campaignDescription).toHaveAttribute(
      "value",
      campaignDescription
    );
    await expect(this.oneTimeType).toBeVisible();
    await expect(this.repeatableType).toBeVisible();
    await expect(this.updateCampaignButton).toBeVisible();
  };

  async typeInNameField(campaignName: string) {
    await this.campaignName.fill(campaignName);
  };

  async typeInDescriptionField(campaignDescription: string) {
    await this.campaignDescription.fill(campaignDescription);
  };

  async clickOneTimeOption() {
    await this.oneTimeType.click();
  };

  async clickRepeatableOption() {
    await this.repeatableType.click();
  };

  async clickCreateCampaign() {
    await this.createCampaignButton.click();
  };

  async clickUpdateCampaign() {
    await this.updateCampaignButton.click();
  };
}