import {expect} from '../fixtures/baseFixture.js';
import {getSortedData} from '../utils/sortUtilsPracticeTwo.js'


export class TablesSecondJune{
    constructor(page, testData, actions){
        this.page = page;
        this.testData = testData;
        this.actions = actions;
    }


    async navigateToTablespage(){
        await this.actions.navigateTo(this.testData.pages.tablesPage.url);
    }

    #getTableHeaderLocator(tableNumber){
        return this.page.locator(`#table${tableNumber} thead th`);
    }

    async getTableHeaderText(tableNumber){
        this.actions.requireParams({tableNumber});
        let headerLocator = await this.this.#getTableHeaderLocator(tableNumber) 
        let headerText = await this.actions.getAllInnerTexts(headerLocator);
        return headerText;
    }

    #getTableRowLocator(tableNumber){
        return this.page.locator(`#table${tableNumber} tbody tr`);
    }

    async getTableRowCount(tableNumber){
        this.actions.requireParams({tableNumber});
        let rowLocator = await this.#getTableRowLocator(tableNumber);
        let rowCount = await rowLocator.count();
        return rowCount;
    }

    async getRowData(tableNumber, rowNumber){
        this.actions.requireParams({tableNumber, rowNumber});
        let rowLocator = await this.#getTableRowLocator(tableNumber);
        let cells = await rowLocator.nth(rowNumber-1).locator(`td`);
        let cellsData = await this.actions.getAllInnerTexts(cells);

        return{
            'lastName':cellsData[0],
            'firstName':cellsData[1],
            'email':cellsData[2],
            'due':cellsData[3],
            'webSite':cellsData[4]
        }
    }

    async clickHeader(tableNumber, columnName){
        this.actions.requireParams({tableNumber, columnName});
        let locator = await this.#getTableHeaderLocator(tableNumber);
        await locator.filter({hasText:columnName }).click({force:true, timeout:3000});
    }

    // getColumnData
    // waitForTableUpdate
    // validateSorting


    async getColumnData(tableNumber, columnName){
        this.actions.requireParams({tableNumber, columnName});
        let columnHeaders = await this.getTableHeaderText(tableNumber);

        let columnIndex = columnHeaders.indexOf(columnName);

        if(columnIndex===-1){
            throw new Error(`${columnName} not found`);
        }

        let rowCount = this.getTableRowCount(tableNumber);
        let columnData = [];

        for (let i=0; i<rowCount; i++){
            let rowLocator = this.#getTableRowLocator(tableNumber);
            let data = rowLocator.nth(i).locator(`td`).nth(columnIndex);
            let trimmedCellText = await this.actions.getAllInnerTexts(data);
            columnData.add(trimmedCellText);
        }
        return columnData;
    }

    async waitForTableToUpdate(beforeSortData, tableNumber, columnName){
        await this.actions.requireParams({beforeSortData, tableNumber, columnName});
        await expect.poll(async()=>{
            let afterSortData = await this.getColumnData(tableNumber, columnName);
            return afterSortData;
        },{
            timeout:5000,
            interval:500

        }).not.toBe(beforeSortData);

    }


    async validateSorting(tableNumber, columnName, order='asc'){
        await this.actions.requireParams({tableNumber, columnName, order})
        let beforeSortData = await this.getColumnData(tableNumber, columnName);
        await this.clickHeader(tableNumber, columnName);
        await this.waitForTableToUpdate(beforeSortData, tableNumber,columnName);
        let afterSortData = await this.getColumnData(tableNumber, columnName);
        let expectedSortData = await getSortedData(beforeSortData, order)
        expect(afterSortData).toEqual(expectedSortData);
        
    }
}