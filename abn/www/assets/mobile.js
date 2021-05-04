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
    fileUpload();

}, false);

function fileUpload() {
    let imgUrl = "https://betazccdn.andhrajyothy.com/2021/05/01/main_edition/andhra_pradesh/0105-MAIN-MN-01C/p.webp";
    const self = this;
    var xhr = new XMLHttpRequest();
    xhr.open("get", imgUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        console.warn('onload');
        console.warn('onload', this.status);
        if (this.status == 200) {
            var blob = this.response;
            let oFileReader = new FileReader();
            oFileReader.onloadend = function(e) {
                let base64 = e.target;
                self.base64String = (base64).result;
                let img = new Image;
                img.onload = function() {
                    this.pageHeight = img.height;
                    this.pageWidth = img.width;
                    console.log('img', img.width, img.height);
                };
                img.src = oFileReader.result;
            };
            oFileReader.readAsDataURL(blob);
        }
    };
    xhr.send();
}