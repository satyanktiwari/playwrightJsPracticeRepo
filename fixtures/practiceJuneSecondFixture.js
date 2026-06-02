import { test as base, expect } from '@playwright/test';
import CommonFunctions from '../utils/CommonFunctions.js';
import appData from '../json/appData.json' with{type: 'json'};

export const test = base.extend({
   requiresAuth: [false, { Option: true }],

    // eslint-disable-next-line no-empty-pattern
    testData: async ({ }, use) => {
        let parsedData = JSON.parse(JSON.stringify(appData));
        await use(parsedData);
    },
    context:async({browser, requiresAuth, testData},use)=>{
        let context;
        if(requiresAuth){
            context = browser.newContext({
                httpCredentials:{
                    username:testData.pages.basicAuth.userName,
                    password:testData.pages.basicAuth.password
                }
            }) 
        } else{
            context = browser.newContext();
        }
        await use(context);
        await context.close();
    },

    actions:async({page},use)=>{
        let commonFunctions = new CommonFunctions(page);
        await use(commonFunctions);
    }
})

export {expect};