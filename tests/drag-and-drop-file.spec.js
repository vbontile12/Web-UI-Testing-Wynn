import { test } from "@playwright/test"
import { UploadFilePage } from "../Pages/UploadFilePage"

test.only("Drag and Drop valid and supported file from your system", async({page}) =>{
    const uploadFilePage = new UploadFilePage(page)
    await uploadFilePage.navigate()   
    const fileName = "Wynn01.png";
    await uploadFilePage.dragAndDropFile(fileName);
    
})