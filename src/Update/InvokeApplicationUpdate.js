jQueryAPI.Update.ShowFail = false;

jQueryAPI.Update.Ignore = false;

jQueryAPI.Update.InvokeApplicationUpdate = function(options) {
    function defaults() {
        return {
            'updateXML': ''
        };
    }
    
    options = jQuery.extend(defaults(), options);

    if (jQueryAPI.Update.Ignore === false) {
        var request = new air.URLRequest(options.updateXML);
        var loader = new air.URLLoader();
        jQueryAPI.Update.ShowFail = options.displayFail;
        loader.addEventListener(air.Event.COMPLETE, jQueryAPI.Update.AppVersionCheck);
        loader.load(request);        
    }
};
