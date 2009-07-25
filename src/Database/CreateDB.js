/**
 * Creates the database from the passed file location
 * @param {Object} databaseFile The location of the database file
 */
jQueryAPI.Database.CreateDB = function() {
    jQueryAPI.FirstRun = true;
    var connection = new air.SQLConnection();
    connection.addEventListener(air.SQLErrorEvent.ERROR, jQueryAPI.Database.ErrorHandler);
    connection.open(jQueryAPI.Database.DatabaseFile, air.SQLMode.CREATE);
    connection.close();
    return true;
};
