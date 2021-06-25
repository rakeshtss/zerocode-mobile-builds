
document.addEventListener('deviceready', onDeviceReady, false);
var admobid = {
    banner: 'ca-app-pub-4252617315602036/8649009347', // or DFP format "/6253334/dfp_example_ad"
    interstitial: 'ca-app-pub-4252617315602036/3370770117'
};
var interstitialReady = false;
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
    // alert('Back Button is Pressed!');
}

// function adMobBannerConfig() {
//     admob.interstitial.config({
//         id: 'ca-app-pub-4252617315602036/5779303425',
//         autoShow: false
//     });

//     admob.interstitial.prepare().then(() => {
//         // alert('interstitial ok');
//     }).catch(e => {
//         console.warn('interstitial err', e);
//         // alert('er');
//     });
//     admob.interstitial.show()

//     // Show the banner
//     admob.banner.show({
//         id: 'ca-app-pub-4252617315602036/2851895361',
//         autoShow: true,
//         isTesting: false
//     });
//     admob.banner.prepare().then(() => {
//         // alert('ok');
//     }).catch(e => {
//         console.warn('add error', e);
//         // alert('er');
//     });
// }



function adMobProBannerConfig() {


    if (AdMob) AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true,
        isTesting: true,// works on emulator
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
        showInterstitialAds();
    }
}


function showInterstitialAds() {

    if (interstitialReady) {
        AdMob.showInterstitial();
    } else {
        AdMob.prepareInterstitial({
            adId: admobid.interstitial,
            autoShow: false,
            isTesting: true
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


// document.addEventListener("deviceready", function () {




//     // admob.config();
//     // admob.setOptions({
//     //     publisherId: 'ca-app-pub-4252617315602036~3472354702',
//     // });

//     admob.interstitial.config({
//         id: 'ca-app-pub-4252617315602036/5779303425',
//         autoShow: false
//     });

//     admob.interstitial.prepare().then(() => {
//         // alert('interstitial ok');
//     }).catch(e => {
//         console.warn('interstitial err', e);
//         // alert('er');
//     });
//     admob.interstitial.show()

//     // Show the banner
//     admob.banner.show({
//         id: 'ca-app-pub-4252617315602036/2851895361',
//         autoShow: true,
//         isTesting: false
//     });
//     admob.banner.prepare().then(() => {
//         // alert('ok');
//     }).catch(e => {
//         console.warn('add error', e);
//         // alert('er');
//     });
//     // window['FirebasePlugin'].subscribe("/topics/all", function() {
//     //     console.warn("Subscribed to topic");
//     // }, function(error) {
//     //     console.error("Error subscribing to topic: " + error);
//     // }); 
//     window['FirebasePlugin'].grantPermission(function (hasPermission) {
//         // alert('has permission;'+hasPermission);
//         if (hasPermission) {
//             window['FirebasePlugin'].subscribe("/topics/all", function () {
//                 console.warn("Subscribed to topic");
//             }, function (error) {
//                 console.error("Error subscribing to topic: " + error);
//             });
//         }

//     });

// }, false);