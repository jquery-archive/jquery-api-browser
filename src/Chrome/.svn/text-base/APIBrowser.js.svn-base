jQueryAPI.Chrome.APIBrowser = function() {
    this.Initialise = function() {
      try {
          var windowOptions = new air.NativeWindowInitOptions();
          windowOptions.systemChrome = air.NativeWindowSystemChrome.STANDARD;
          windowOptions.type = air.NativeWindowType.NORMAL;
  
          var windowBounds = new air.Rectangle(0, 0, 960, 850);
          // setting true for scrollbars fixes the window trying to scroll on mouse scroll.
          var newHTMLLoader = air.HTMLLoader.createRootWindow(false, windowOptions, true, windowBounds);
          newHTMLLoader.paintsDefaultBackground = true;
          newHTMLLoader.stage.nativeWindow.alwaysInFront = false;
          newHTMLLoader.navigateInSystemBrowser = true;
          newHTMLLoader.addEventListener(air.Event.COMPLETE, this.CreateWindow);
          newHTMLLoader.load(new air.URLRequest('app:/index.html'));
        } catch (error) {
          // air.Introspector.Console.log(error);
        }
        
    };
    this.CreateWindow = function(event) {
        function closeWindow() {
            event.target.window.nativeWindow.visible = false;
            return false;
        }
        
        function minimiseWindow() {
            event.target.window.nativeWindow.minimize();
            return false;
          }

        function moveWindow() {
            event.target.window.nativeWindow.startMove();
        }
        
        function setupDom() {

        }

        if (event.type === 'complete' && event.target.window.nativeWindow) {
            // Now we set up the window position
            var centerX = air.Screen.mainScreen.bounds.width / 2;
            var centerY = air.Screen.mainScreen.bounds.height / 2;
            event.target.window.nativeWindow.x = centerX - (event.target.window.nativeWindow.width / 2);
            event.target.window.nativeWindow.y = centerY - (event.target.window.nativeWindow.height / 2);
            // event.target.window.nativeWindow.addEventListener(air.Event.ACTIVATE, setupDom);
            event.target.window.nativeWindow.visible = true;
            event.target.window.focus(); // god knows why I can't use the order to front - but it doesn't focus.
  
            // patch connect the AIR globals to the API browser
            event.target.window.jQueryAPI = jQueryAPI;
            event.target.window.JSON = JSON;

            jQuery(event.target.window.document).ready(function () {
                // is this duplicating setupDom?  It wouldn't trigger...
                // bind offline / online callbacks to add class
                var dom = this;
                var lastOnlineStatus = null;
                
                event.target.window.apiBrowserMain.call();

                jQueryAPI.Network.ServiceMonitor.addEventListener(air.StatusEvent.STATUS, function (statusEvent) {
                    if (statusEvent.currentTarget.available) {
                        if (lastOnlineStatus != true) {
                            lastOnlineStatus = true;
                            jQuery('body', event.target.window.document).removeClass('offline');
                        }
                    } else {
                        if (lastOnlineStatus != false) {
                            lastOnlineStatus = false;
                            jQuery('body', event.target.window.document).addClass('offline');
                        }
                    }
                    
                    event.target.window.online = lastOnlineStatus;
                });
            });
        }
    };
    
    var alreadyOpen = false;
    jQuery(air.NativeApplication.nativeApplication.openedWindows).each(function(i, win) {
        if (/jQuery API Browser/.test(win.title)) {
            alreadyOpen = true;
            win.orderToFront();
        }
    });
    if (!alreadyOpen) {
        this.Initialise();
    }
};