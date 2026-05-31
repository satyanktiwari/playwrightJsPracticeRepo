import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json"
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files:["**/*.{js,mjs,cjs}"],
        plugins: {js},
        extends:["js/recommended"],
        languageOptions: {globals:globals.browser},
        rules:{
            "no-unused-vars":"warn",
            "no-undef":"warn",
            "require-await":"warn",
            "no-return-await":"warn",
            "no-console":"off"
        }
    },{
       files:["**/*.json"],
       plugins:{json},
       language: "json/json",
       extends:["json/recommended"] 
    }
])
