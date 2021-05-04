document.addEventListener("deviceready", function() {

    window['FirebasePlugin'].grantPermission(function(hasPermission) {
        // alert('has permission;'+hasPermission);
        if (hasPermission) {
            window['FirebasePlugin'].subscribe("/topics/all", function() {
                console.warn("Subscribed to topic");
            }, function(error) {
                console.error("Error subscribing to topic: " + error);
            });
        }

    });
}, false);