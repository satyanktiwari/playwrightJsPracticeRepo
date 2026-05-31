/**
 * test the fucntion if its extracting the numeric value correctly from string
 * with currency symbols, percentage signs, commas, and whitespace
 * @param value 
 * @returns 
 */

function extractNumericValue(value){
    let cleanedValue = value.replace(/[$%\s,]/g,'');
    let numericValue = parseFloat(cleanedValue);
    return isNaN(numericValue)?0:numericValue;

}

const numbers = ['20%', '$1',  '500.00', '-100', '$5', '  '];

for(let value of numbers){
    console.log("======== Extracting numeric value from:", value, "========");
    let extractedValue = extractNumericValue(value);
    console.log(`Original: "${value}", Extracted Numeric Value: ${extractedValue}`);
}


function
    isNumericValue(value){
        // let str = String(value).trim();
        let cleanedStr = value.replace(/[$%\s,]/g,'');
        return cleanedStr!==' '&& !isNaN(cleanedStr);
// -$100.00%
        // return /^-?\$?[\d,]+\.?\d*%?$/.test(str);
    }

let bol = isNumericValue('-$100.00%');
console.log('Is numeric value:', bol);

function getSortedData(data,order='asc'){
    // create a shallow copy of the array
    let sortedData = [...data];

    let allNumeric = sortedData.every(isNumericValue);

    sortedData.sort((a,b)=>{
        if(allNumeric){
            const numA = extractNumericValue(a);
            const numB = extractNumericValue(b);
            return order ==='asc'?numA-numB:numB-numA;
        }else{
            return order ==='asc'
            ?a.localeCompare(b)
            :b.localeCompare(a);
        }
    });
    return sortedData;
}

console.log('***********************************')
// const numbers = ['20%', '$1,  500.00', '100', '$5', '  '];
let data = ['20%', '$1',  '500.00', '100', '$5', '  '];
console.log('Original data:', numbers);
console.log('Sorted data (asc):', getSortedData(numbers, 'asc'));
console.log('Sorted data (desc):', getSortedData(numbers, 'bopara'));

// function validateSorting(data, order='asc'){
//     const expectedSortedData = getSortedData(data,order);

//     return JSON.stringify(data)===JSON.stringify(expectedSortedData);
// }

// console.log(validateSorting(data,'asc'));


// function findIndex(array,elementName){
    
//     const index = array.findIndex(e => e.trim()===elementName);
//     return index;
// }
// console.log(`==============================`)
// const index = findIndex(['Last Name', 'First Name', 'Email'], 'Last Name');
// console.log(`Index ix ${findIndex(['Last Name', 'First Name', 'Email'], 'Last Name')} for element 'Last Name'`);