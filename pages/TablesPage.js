import { getSortedData } from '../utils/sortUtils.js';
import {expect} from '../fixtures/newFixture.js';


export class TablesPage {
    constructor(page, actions, testData) {
        this.page = page;
        this.actions = actions;
        this.testData = testData;

        // locators
        this.tableHeader = this.page.locator('h3');
    }

    // naivagate to tables page
    async navigateToTablesPage() {
        await this.actions.navigateTo(this.testData.pages.tablesPage.url);
    }

    getCurrentPageUrl() {
        return this.actions.getUrl();
    }

    getTableHeaderLocator(tableNumber) {
        return this.page.locator(`#table${tableNumber} thead th`)
    }

    async getTableHeaderText(tableNumber) {
        let headerLocator = await this.getTableHeaderLocator(tableNumber);
        let headerText = await this.actions.getAllTextContents(headerLocator);
        return headerText.map(text => text.trim());
    }

    async getTableHeaderTextwithInnerTexts(tableNumber) {
        let headerLocator = await this.getTableHeaderLocator(tableNumber);
        let headerText = await this.actions.getAllInnerTexts(headerLocator);
        return headerText;
    }

    getTableRowLocator(tableNumber) {
        return this.page.locator(`#table${tableNumber} tbody tr`);
    }

    async getTableRowCount(tableNumber) {
        let rowLocator = await this.getTableRowLocator(tableNumber);
        let count = await rowLocator.count();
        return count;
    }

    async getTableRowData(tableNumber, rowNumber) {
        let rowLocator = await this.getTableRowLocator(tableNumber);
        // nth is 0 based index, so we need to subtract 1 from rowNumber
        let cellLocator = await rowLocator.nth(rowNumber - 1).locator('td');
        let cellData = await this.actions.getAllTextContents(cellLocator);
        let trimmedData = cellData.map(text => text.trim());
        return {
            lastName: trimmedData[0],
            firstName: trimmedData[1],
            email: trimmedData[2],
            due: trimmedData[3],
            webSite: trimmedData[4]
        }
    }

    /**
     * clickTableHeader
     * - Used for sorting validation
     * - Performs click on the given columnName
     *
     * @param {number} tableNumber
     * @param {string} columnName
     * @memberof TablesPage
     */
    async clickTableHeader(tableNumber, columnName) {
        const tableHeader = this.getTableHeaderLocator(tableNumber);

        await tableHeader
        .filter({ hasText: columnName })
        .click({ force: true, timeout: 3000 });
    }




    /**
     * Approach:
     * Example locator: `#table1 tbody tr:nth-child(4) td:nth-child(1)`
     *
     * - The `tr` (row index) changes dynamically for each row,
     *   while the `td` (column index) remains constant for a specific column.
     *
     * Steps:
     * 1. Retrieve all table headers.
     * 2. findIndex of the required column name.
     *    - If the column is not found (index === -1), throw an error.
     * 3. Get the total number of rows in the table using the count.
     * 4. Initialize an empty list/array to store the column values.
     * 5. Iterate through each row using a loop:
     *    - Construct the locator dynamically using the current row index.
     *    - Extract the cell text (using innerText).
     *    - Add the extracted value to the Array using the push method.
     * 6. Return or use the collected columnData.
     * 
     * @param {number} tableNumber
     * @param {string} columnName
     * @return {Promise<string[]>} 
     * @memberof TablesPage
    */

    async getColumnData(tableNumber, columnName) {
        const headerText = await this.getTableHeaderTextwithInnerTexts(tableNumber);
        

        const columnIndex = headerText.findIndex(
            text => text.trim() === columnName);
            

        if (columnIndex === -1) {
            throw new Error(`Column ${columnName} not found`);
        }

        const rowCount = await this.getTableRowCount(tableNumber);

        let columnData = [];

        for (let i = 0; i < rowCount; i++) {
            const rows = this.getTableRowLocator(tableNumber);
            const cellText = await rows.nth(i).locator('td').nth(columnIndex).innerText();

            columnData.push(cellText.trim());
        }
        return columnData;

    }

    /**
     * Use this method after clicking on the header
     * so that sorted column data can be retrieved 
     *
     * @param {number} tableNumber
     * @param {string []} beforeSortData
     * @param {string} columnName
     * @memberof TablesPage
     */
    async waitForTableUpdate(tableNumber, beforeSortData,columnName){
        await expect.poll(
            async()=>{
                // eslint-disable-next-line no-return-await
                return await this.getColumnData(tableNumber, columnName);
            },
            {
                timeout: 5000,
                interval: 500
                // message: `Table did not update after sorting on column ${columnName}`
            }
        ).not.toEqual(beforeSortData);
    }



    /**
     *
     *
     * @param {numeric} tableNumber
     * @param {string} columnName
     * @param {string} order='asc'| 'desc
     * @memberof TablesPage
     */
    async sortColumnAndValidate(tableNumber, columnName, order='asc') {
        const beforeSort = await this.getColumnData(tableNumber, columnName);
        console.log('Before sort:', beforeSort, order);
        await this.clickTableHeader(1, columnName);
        
        await this.waitForTableUpdate(tableNumber, beforeSort, columnName);
        const afterSort = await this.getColumnData(tableNumber, columnName);
        console.log('After sort:', afterSort, order);
        expect(afterSort).toEqual(getSortedData(beforeSort, order));
        
    }

}