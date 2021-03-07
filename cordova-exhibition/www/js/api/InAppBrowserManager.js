//Singleton Object
var InAppBrowserManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          openWindow: function (url) {
              var windowRef = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
              
              return windowRef; 
          },
          closeWindow: function (windowRef) {  
              if (windowRef) {
                  windowRef.close();
              }
          }
      };
  };
 
  return {
    getInstance: function () {
      if (!instance) {
          instance = createObject();
      }
 
      return instance;
    }
  }; 
})();