var admobid = {
    banner: 'ca-app-pub-4252617315602036/3656537111', // or DFP format "/6253334/dfp_example_ad"
    interstitial: 'ca-app-pub-4252617315602036/3370770117'
};
// var interstitialAds = ['ca-app-pub-4252617315602036/5352762166'];
var interstitialAds = ['ca-app-pub-4252617315602036/5352762166', 'ca-app-pub-4252617315602036/5352762166', 'ca-app-pub-4252617315602036/3370770117', 'ca-app-pub-4252617315602036/3495231501'];
var interstitialReady = false;
var isTesting = false;
var showTimeAds = true;
var isPrepareInterstitial = false;
document.addEventListener('deviceready', onDeviceReady, false);
// document.addEventListener('deviceready', adMobProBannerConfig, false);
// document.addEventListener('deviceready', showInterstitialAds, false);
document.addEventListener('deviceready', firebaseNotifications, false);



function onDeviceReady() {
    interstitialReady = false;
    isTesting = false;
    showTimeAds = true;
    isPrepareInterstitial = false;

    // adMobProBannerConfig();


    // firebaseNotifications();


    // document.addEventListener("backbutton", onBackKeyDown, false);
    if (AdMob) {
        adMobProBannerConfig();
        showInterstitialAds();
        document.addEventListener('onAdDismiss', onAdDismiss, false);
        document.addEventListener('onAdLoaded', onAdLoaded, false);
        document.addEventListener('onAdFailLoad',failLoad);
        document.addEventListener('onAdLeaveApp',failLoad);
        document.addEventListener('onAdPresent',failLoad);


        //     document.addEventListener('onReceiveAd', function(){});
        //     document.addEventListener('onFailedToReceiveAd', function(data){ alert('onFailedToReceiveAd');});
        //     document.addEventListener('onPresentAd', function(){ alert('onPresentAd');});
        //     document.addEventListener('onDismissAd', function(){ alert('onDismissAd'); });
        //     document.addEventListener('onLeaveToAd', function(){ alert('onLeaveAds'); });
        //     document.addEventListener('onReceiveInterstitialAd', function(){ alert('va'); });
        //     document.addEventListener('onPresentInterstitialAd', function(){ alert('onPresentInterstitialAd'); });
        //     document.addEventListener('onDismissInterstitialAd', function(){
        //         alert('onDismissInterstitialAd');
        // });

        // setTimeout(function () {  showInterstitialAds();}, 1000);


    }

    checkIsDevice();
}
function failLoad(e){
    console.warn('e----------',e);
}

function checkIsDevice() {
    try {
        cordova.plugins.diagnostic.isDeviceRooted(function (rooted) {
            console.warn('rooted device', rooted);
            if (rooted) {
                alert("Sorry, you can't use this app as we've detected that your device has been rooted.");
                navigator.app.exitApp();
            }
        });
    } catch (error) {
        console.warn('checkIsDevicem err', error);
    }

}
var lastTimeBackPress = 0;
var timePeriodToExit = 2000;
function onBackKeyDown(e) {
    if (new Date().getTime() - lastTimeBackPress < timePeriodToExit || window.location.href.match('/epaper/news/speed-news')) {
        navigator.notification.confirm(
            'Are you sure want to exit the app?',
            onConfirmQuit,
            'AndhraJyothy',
            'OK,Cancel'
        );
    } else {
        lastTimeBackPress = new Date().getTime();
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        //alert(' s'+window.location);
        if (window.location.href.match('/t/')) {
            // IOS DEVICE
            zc.actionService.navigateByUrl('/zcbase/account/home');
        } else if (window.location.href.match('epaper/news/telugunews-details/') || window.location.href.match('epaper/news/telugunews')) {
            zc.actionService.navigateByUrl('/epaper/news/news-home');
        } else if (window.location.href.match('#page')) {

            zc.actionService.navigateByUrl('/t/' + zc.params.app + '/' + zc.params.module);
        } else {
            // EVERY OTHER DEVICE
            zc.actionService.navigateByUrl('/epaper/news/speed-news');
        }
        //        if (window.location.href.match('/epaper/news/speed-news')) {
        //            // IOS DEVICE
        //            history.go(-1);
        //        } else if (userAgent.match(/Android/i)) {
        //            // ANDROID DEVICE
        //            navigator.app.backHistory();
        //        } else {
        //            // EVERY OTHER DEVICE
        //            history.go(-1);
        //            history.back();
        //        }
    }
    // e.preventDefault();

}

function onConfirmQuit(button) {
    if (button == "1") {
        navigator.app.exitApp();
    }
}

function adMobProBannerConfig() {


    if (AdMob) AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: false,
        overlap: false,
    }, function () { console.log("Banner Success Ad"); },
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
    if(e.adType == 'banner'){
        AdMob.showBanner();
    }
    
}

function onAdDismiss(e) {
    // alert('e.adType '+e.adType );
    if (e && e.adType == 'interstitial') {
        interstitialReady = false;
        showTimeAds = false;
        AdMob.showBanner();
        setTimeout(function () { showTimeAds = true; }, 20000);
        showInterstitialAds();
    }
}

function showInterstitialAds() {
    if (interstitialReady) {
        if (showTimeAds) {
            interstitialReady = false;
            AdMob.hideBanner();
            AdMob.showInterstitial(function () { console.warn("showInterstitial  Success Ad"); },
                function (error) { console.warn("showInterstitial Error ad: " + error); });
        }
    } else {

        var interstitial = interstitialAds[Math.floor(Math.random() * interstitialAds.length)];

            AdMob.prepareInterstitial({
                adId: interstitial,
                autoShow: false
            }, function () { console.warn("success ad: "); interstitialReady = true; isPrepareInterstitial = false; },
                function (error) { console.warn("Error ad: " + error); });

    }
}

function showBanner() {


}

function firebaseNotifications() {
    try {
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

        window['FirebasePlugin'].onMessageReceived((data) => {
            console.warn('Notification recieved data', data);
            console.warn('cordova firebase Plugin mas');
            console.warn('Notification recieved data', data);
            if (data.tap) {
                if (data.type == 'url' && data.url) {
                    if (data.url.match('epaper/news/telugunews-details')) {
                        var operator = (data.url.match('/?')) ? '&' : '?';
                        data.url = data.url + operator + 'ref=true';
                    }
                    setTimeout(function () { zc.actionService.navigateByUrl('/' + data.url); }, 3000);
                }
            }
        });
    } catch (error) {
        console.warn('error', error);
    }

}
