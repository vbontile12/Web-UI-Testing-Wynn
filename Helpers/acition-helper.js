import { expect } from "@playwright/test"


export async function clickOnElement(locator) {
    console.info(`Try to Click On Element ${locator.toString()}`)
    try {
        await locator.click();
    } catch (error) {
        console.error(`Failed to check on element ${locator.toString()}:`, error)
    }

}
export async function waitForElementToBeVisible(locator, testTimeout = 5000) {
    await locator.waitFor({ state: 'visible', timeout: testTimeout});

}

