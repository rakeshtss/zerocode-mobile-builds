
document.addEventListener('deviceready', onDeviceReady, false);
var admobid = {
    banner: 'ca-app-pub-4252617315602036/8649009347', // or DFP format "/6253334/dfp_example_ad"
    interstitial: 'ca-app-pub-4252617315602036/3370770117'
};
var interstitialAds = ['ca-app-pub-4252617315602036/3370770117', 'ca-app-pub-4252617315602036/3495231501'];
var interstitialReady = false;
var isTesting = false;
var showTimeAds = true;

function onDeviceReady() {
    checkIsDevice();
    firebaseNotifications();


    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener('onAdLoaded', onAdLoaded);
    document.addEventListener('onAdDismiss', onAdDismiss);
    adMobProBannerConfig(); 
    showInterstitialAds();
}

function checkIsDevice() {
    cordova.plugins.diagnostic.isDeviceRooted(function (rooted) {
        console.warn('rooted device', rooted);
        if (rooted) {
            alert("Sorry, you can't use this app as we've detected that your device has been rooted.");
            navigator.app.exitApp();
        }
    });
}

function onBackKeyDown(e) {
    e.preventDefault();
}

function adMobProBannerConfig() {


    if (AdMob) AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true,
        isTesting: isTesting,// works on emulator
    }, function () { console.log("Success Ad"); },
        function (error) { console.log("Error ad: " + error); });



    //
    //    if (AdMob) AdMob.prepareInterstitial({
    //        adId: admobid.interstitial,
    //        autoShow: false,
    //         isTesting: true,
    //        //isTesting: true,// works on emulator
    //    }, function(){console.log("Success Ad");},
    //    function(error){console.log("Error ad: "+error);});
    //
    // // window.AdMob.showInterstitial();



}


function onAdLoaded(e) {
    if (e.adType == 'interstitial') {
        console.warn('ads loaded');
        interstitialReady = true;
        // AdMob.showInterstitial();
    }
}

function onAdDismiss(e) {
    if (e.adType == 'interstitial') {
        interstitialReady = false;
        showTimeAds = false;
        setTimeout(function () { showTimeAds = true; }, 10000);
        showInterstitialAds();
    }
}
function showInterstitialAds() {

    if (interstitialReady) {
        if (showTimeAds) {
            AdMob.showInterstitial();
        }
    } else {

        var interstitial = interstitialAds[Math.floor(Math.random() * interstitialAds.length)];
        AdMob.prepareInterstitial({
            adId: interstitial,
            autoShow: false,
            isTesting: isTesting
        }, function () { console.warn("success ad: "); interstitialReady = true; },
            function (error) { console.warn("Error ad: " + error); });

    }
}

function showBanner() {


}

function firebaseNotifications() {
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
}