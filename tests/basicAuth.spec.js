import {test, expect} from '../fixtures/newFixture.js';
import {PomManager} from '../pages/PomManager.js';

let pomManager;
test.use({requiresBasicAuth:true})

test.describe('Validate Basic Auth',()=>{
    test.beforeEach(async ({page,actions, testData}, testInfo)=>{
        pomManager = new PomManager(page,actions,testData);
        let testName =await testInfo.title;
        
        console.log(`====Test ${testName} started===`);
        
    })
    test.afterEach(async({page},testInfo)=>{
        let testName =await testInfo.title;
        let testStatus = await testInfo.status;
        let pageUrl = await page.url();
        console.log(`Status: ${testStatus}`);
        console.log(`=== Test ${testName} Ended===`)
        
        if(testStatus !== testInfo.expectedStatus){
            console.log(`Failed test url: ${pageUrl}`)
            console.log(`Error ${testInfo.error?.message}`);
        }
        await testInfo.attach('Test logs',{
            body: `Test status: ${testInfo.status}\npage url: ${page.url()}`,
            contentType: 'text/plain'
        })
    })

    test('01 - Base page login',async({testData})=>{
        let basicAuthPage = pomManager.getBasicAuthPage();
        await test.step('01 - Navigate to page and login', async()=>{
            await basicAuthPage.navigateToBasicAuthPage();
        })

        await test.step('02 - Validate url', async()=>{
            let actualUrl = await basicAuthPage.getCurrentPageUrl();
            expect(actualUrl).toEqual(testData.pages.basicAuth.url);
        })
        

    })
})