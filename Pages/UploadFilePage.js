import { expect } from "@playwright/test";
import * as Actions from "../Helpers/acition-helper"

export class UploadFilePage {
    constructor(page) {
        this.page = page;
        this.fileLoaderHeading = page.locator('//div/h3[text()="File Uploader"]');
        this.chooseFilesToUpload = '#file-upload';
        this.uploadButton = '#file-submit';
        this.uploadedFiles = '#uploaded-files';

    }
    navigate = async () => {
        await this.page.goto("https://the-internet.herokuapp.com/upload", { waitUntil: "domcontentloaded" })
        await Actions.waitForElementToBeVisible(this.fileLoaderHeading)
    }
    //function to upload a file 
    uploadFile = async (filePath) => {
        await this.page.setInputFiles(this.chooseFilesToUpload, filePath);
        await this.page.click(this.uploadButton);
    }
    //Verify if uploaded file contains the file nam
    verifyUploadSuccess = async (filetext) => {
        await expect(this.page.locator(this.uploadedFiles)).toContainText(filetext);
    }

}
