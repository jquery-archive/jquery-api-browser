jQueryAPI.Menu.Initialise = function() {
    function iconLoadComplete(event) {
        if (air.NativeApplication.supportsSystemTrayIcon) {
            air.NativeApplication.nativeApplication.icon.bitmaps = new Array(event.target.content.bitmapData);
            jQueryAPI.Menu.AddMenuItems();
        }
    }

    var iconLoader = new runtime.flash.display.Loader();
    iconLoader.contentLoaderInfo.addEventListener(air.Event.COMPLETE, iconLoadComplete);
    iconLoader.load(new air.URLRequest('app:/assets/images/jQueryAPIOffline.png'));
};