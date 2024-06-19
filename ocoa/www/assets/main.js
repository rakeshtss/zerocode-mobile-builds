document.addEventListener('deviceready', function() {
    // Check if notifications are enabled
    window.FirebasePlugin.hasPermission(function(hasPermission) {
        if (hasPermission) {
            console.log("Notification permission is already granted.");
        } else {
            // Request notification permission
            window.FirebasePlugin.grantPermission(function() {
                console.log("Notification permission granted.");
            }, function(error) {
                console.error("Error granting notification permission", error);
            });
        }
    }, function(error) {
        console.error("Error checking notification permission", error);
    });

    // Get FCM token
    window.FirebasePlugin.getToken(function(token) {
        console.log("FCM Token: " + token);
        // Send the token to your server to subscribe the user to a topic or send messages directly
    }, function(error) {
        console.error("Error getting FCM token", error);
    });
    window.FirebasePlugin.subscribe("all", function() {
        console.log("Subscribed to topic: all");
    }, function(error) {
        console.error("Error subscribing to topic: " + error);
    });

    // Handle incoming notifications
    window.FirebasePlugin.onMessageReceived(function(message) {
        console.warn("New FCM message: ", message);
        // Process the message and show notification or update UI
    }, function(error) {
        console.error("Error receiving FCM message", error);
    });

    // Handle token refresh
    window.FirebasePlugin.onTokenRefresh(function(token) {
        console.log("FCM Token refreshed: " + token);
        // Send the new token to your server
    }, function(error) {
        console.error("Error on token refresh", error);
    });
}, false);