import { test as base, expect } from '@playwright/test';
import appData from '../json/appData.json' with{type: 'json'}
import CommonFunctions from '../utils/CommonFunctions.js'

// @ts-ignore
export const test = base.extend({

    // Fixture: Flag to indicate whether basic authentication is required
    // Default value is false, can be overridden per test

    requiresAuth: [false, { option: true }],


    // Fixture: Provides deep-cloned test data to avoid mutation across tests
    // eslint-disable-next-line no-empty-pattern
    testData: async ({ }, use) => {
        const pasrsedData = JSON.parse(JSON.stringify(appData));
        await use(pasrsedData);
    },
    // Fixture: Provides reusable actions (helper methods) for tests
    actions: async ({ page }, use) => {

        const actions = new CommonFunctions(page);
        await use(actions);
    },
    // Fixture: Creates browser context with optional basic authentication
    context: async ({ browser, requiresAuth, testData }, use) => {
        let context;
        if (requiresAuth) {
            context = await browser.newContext({
                httpCredentials: {
                    username: testData.pages.basicAuth.userName,
                    password: testData.pages.basicAuth.password
                }
            })
        } else {
            // Create a standard browser context without authentication
            context = await browser.newContext();
        }
        // Provide the context to the test
        await use(context);
        // Cleanup: Close the context after test execution
        await context.close();
    }
})
// Re-export expect for convenience
export { expect };
