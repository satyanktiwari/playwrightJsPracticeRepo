import {test as base, expect} from '@playwright/test';
import JsonHandler from '../utils/JsonHandler.js';
import appData from '../json/appData.json' with{type:'json'};
import CommonFunctions from '../utils/CommonFunctions.js';

export const test= base.extend({
    requiresBasicAuth :[false,{option:true}],
    // eslint-disable-next-line no-empty-pattern
    testData: async({},use)=>{
        let parsedData = JsonHandler.jsonFileHandler(appData);
        await use(parsedData);
    },
    context:async({browser, requiresBasicAuth, testData},use)=>{
        let context;
        if(requiresBasicAuth){
            context = await browser.newContext({
                httpCredentials:{
                    username:testData.pages.basicAuth.userName,
                    password:testData.pages.basicAuth.password
                }
            });
        }else{
            context = await browser.newContext();
        }
        await use(context);
        await context.close
        
    },
    actions:async({page},use)=>{
        let commonFunctions = new CommonFunctions(page);
        await use(commonFunctions);
    }

})

export {expect};