import BasicAuth from './BaseAuth.js';
import {TablesPage} from './TablesPage.js';
import TablesPracticeOne from './TablesPracticeOne.js';

export class PomManager{
    constructor(page, actions, testData){
        this.page = page;
        this.actions = actions;
        this.testData = testData;
        this.basicAuth = new BasicAuth(page, actions, testData);
        this.tablesPage = new TablesPage(page, actions, testData);
        this.tablesPracticePage = new TablesPracticeOne(page,actions,testData);
    }
    getBasicAuthPage(){
        return this.basicAuth;
    }
    getTablesPage(){
        return this.tablesPage;
    }

    gettablesPracticePage(){
        return this.tablesPracticePage;
    }
}