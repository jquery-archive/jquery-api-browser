jQueryAPI.Update.AppVersionCheck = function(event) {
    var remoteVersionString = jQuery(event.target.data).find('version').text();
    var remoteVersion = remoteVersionString.split('.');
    var remoteAir = jQuery(event.target.data).find('url').text();

    var xmlString = air.NativeApplication.nativeApplication.applicationDescriptor;
    var appXml = new DOMParser();
    var xmlObject = appXml.parseFromString(xmlString, "text/xml");
    var root = xmlObject.getElementsByTagName('application')[0];
    var thisVersion = root.getElementsByTagName("version")[0].firstChild.data;
    
    // thisVersion = thisVersion.split('.');

    var update = !!(thisVersion < remoteVersionString);
    var stream = new air.URLStream();

    // completely wrong! If I'm on 1.0 and the update is 0.9 - then this deems true.
    // jQuery.each(remoteVersion,
    // function(i, item) {
    //     alert(item + ' > ' + thisVersion[i]);
    //     if (item > thisVersion[i])
    //     update = true;
    // });

    if (update) {
      var doUpdate = confirm("We have found an update for the jQuery API Browser.  Would you like to download now?");
      if (doUpdate) {
        jQueryAPI.Chrome.Popup({
          'message': 'Downloading update...',
          'showLink': false,
          'popupLife': 6000
        });
        stream.addEventListener(air.ProgressEvent.PROGRESS, updatingStatus);
        stream.addEventListener(air.Event.COMPLETE, updateApplication);
        stream.load(new air.URLRequest(remoteAir));
      } else {
          jQueryAPI.Update.Ignore = true; // don't keep showing the screen for this session
      }
    } else {
        if (jQueryAPI.Update.ShowFail) {
            alert('No updates have been found at this time.');
            jQueryAPI.Update.ShowFail = false;
        }
    }
    
    // Handlers
    function updatingStatus(event) {
        var percentage = Math.round((event.bytesLoaded / event.bytesTotal) * 100);
    }

    function updateApplication(event) {
        var filename = "update/jquery-api-browser-" + remoteVersionString + ".air";
        var ba = new air.ByteArray();
        stream.readBytes(ba, 0, stream.bytesAvailable);
        updateFile = air.File.applicationStorageDirectory.resolvePath(filename);
        fileStream = new air.FileStream();
        fileStream.addEventListener(air.Event.CLOSE, installUpdate);
        fileStream.openAsync(updateFile, air.FileMode.WRITE);
        fileStream.writeBytes(ba, 0, ba.length);
        fileStream.close();

        function installUpdate(event) {
            var updater = new air.Updater();
            // Notice that the version name has to be present as a second parameter
            updater.update(updateFile, remoteVersionString);
        }
    }
};
