import {
    isNumeric,
    extractNumericData,
    getSortedData,
    validateSorting
} from './utils/sortUtilsPracticeOne.js'

const data =['$10','$-10.1','$9.9','1','']
const numbers = ['20%', '$1',  '500.00', '-100', '$5', '  '];

// console.log(`================`)
// for (let value of data)
// {
    
//     console.log(isNumeric(value));

// }
console.log(`================`)

// console.log(extractNumericData('$10.0'))

for (let value of data){
    console.log(extractNumericData(value));
}
console.log('*************************')
console.log(getSortedData(numbers, 'asc'))

// Trying out how to match the column names on the getColumnData Fucntions
console.log('='.repeat(20))
let columnNames = [' fn','ln ','email'];
let index = columnNames.indexOf('ln');
console.log(index)
let trimmedColumnNames = columnNames.map(text => text.trim());
console.log(columnNames.findIndex(text => text.trim()==='email'));
console.log(trimmedColumnNames.indexOf('due'));

