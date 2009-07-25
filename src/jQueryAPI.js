var jQueryAPI;
if (!jQueryAPI) jQueryAPI = function() {};

// Set up our namespaces
jQueryAPI.Chrome = function() {};
jQueryAPI.Database = function() {};
jQueryAPI.Menu = function() {};
jQueryAPI.Network = function() {};
jQueryAPI.System = function() {};
jQueryAPI.Update = function() {};

jQueryAPI.Initialise = function() {
    jQueryAPI.DebugMode = false;
    jQueryAPI.FirstRun = false;
    jQueryAPI.UserOnline = false;
	jQueryAPI.DoPartialUpdate = false;
	jQueryAPI.DoFullUpdate = false;
	
	try {
      air.File.applicationStorageDirectory.resolvePath('update').deleteDirectory(true);
    } catch(err) {
      // Do nothing
    }

    air.NativeApplication.nativeApplication.addEventListener(air.InvokeEvent.INVOKE, jQueryAPI.InvokeApplication);
};

jQueryAPI.InvokeApplication = function(invokeEvent) {
    jQueryAPI.System.ParseCLI(invokeEvent.arguments,
    function() {

        jQueryAPI.Database.ConnectToFile({
            'databaseFile': 'jQueryAPI1.sqlite',
            'createFile': true
        },
        function(){
         	jQueryAPI.Chrome.Splash(function(){
				
			});
        });
    });
}