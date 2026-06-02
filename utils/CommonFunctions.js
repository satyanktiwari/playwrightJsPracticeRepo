export default class CommonFunctions {
    /**
     * Creates an instance of CommonFunctions.
     * @param {import("@playwright/test").Page} page
     * @memberof CommonFunctions
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigate to page
     *
     * @param {string} url
     * @memberof CommonFunctions
     */
    async navigateTo(url) {
        await this.page.goto(url);
    }

    /**
     *
     * @return {string} Resolves to current page url 
     * @memberof CommonFunctions
     */
    getUrl() {
        return this.page.url();
    }

    /**
     * Function takes locator as an argument
     * and performs the click
     *
     * @param {locator} locator
     * @memberof CommonFunctions
     */
    async click(locator) {
        await locator.click();
    }

    /**
     * Function takes two parameters
     * locator and the text to be entered.
     *
     * @param {locator} locator
     * @param {string} textToBeEntered
     * @memberof CommonFunctions
     */
    async fill(locator, textToBeEntered) {
        await locator.fill(textToBeEntered);
    }

    /**
     *
     *
     * @param {locator} locator
     * @return {Promise<string>} Resolves to provide 
     * @memberof CommonFunctions
     */
    getText(locator) {
        return locator.textContent();
    }


    /**
     * Will also include hidden texts
     *
     * @param {*} locator
     * @return {Promise<string []>} 
     * @memberof CommonFunctions
     */
    async getAllTextContents(locator) {
        let textContents =  await locator.allTextContents();
        return textContents;
    }

    /**
     * Will exclude hidden texts
     *
     * @param {locator} locator
     * @return {Promise<string []>} 
     * @memberof CommonFunctions
     */
    async getAllInnerTexts(locator){
        let innerText = await locator.allInnerTexts();
        let trimmedText = innerText.map(text =>text.trim());
        return trimmedText;
    }

    /**
     * - Validates if parameters are needed for the function
     * - Throws error if found missing
     *
     * @param {*} params
     * @memberof CommonFunctions
     */
    requireParams(params) {
    for (const [name, value] of Object.entries(params)) {
        if (
            value == null ||
            (typeof value === "string" && !value.trim())
        ) {
            throw new Error(`${name} is required`);
        }
    }
}

    

}

export function requireParams(params) {
    for (const [name, value] of Object.entries(params)) {
        if (
            value == null ||
            (typeof value === "string" && !value.trim())
        ) {
            throw new Error(`${name} is required`);
        }
    }
}