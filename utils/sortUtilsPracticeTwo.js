export function extractNumericData(data){
    let cleanedData = data.replace(/[%\s$,]/g,'');
    let numericData = parseFloat(cleanedData);
    return isNaN(numericData)
            ? 0:numericData;
}

export function isNumeric(data){
    let cleanedData = data.replace(/[%\s$,]/g,'');
    return cleanedData !=''&&
           cleanedData != ' '&&
           !isNaN(cleanedData);
}


export function getSortedData(data, order='asc'){
    let sortedData = [...data];

    let allNumeric = sortedData.every(isNumeric);

    sortedData.sort((a,b)=>{
        if(allNumeric){
            let numA = extractNumericData(a);
            let numB = extractNumericData(b);
            return order==='asc'?
            numA - numB:
            numB - numA;
        }else{
            return order==='asc'?
            String(a).localeCompare(String(b)) :
            String(b).localeCompare(String (a));
        }
        
    })
    return sortedData;
}

export function validateSorting(data, order='asc'){
    let expectedData = getSortedData(data,order);

    JSON.stringify(data)===JSON.stringify(expectedData);
}