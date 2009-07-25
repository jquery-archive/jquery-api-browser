jQueryAPI.Chrome.Splash = function(callback) {

    this.Initialise = function() {
        var windowOptions = new air.NativeWindowInitOptions();
        windowOptions.systemChrome = air.NativeWindowSystemChrome.NONE;
        windowOptions.type = air.NativeWindowType.LIGHTWEIGHT;
        windowOptions.transparent = true;

        var windowBounds = new air.Rectangle(0, 0, 305, 305);

        var newHTMLLoader = air.HTMLLoader.createRootWindow(false, windowOptions, false, windowBounds);
        newHTMLLoader.paintsDefaultBackground = false;
        newHTMLLoader.stage.nativeWindow.alwaysInFront = true;
        newHTMLLoader.navigateInSystemBrowser = true;
        newHTMLLoader.addEventListener(air.Event.COMPLETE, this.CreateWindow);
        newHTMLLoader.load(new air.URLRequest('app:/assets/html/Splash.html'));
    }

    this.CreateWindow = function(event) {
        var windowDom = jQuery('#splash-outer', event.target.window.document).get(0);

        function closeWindow() {
            event.target.window.close();
            return false;
        }
        
        function convertDocsToJSON() {
            $(document).bind('api-load-complete', function () {
			    
			    $.ajax({
                    url: 'app:/lib/docs/plugins.xml', // generated from jquery source: /tools/wikiapi2xml/createjQueryXMLDocs.py
                    dataType: 'xml',
                    async : false, // block until complete
                    success: parse // stored in /lib/jqueryapi/api-loader.js
                });
                
                var myFile = air.File.applicationStorageDirectory.resolvePath('api-docs.js');
                var myFileStream = new air.FileStream();
                myFileStream.open(myFile, air.FileMode.WRITE);
                myFileStream.writeUTFBytes($.toJSON(jquerydocs));
                
                // air.Introspector.Console.log('Converted docs XML to json and stored'); 
                
                // finally attach search function:
                attachFind(jquerydocs); // stored in /lib/jquerydocs/api-loader.js
			});
			
			// read in docs (false == not async and therefore block)
			loadDocs('app:/lib/docs/api-docs.xml', false); // from api-loader.js and triggers api-load-complete
        }
		
        function runMain() {
            jQuery('#loading-message', windowDom).append('<li>Initialising Network Support...</li>');
			jQueryAPI.Network.Initialise(function() {
				jQuery('#loading-message', windowDom).append('<li>Network Support Started...</a>');
				jQuery('#loading-message', windowDom).append('<li>Doing Update Checks...</a>');
				event.target.window.close();
				
                var apidocsJSONDB = air.File.applicationStorageDirectory.resolvePath('api-docs.js');
				
				if (false) {
				    // download to /lib/docs/*.xml path
				    // then...
				    convertDocsToJSON();
				} else if (false) { //}!apidocsJSONDB.exists) { // json versions don't exist yet
				    convertDocsToJSON();
				} else if (false) {
                    // air.Introspector.Console.log('Loading stored json db'); 
				    // load JSON version and attach find
				    
				    var fileStream = new air.FileStream();
				    fileStream.open( apidocsJSONDB, air.FileMode.READ );
				    var data = fileStream.readMultiByte( apidocsJSONDB.size, air.File.systemCharset );
				    fileStream.close();
				    
				    // FIXME need to eval the json object out to a place the api-browser.js can access...
                    window.jquerydocs = eval(data);
                    attachFind(jquerydocs); // stored in /lib/jquerydocs/api-loader.js				    
				}
				
                // alert('api browser load');
				jQueryAPI.Chrome.APIBrowser();
			});
			
        }
        
        if (event.type === 'complete' && event.target.window.nativeWindow) {
            // Now we set up the window position
			var centerX = air.Screen.mainScreen.bounds.width / 2;
            var centerY = air.Screen.mainScreen.bounds.height / 2;
            event.target.window.nativeWindow.x = centerX - (event.target.window.nativeWindow.width / 2);
            event.target.window.nativeWindow.y = centerY - (event.target.window.nativeWindow.height / 2);
            event.target.window.nativeWindow.addEventListener(air.Event.ACTIVATE, runMain);
			event.target.window.nativeWindow.activate();
			event.target.window.nativeWindow.visible = true;
        }

    }

    this.Initialise();
};