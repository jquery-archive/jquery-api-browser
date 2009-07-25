jQueryAPI.Menu.AddMenuItems = function() {

    air.NativeApplication.nativeApplication.icon.menu = new air.NativeMenu();
    air.NativeApplication.nativeApplication.icon.addEventListener('click', jQueryAPI.Menu.SystrayClickHandler);

    var websitesMenu = new air.NativeMenu();

    var websites = {
        'jquery': new air.NativeMenuItem('jQuery.com', false),
        'jqueryui': new air.NativeMenuItem('jQueryUI', false),
        'jquerydocs': new air.NativeMenuItem('jQuery Docs', false),
        'splittera': new air.NativeMenuItem('', true),
        'learningjquery': new air.NativeMenuItem('Learning jQuery', false)
    }

    var menuItems = {
        'openbrowser': new air.NativeMenuItem('API Browser', false),
        'opensettings': new air.NativeMenuItem('Settings', false),
        'closeMenu': new air.NativeMenuItem('Exit', false)
    };

    jQuery.each(websites,
    function(i, website) {
        websitesMenu.addItem(website);
        website.addEventListener(air.Event.SELECT, jQueryAPI.Menu.MenuItemClickHandler);
    }
    )

    air.NativeApplication.nativeApplication.icon.menu.addSubmenu(websitesMenu, 'Websites');

    jQuery.each(menuItems,
    function(i, menuItem) {
        air.NativeApplication.nativeApplication.icon.menu.addItem(menuItem);
        menuItem.addEventListener(air.Event.SELECT, jQueryAPI.Menu.MenuItemClickHandler);
    });

}