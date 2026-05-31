export default class JsonHandler{
    /**
     *
     *
     * @static
     * @param {JSON} data
     * @return {Object | null} 
     * @memberof JsonHandler
     */
    static jsonFileHandler(data){
        try {
            let parsedData = JSON.parse(JSON.stringify(data));
            return parsedData;
        } catch (error) {
            console.log("Error occured" + error);
            return null;
        }
    }
}