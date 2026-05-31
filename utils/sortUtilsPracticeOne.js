/**
 * Following functions are needed:
 * 1. ExtractNumericValue
 * 2. isnumeric?
 * 3. getSortedData
 * 4. validateSorting
 */


// export function extractNumericValueFromString(value){
//     const cleanedValue = String(value).replace(/[$%\s,]/g,'');
//     const numericValue = parseFloat(cleanedValue);
//     return isNaN(numericValue)?0:numericValue;
// }

// export function isNumeric(value){
//     let cleanedData = String(value).replace(/[$%\s,]/g,'');
//     return cleanedData !=='' && !isNaN(cleanedData);
// }

// export function getSortedData(data, order='asc'){
//     const copyOfData =[...data];
    
//     const allNumeric = copyOfData.every(isNumeric);

//     copyOfData.sort((a,b)=>{
//         if(allNumeric){
//             // Sorting number
//             const numA = extractNumericValueFromString(a);
//             const numB = extractNumericValueFromString(b);
//             return order ==='asc'
//             ?numA-numB
//             :numB-numA;
//         }else{
//             // Sorting text
//             return order ==='asc'
//             ?String(a).localeCompare(String(b))
//             :String(b).localeCompare(String(a))
//         }
//     })
//     return copyOfData;
// }

// export function  validateSorting(data, order = 'asc'){
//     const expectedSortedData = getSortedData(data, order);

//     return JSON.stringify(data)===JSON.stringify(expectedSortedData);
// }


export function isNumeric(data){
    let cleanedData = data.replace(/[%\s,$]/g,'');
    // make sure the condition is AND
    return cleanedData!==''&& cleanedData!==' ' && !isNaN(cleanedData);
}

export function extractNumericData(value){
    let cleanedData = value.replace(/[$%\s,]/g,'');
    let numericData = parseFloat(cleanedData);
    return isNaN(numericData)
            ? 0
            : numericData;
}

export function getSortedData(data, order='asc'){

    let sortedData = [...data];

    let allNumeric = sortedData.every(isNumeric);

    sortedData.sort((a,b)=>{
        if(allNumeric){
            const numA = extractNumericData(a);
            const numB = extractNumericData(b);
            return order === 'asc'
            ? numA-numB
            : numB-numA;
        }else{
            return order === 'asc'
            ? String(a).localeCompare(String(b))
            :String(b).localeCompare(String(a));
        }

    })
    return sortedData;
}


export function validateSorting(data, order ='asc'){
    let expectedValue = getSortedData(data, order);
   return JSON.stringify(data) ===
    JSON.stringify(expectedValue);
}