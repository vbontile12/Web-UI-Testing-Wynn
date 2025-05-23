import { expect } from "@playwright/test";
import * as Actions from "../Helpers/acition-helper";
const fs = require('fs');
const path = require('path');

export class UploadFilePage {
    constructor(page) {
        this.page = page;
        this.fileLoaderHeading = page.locator('//div/h3[text()="File Uploader"]');
        this.fileInput = '#file-upload';
        this.uploadButton = '#file-submit';
        this.uploadedFiles = '#uploaded-files';
        this.fileInputSelector = '#file-upload';
        this.dropZone = '#drag-drop-upload';
        this.errorPage= '//h1[text()="Internal Server Error"]';

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
    async dragAndDropFile(fileName) {
        const filePath = path.join(__dirname, '../data', fileName);
        const fileBuffer = fs.readFileSync(filePath);

        await this.page.$eval(
            this.dropZone,
            (dropZone, { name, content }) => {
                const blob = new Blob([new Uint8Array(content)], { type: 'image/png' });
                const file = new File([blob], name, { type: 'image/png' });

                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);

                ['dragenter', 'dragover', 'drop'].forEach(type => {
                    dropZone.dispatchEvent(new DragEvent(type, {
                        dataTransfer,
                        bubbles: true,
                        cancelable: true
                    }));
                });
            },
            { name: fileName, content: [...fileBuffer] }
        );
        await this.page.click(this.uploadButton);
        await expect(this.page.locator(this.errorPage)).toContainText("Error");
    }

    //Verify if uploaded file contains the file nam
    verifyUploadSuccess = async (filetext) => {
        await expect(this.page.locator(this.uploadedFiles)).toContainText(filetext);
    }

}
