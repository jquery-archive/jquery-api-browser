jQueryAPI.System.ParseCLI = function(arguments, callback) {

    jQuery.each(arguments,
    function(index, argument) {

        switch (argument) {
        case "debug-mode":
            jQueryAPI.DebugMode = false;
            break;
        default:
            // Do nothing
            break;
        }

    });

    return callback();

};