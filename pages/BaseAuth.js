import {test, expect} from '../fixtures/baseFixture.js'

export default class BaseAuth{
    constructor(page, actions, testData){
        this.page= page;
        this.actions = actions;
        this.testData = testData;

        // locators
        this.headerText = this.page.locator('h3');
        this.successText = this.page.locator('p');

    }

    async navigateToBasicAuthPage(){
        await this.page.pause();
        await this.actions.navigateTo(this.testData.pages.basicAuth.url);
        
    }

    async getCurrentPageUrl(){
        let pageUrl = await this.actions.getUrl();
        return pageUrl;
    }
}
