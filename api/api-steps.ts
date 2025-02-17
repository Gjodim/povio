import { Page, expect } from "@playwright/test";

let interceptedRequest;

/**
 * Intercept a GET request to a specific URL.
 * @param {Page} page - Playwright page object.
 * @param {string} url - The URL or endpoint to intercept.
 */
export const interceptGetRequest = async (page: Page, url: string = "/") => {
  interceptedRequest = null; // Reset the intercepted request

  page.on("request", (request) => {
    if (request.method() === "GET" && request.url().includes(url)) {
      interceptedRequest = request;
    }
  });
};

/**
 * Verify that the intercepted GET request matches the expected URL and has a 200 status code.
 * @param {Page} page - Playwright page object.
 * @param {string} url - The expected URL or endpoint.
 */
export const verifyGetRequest = async (page: Page, url: string = "/") => {
  if (!interceptedRequest) {
    throw new Error(`No GET request was intercepted for URL: ${url}`);
  }

  expect(interceptedRequest.method()).toBe("GET");
  expect(interceptedRequest.url()).toContain(url);

  const response = await page.waitForResponse(
    (response) =>
      response.url().includes(url) && response.request().method() === "GET",
    { timeout: 5000 }
  );
  expect(response.status()).toBe(200);

  console.log("Intercepted Request:", {
    method: interceptedRequest.method(),
    url: interceptedRequest.url(),
  });
  console.log("Response Status:", response.status());
};