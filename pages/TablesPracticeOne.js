import { expect } from '../fixtures/newFixture.js';
import { getSortedData } from '../utils/sortUtilsPracticeOne.js';

export default class TablesPracticeOne {
    constructor(page, actions, testData) {
        this.page = page;
        this.actions = actions;
        this.testData = testData;
    }


    async navigateToTablesPage() {
        await this.actions.navigateTo(this.testData.pages.tablesPage.url);
    }


    getTableHeaderLocator(tableNumber) {
        return this.page.locator(`#table${tableNumber} thead th`);
    }

    async getTableHeaders(tableNumber) {
        let headers = await this.getTableHeaderLocator(tableNumber);
        let headerTexts = await this.actions.getAllInnerTexts(headers);
        let trimmedData = headerTexts.map(text => text.trim);
        return trimmedData;
    }

    /**
     * Get all rows
     *
     * @param {number} tableNumber
     * @return {Locator} returns the locator for the rows
     * @memberof TablesPracticeOne
     */
    getTableRowLocator(tableNumber) {
        return this.page.locator(`#table${tableNumber} tbody tr`)
    }

    async getRowCount(tableNumber) {
        let row = await this.getTableRowLocator(tableNumber);
        let count = await row.count();
        return count;
    }

    async getTableRowData(tableNumber, rowNumber) {
        let row = await this.getTableHeaderLocator(tableNumber);
        let cellLocator = await row.nth(rowNumber - 1).locator(`td`);
        let cellData = await this.actions.getAllInnerTexts(cellLocator);
        let trimmedCellData = cellData.map(text => text.trim());

        return {
            lastName: trimmedCellData[0],
            firstName: trimmedCellData[1],
            email: trimmedCellData[2],
            due: trimmedCellData[3],
            webSite: trimmedCellData[4]
        }
    }


    async clickTableHeader(tableNumber, columnName) {
        let headerLocator = this.getTableHeaderLocator(tableNumber);
        await headerLocator.filter({ hasText: columnName })
            .click({ force: true, timeout: 3000 })

    }

       

    async getColumnData(tableNumber, columnName) {
        let tableHeaderLocator = await this.getTableHeaderLocator(tableNumber);
        let headers = await this.actions.getAllInnerTexts(tableHeaderLocator);
        let trimmedHeaderText = headers.map(text => text.trim());

        let columnIndex = trimmedHeaderText.indexOf(columnName);

        if (columnIndex === -1) {
            throw new Error(`Column ${columnName} not found`);
        }

        let rowCount = await this.getTableRowLocator(tableNumber).count();
        let columnData = [];

        for (let i = 0; i < rowCount; i++) {
            let row = await this.getTableRowLocator(tableNumber);
            let cellsText = await row.nth(i).locator(`td`).nth(columnIndex).innerText();
            columnData.push(cellsText.trim());

        }

        return columnData;
    }

    async getColumnDataPracticeOne(tableNumber,columnName){

        let trimmedHeaderText = await this.getTableHeaders(tableNumber);

        let columnIndex = trimmedHeaderText.indexOf(columnName);

        if(columnIndex===-1){
            throw new Error(`${columnName} column is not found`);
        }

        let rowCount = await this.getRowCount(tableNumber);
        let columnData = [];

        for(let i=0; i<rowCount; i++){
            let rows = await this.getTableRowLocator(tableNumber);
            let cell = await rows.nth(i).locator(`td`).nth(columnIndex);
            let cellText = await this.page.locator(cell).innerText;
            
            columnData.push(cellText.trim());

        }
        return columnData;
    }




    /**
     * Should be called after the sorting is initiated using the clickHeader function
     *
     * @param {Array} beforeSortData
     * @param {number} tableNumber
     * @param {String} columnName
     * @memberof TablesPracticeOne
     */
    async waitForTableUpdate(beforeSortData, tableNumber, columnName){
        await expect.poll(async()=>{
            let sortedColumnData = await this.getColumnData(tableNumber, columnName)
            return sortedColumnData;
        },
    {
        timeout:5000,
        interval:500
    }
    ).not.toEqual(beforeSortData);
    }

    async validateTableHeaderSorting(tableNumber, columnName, order = 'asc'){
        let beforeSort = await this.getColumnData(tableNumber, columnName);
        console.log(`beforeSort is ${beforeSort}`)
        await this.clickTableHeader(tableNumber,columnName)
        await this.waitForTableUpdate(beforeSort,tableNumber,columnName);
        let afterSort = await this.getColumnData(tableNumber, columnName)
        console.log(`afterSort is ${afterSort}`);
        // getSortedData
        expect(afterSort).toEqual(getSortedData(beforeSort,order))


    }
}