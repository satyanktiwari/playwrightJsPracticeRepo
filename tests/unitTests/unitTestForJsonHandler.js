// @ts-nocheck
import JsonHandler from "../../utils/JsonHandler.js";


import appData from "../../json/appData.json" with{type:'json'};

const testData = JsonHandler.jsonFileHandler(appData);
console.log(testData.pages.basicAuth.url);
console.log(testData.pages.basicAuth.userName)
console.log(testData.pages.basicAuth.password)
