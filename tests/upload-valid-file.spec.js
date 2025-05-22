import { test } from "@playwright/test"
import { UploadFilePage } from "../Pages/UploadFilePage"

test("Upload valid and supported file from your system", async({page}) =>{
    const uploadFilePage = new UploadFilePage(page)
    await uploadFilePage.navigate()   
    const filePath = "./data/QA_Engineer_Job_Desription.pdf" 
    await uploadFilePage.uploadFile(filePath)
    await uploadFilePage.verifyUploadSuccess('QA_Engineer_Job_Desription.pdf')                                                                                                           

})