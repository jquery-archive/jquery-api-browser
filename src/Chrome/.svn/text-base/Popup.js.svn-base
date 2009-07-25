jQueryAPI.Chrome.Popup = function(options) {

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
    };

    this.CreateWindow = function(event) {
        var windowDom = jQuery('#splash-outer', event.target.window.document).get(0);

        function closeWindow() {
            event.target.window.close();
            return false;
        }
		
        function runMain() {
            jQuery('#loading-message', windowDom)
                .empty()
                .append('<li>Application updating...</li>')
                .append('<li>' + options.message + '</li>');
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

    };

    this.Initialise();
};