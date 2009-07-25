/**
 * Allows you to pass a query to the passed database file
 * @param {Object} databaseFile The location of the database file
 * @param {Object} options The object that contains the options
 */
jQueryAPI.Database.Query = function(options) {

    /**
	 * Default options for a query
	 * @param {String} queryString The query string to be passed to the database
	 */
    function defaults() {
        return {
            'queryString': ''
        };
    }
    options = jQuery.extend(defaults(), options);
    var transactionSuccessful = false;
    var result = false;

    try {
        var connection = new air.SQLConnection();
        connection.open(jQueryAPI.Database.DatabaseFile, air.SQLMode.CREATE);

        var query = new air.SQLStatement();
        query.addEventListener(air.SQLErrorEvent.ERROR, jQueryAPI.Database.ErrorHandler);
        query.sqlConnection = connection;
        query.text = options.queryString;
        query.execute();
        var success = query.getResult();
        if (success) {
            transactionSuccessful = true;
            result = success;
        }
        connection.close();
    } catch(error) {
        transactionSuccessful = false;
        result = error;
    }
    return {
        'success': transactionSuccessful,
        'result': result
    };
};
