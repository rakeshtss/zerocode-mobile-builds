document.addEventListener("deviceready", function(){ 
  cordova.plugins.diagnostic.isDeviceRooted(function(rooted){ 
    console.warn('rooted device', rooted);
     if(rooted){
          alert("Sorry, you can't use this app as we've detected that your device has been rooted.");
          navigator.app.exitApp();
    }
  });
}, false);