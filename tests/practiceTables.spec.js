import {test, expect} from '../fixtures/newFixture.js'
import { PomManager } from '../pages/PomManager.js'

let pomManager;
let tablesPage;

test.describe('Test the tablesPage using the latest version of test',()=>{
    test.beforeEach(async({page,actions, testData},testInfo)=>{
        pomManager = new PomManager(page,actions,testData);
        tablesPage = await pomManager.gettablesPracticePage();
        let title = await testInfo.title;
        console.log(`${'='.repeat(5)} test ${title} Started ${'='.repeat(5)}`);
        await tablesPage.navigateToTablesPage();
    })
    test('Validte the launch of page',async() =>{
        // await tablesPage.navigateToTablesPage();
        console.log(`tc 01 passed`);
    })

    test.only('validate sorting',async()=>{
        console.log(`starting`);
        const column = ['Last Name', 'First Name', 'Email', 'Due']
        // await tablesPage.validateTableHeaderSorting(1,'Due','asc');
        // await tablesPage.validateTableHeaderSorting(1,'Due','dsc');

        for(let value of column){
        await tablesPage.validateTableHeaderSorting(1,value,'asc');
        await tablesPage.validateTableHeaderSorting(1,value,'dsc');
        }
        console.log(`End`);
    })
});
