

/**
 * Helper function to extract numeric value from strings
 * Handles currency ($), percentages (%), and plain numbers
 * @param {string} value
 * @return {number}
 */
function extractNumericValue(value) {
    // Remove currency symbols, percentage signs, and whitespace

    const numericString = value.replace(/[$%\s,]/g, '');
    const num = parseFloat(numericString);
    return isNaN(num) ? 0 : num;
}



/**
 *  * Checks if a value is numeric (including currency or percentage format)
 * 
 *          START
 *           optional - (negative sign)
 *           optional $
 *           1+ digits/commas
 *           optional decimal point
 *           0+ decimal digits
 *           optional % (percentage sign)
 *          END
 *
 * @param {string} value
 * @return {boolean}
 */
function isNumericValue(value) {
    const cleanedValue = value.replace(/[$%\s,]/g, '');
    return cleanedValue !== '' && !isNaN(cleanedValue);
}

/**
 * Returns a newly sorted array without 
 * modifying the originial array
 * 
 * Sort the array based on parameter asc or desc
 * Check if all values are numeric (including currency/percentage)
 * If so, sort numerically; otherwise sort alphabetically
 *
 * @export
 * @param {Array} data
 * @param {string} order='asc'| 'desc'
 * @return {Array} 
 */
export function getSortedData(data, order = 'asc') {
    /** @type {Array} 
     * - Create a shallow copy of the array 
     * - i.e. creates a new Array 
     * - All the elements copied to the new Array from the original array.
    */
    const sortedData = [...data];


    // const allNumeric = sortedData.every(val => isNumericValue(String(val)));
    // above syntax is not needed as every method will pass each element 
    // to the isNumericValue function which will handle the string conversion and validation
    const allNumeric = sortedData.every(isNumericValue);

    /** 
     * Sort the array based on parameter asc or desc
     * Check if all values are numeric (including currency/percentage)
     * If so, sort numerically; otherwise sort alphabetically
    */
    sortedData.sort((a, b) => {
        if (allNumeric) {
            // Numeric sort
           
            const numA = extractNumericValue(a);
            const numB = extractNumericValue(b);
            return order === 'asc' ? numA - numB : numB - numA;
        } else {
            // Alphabetic sort using localeCompare
            return order === 'asc'
                ? String(a).localeCompare(String(b))
                : String(b).localeCompare(String(a));
                
        }
    });
    return sortedData;
}


/**
 * validates array is sorted correctly
 *
 * @export
 * @param {Array} actualData
 * @param {string} order='asc'| 'desc'
 * @return {boolean} 
 */
export function verifySorting(actualData, order = 'asc') {

    const expectedSortedData =
        getSortedData(actualData, order);

    return JSON.stringify(actualData) ===
        JSON.stringify(expectedSortedData);
}