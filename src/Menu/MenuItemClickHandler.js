jQueryAPI.Menu.MenuItemClickHandler = function( clickEvent ) {

  switch (clickEvent.target.label) {
    case 'jQuery.com':
        air.navigateToURL(new air.URLRequest('http://www.jquery.com/'));
        break;
    case 'jQueryUI':
        air.navigateToURL(new air.URLRequest('http://ui.jquery.com/'));
        break;
    case 'jQuery Docs':
        air.navigateToURL(new air.URLRequest('http://docs.jquery.com/'));
        break;
    case 'Learning jQuery':
        air.navigateToURL(new air.URLRequest('http://www.learningjquery.com/'));
        break;
    case 'API Browser':
        jQueryAPI.Chrome.APIBrowser();
        break;
    case 'Exit':
        air.NativeApplication.nativeApplication.exit();
        break;
    default:
        break;
  }      
};