document.addEventListener("deviceready", function () {
    // window.addEventListener = function () {
    //     (window.EventTarget || Window).prototype.addEventListener.apply(this, arguments);
    //   };
    //   window.removeEventListener = function () {
    //     (window.EventTarget || Window).prototype.removeEventListener.apply(this, arguments);
    //   };
    //   document.addEventListener = function () {
    //     (window.EventTarget || Document).prototype.addEventListener.apply(this, arguments);
    //   };
    //   document.removeEventListener = function () {
    //     (window.EventTarget || Document).prototype.removeEventListener.apply(this, arguments);
    //   };
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown(e) {
        e.preventDefault();
        alert('Back Button is Pressed!');
    }

    window['FirebasePlugin'].grantPermission(function (hasPermission) {
        // alert('has permission;'+hasPermission);
        if (hasPermission) {
            window['FirebasePlugin'].subscribe("/topics/all", function () {
                console.warn("Subscribed to topic");
            }, function (error) {
                console.error("Error subscribing to topic: " + error);
            });
        }

    });
}, false);