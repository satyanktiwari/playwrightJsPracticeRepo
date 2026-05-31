import { test, expect } from '../fixtures/newFixture.js';
import { PomManager } from '../pages/PomManager.js';
import { getSortedData, verifySorting } from '../utils/sortUtils.js'
let pomManager;
let tablesPage;

test.describe('Validate tables', () => {
   test.beforeEach(async ({ page, actions, testData }, testInfo) => {
      pomManager = new PomManager(page, actions, testData);
      let testName = await testInfo.title;
      console.log(`==== Test ${testName} started ====`);
      tablesPage = pomManager.getTablesPage();
      await tablesPage.navigateToTablesPage();

   })

   test.afterEach(async ({ page }, testInfo) => {
      let testName = await testInfo.title;
      // let testStep = await testInfo.step;
      let currentUrl = await page.url();
      let testStatus = await testInfo.status;
      let expectedStatus = await testInfo.expectedStatus;
      let errorMessage = await testInfo.error?.message;
      // console.log(testStep);
      console.log(`Status ${testName}: ${testStatus}`);
      if (testStatus != expectedStatus) {
         await page.screenshot({ path: `screenshots/error-${Date.now()}.png` });
         console.log(`Failed test url: ${currentUrl}`);
         console.log(`Error: ${errorMessage}`)
      }

      await testInfo.attach('Test logs', {
         body: `Test ${testName}: ${testStatus}\nUrl: ${currentUrl}`,
         contentType:'text/plain'
      })
      console.log(`===Test ${testName} completed===`);

   })

   test('01 - Verify correct page is loaded', ({ testData }) => {

      test.step('01 Get current page url and validate for correctness', async () => {
         let actualUrl = await tablesPage.getCurrentPageUrl();
         expect(actualUrl).toEqual(testData.pages.tablesPage.url);
      })

   })

   test('02 - validate table one', async ({ testData }) => {
      await test.step('01 - Get table headers and validate for correctness', async () => {
         let actualHeaders = await tablesPage.getTableHeaderText(1);
         let expectedHeaders = testData.pages.tablesPage.tableHeaders;
         expect(actualHeaders).toEqual(expectedHeaders);
      })

      await test.step('02 - Get table headers and validate for correctness using allInnerText method', async () => {
         let actualHeaders = await tablesPage.getTableHeaderTextwithInnerTexts(1);
         let expectedHeaders = testData.pages.tablesPage.tableHeaders;
         expect.soft(actualHeaders.length).toBeGreaterThan(0);
         expect.soft(actualHeaders.length).toEqual(6);
         expect(actualHeaders).toEqual(expectedHeaders);

      })

      await test.step('03 - Validate row three data', async () => {
         let actualRowData = await tablesPage.getTableRowData(1, 3);
         let expectedRowData = testData.pages.tablesPage.expectedRowThreeData;
         expect(actualRowData).toEqual(expectedRowData);

      })

      await test.step('04 - compare row count', async () => {
         let actualRowCount = await tablesPage.getTableRowCount(1);
         let expectedRowCount = testData.pages.tablesPage.expectedRowCount;
         expect(actualRowCount).toStrictEqual(expectedRowCount);

      })

      await test.step('05 - Validate ascending sort on Last name column', async () => {
         let unsortedColumnData = await tablesPage.getColumnData(1, 'Last Name');
         await tablesPage.clickTableHeader(1, 'Last Name');

         let actualColumnData = await tablesPage.getColumnData(1, 'Last Name');
         expect(verifySorting(actualColumnData, 'asc')).toBeTruthy();
         expect(actualColumnData).toEqual(getSortedData(actualColumnData, 'asc'));
         expect(actualColumnData).toEqual(getSortedData(unsortedColumnData, 'asc'));
      })



   })
// removed testData argument as it is not being used in the test

   test.only('03 - validate table one', async () => {
      await test.step('01 - Validate ascending sort on Last name column', async () => {
         // await tablesPage.sortColumnAndValidate('Last Name', 'asc');
         const columns = ['Last Name', 'First Name', 'Email', 'Due'];
         for(let column of columns){
            console.log(`Sorting column: ${column}`);
            // INVESTIGATE WHY DUE COLUMN SORTING IS FAILING
            // Due was failing becuase it is an number and the previour sort included only
            // String sort. Now the sortUtils has been updated .
            await tablesPage.sortColumnAndValidate(1, column, 'asc');
            await tablesPage.sortColumnAndValidate(1, column, 'descending');
         }

         // let iterationCount = 10;
         // for(let i=0; i<iterationCount;i++){
         //    console.log(`+++Iteration ${i+1} of ${iterationCount}+++`);
         //    await tablesPage.sortColumnAndValidate('Last Name', 'asc');
         //    await tablesPage.sortColumnAndValidate('Last Name', 'descending');
         // }

      })
   })


})
