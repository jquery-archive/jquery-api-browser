jQueryAPI.Network.ServiceMonitor = null;

jQueryAPI.Network.Initialise = function( callback ) {  
  jQueryAPI.Network.ServiceMonitor = new air.URLMonitor(new air.URLRequest('http://www.jquery.com')); 
  jQueryAPI.Network.ServiceMonitor.addEventListener(air.StatusEvent.STATUS, jQueryAPI.Network.URLStatus); 
  jQueryAPI.Network.ServiceMonitor.pollInterval = 300000;
  jQueryAPI.Network.ServiceMonitor.start();
  
  function checkLoop() {
    jQueryAPI.Network.ServiceMonitor.stop();
    jQueryAPI.Network.ServiceMonitor.start();
  }
  
  var timer = new air.Timer(30000,0);
  timer.addEventListener(air.TimerEvent.TIMER, checkLoop);
  timer.start();
  
  return callback();
};