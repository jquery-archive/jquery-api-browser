jQueryAPI.Database.SaveOrCreateOption = function(options) {
    /**
	 * Default options for a query
	 * @param {String} queryString The query string to be passed to the database
	 */
    function defaults() {
        return {
            'key': '',
            'value': '',
            'overwrite': true
        };
    }
    options = jQuery.extend(defaults(), options);
    var exists = false;
    var result;

    //First we do a search for the item
    var checkExists = jQueryAPI.Database.Query({
        'queryString': 'SELECT * FROM options WHERE key = "' + options.key + '"'
    });

    if (checkExists.result.data) {
        result = null;
        if (options.overwrite) {
            result = jQueryAPI.Database.Query({
                'queryString': 'UPDATE options SET value = "' + options.value + '" WHERE key = "' + options.key + '"'
            });
        }
        exists = true;
    } else {
        exists = false;
        result = jQueryAPI.Database.Query({
            'queryString': 'INSERT INTO options (key, value) VALUES("' + options.key + '", "' + options.value + '")'
        });
    }
    return {
        'exists': exists,
        'result': result
    };
};
