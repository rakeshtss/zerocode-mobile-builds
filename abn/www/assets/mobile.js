
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
var lastTimeBackPress=0;
var timePeriodToExit=2000;
function onBackKeyDown(e) {
    if(new Date().getTime() - lastTimeBackPress < timePeriodToExit || window.location.href.match('/epaper/news/speed-news')){
         navigator.notification.confirm(
                   'Are you sure want to exit the app?',
                   onConfirmQuit,
                   'AndhraJyothy',
                   'OK,Cancel'
            );
    }else{
      lastTimeBackPress=new Date().getTime();
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        //alert(' s'+window.location);
          if (window.location.href.match('/t/')) {
                 // IOS DEVICE
                zc.actionService.navigateByUrl('/zcbase/account/home');
          }else if(window.location.href.match('epaper/news/telugunews-details/') || window.location.href.match('epaper/news/telugunews')) {
                      zc.actionService.navigateByUrl('/epaper/news/news-home');
          }else if(window.location.href.match('#page')){

           zc.actionService.navigateByUrl('/t/'+zc.params.app+'/'+zc.params.module);
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
function onConfirmQuit(button){
   if(button == "1"){
     navigator.app.exitApp();
   }
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