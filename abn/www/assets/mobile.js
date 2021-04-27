document.addEventListener("deviceready", function() {
    // cordova.plugins.diagnostic.isDeviceRooted(function(rooted){ 
    //   console.warn('rooted device', rooted);
    //    if(rooted){
    //         alert("Sorry, you can't use this app as we've detected that your device has been rooted.");
    //         navigator.app.exitApp();
    //   }
    // });
    admob.banner.prepare()

    // Show the banner
    admob.banner.show({
        id: 'ca-app-pub-4071928387898761/4000779367',
        autoShow: true
    })
    // window['FirebasePlugin'].subscribe("/topics/all", function() {
    //     console.warn("Subscribed to topic");
    // }, function(error) {
    //     console.error("Error subscribing to topic: " + error);
    // }); 
    window['FirebasePlugin'].grantPermission(function(hasPermission){ 
        // alert('has permission;'+hasPermission);
        if(hasPermission){
            window['FirebasePlugin'].subscribe("/topics/all", function() {
                console.warn("Subscribed to topic");
            }, function(error) {
                console.error("Error subscribing to topic: " + error);
            });
        }

    });

}, false);