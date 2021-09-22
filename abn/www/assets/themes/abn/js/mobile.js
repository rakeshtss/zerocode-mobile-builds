document.addEventListener('deviceready', onDeviceReady, false);
var iosVersion = "5.1.0";
var androidVersion = "4.1.0";
var admobid = {
    banner: 'ca-app-pub-4252617315602036/8649009347', // or DFP format "/6253334/dfp_example_ad"
    interstitial: 'ca-app-pub-4252617315602036/3370770117'
};
var interstitialAds = ['ca-app-pub-4252617315602036/3370770117'];
var interstitialReady = false;
var isTesting = true;
var showTimeAds = true;

function onDeviceReady() {
    checkIsDevice();
    firebaseNotifications();

    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener('onAdLoaded', onAdLoaded);
    document.addEventListener('onAdDismiss', onAdDismiss);
    //showMobileAdBanner();
    // showInterstitialAds2();
}

function checkIsDevice() {
    cordova.plugins.diagnostic.isDeviceRooted(function(rooted) {
        console.warn('rooted device', rooted);
        if (rooted) {
            alert("Sorry, you can't use this app as we've detected that your device has been rooted.");
            navigator.app.exitApp();
        }
    });
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
            if (zc.queryParams.s) {
                zc.actionService.navigateByUrl('/t/' + zc.params.app + '/' + zc.params.module + '/' + zc.queryParams.s);
            } else {
                zc.actionService.navigateByUrl('/t/' + zc.params.app + '/' + zc.params.module);
            }
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

function showBannerAd(bannerId) {
    if (!bannerId) {
        bannerId = admobid.banner
    }
    console.warn('bannerId', bannerId);

    // isTesting: true, // works on emulator
    if (AdMob) AdMob.createBanner({
            adId: admobid.banner,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow: true,
        }, function() { console.warn("Success Ad"); },
        function(error) { console.warn("Error ad: " + error); });

    // if (AdMob) AdMob.showBanner();
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
        setTimeout(function() { showTimeAds = true; }, 10000);
        // showInterstitialAds();
    }
}

function showInterstitialAds(interstitialId) {
    hideBannerAd();
    if (!interstitialId) {
        var interstitialId = interstitialAds[Math.floor(Math.random() * interstitialAds.length)];
    }
    // isTesting: false
    if (AdMob) AdMob.prepareInterstitial({
            adId: interstitialId,
            autoShow: true,

        }, function() {
            console.warn("success ad: ");
            interstitialReady = true;
        },
        function(error) { console.warn("Error ad: " + error); });
}

function showInterstitialAds2(interstitialId) {
    if (interstitialReady) {
        if (AdMob) AdMob.showInterstitial();
    } else {
        if (!interstitialId) {
            var interstitialId = interstitialAds[Math.floor(Math.random() * interstitialAds.length)];
        }
        hideBannerAd();

        if (AdMob) AdMob.prepareInterstitial({
                adId: interstitialId,
                autoShow: false,
                isTesting: false
            }, function() {
                console.warn("success ad: ");
                interstitialReady = true;
            },
            function(error) { console.warn("Error ad: " + error); });

    }
}

function showBanner_old() {

    if (AdMob) AdMob.showBanner();
}

function hideBannerAd() {
    if (AdMob) AdMob.hideBanner();
}

function firebaseNotifications() {
    window['FirebasePlugin'].grantPermission(function(hasPermission) {
        // alert('has permission;' + hasPermission);
        if (hasPermission) {
            window['FirebasePlugin'].subscribe("/topics/all", function() {
                console.warn("Subscribed to topic");
            }, function(error) {
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
                setTimeout(function() { zc.actionService.navigateByUrl('/' + data.url); }, 3000);
            }
        }
    });
}

function checkAppVersion() {

    if (zc && zc.http) {
        var timeStamp = new Date().getTime();
        zc.http.getExternalUrl('https://ebeta.andhrajyothy.com/assets/static-jsons/version.json?cache=' + timeStamp).subscribe(res => {
            // alert('window.cordova.platformId',window.cordova.platformId);
            zc['versionInfo'] = res;
            if (window.cordova) {
                if (window.cordova.platformId == 'ios') {
                    zc['versionInfo'] = res.ios;
                    if (res.ios.app_availability == "false") {
                        zc['versionInfo']['title'] = res.ios.message_maintance;
                        zc['versionInfo']['message'] = " ";
                        zc['versionInfo']['app_availability'] = "false";
                        zcGlobal.zc_modal_9676.open();

                    } else {
                        if (res.ios && res.ios.version !== iosVersion) {
                            zc['versionInfo']['title'] = res.ios.title;
                            zc['versionInfo']['message'] = res.ios.message;
                            if (res.ios.force_update == "true") {
                                zcGlobal.zc_modal_9676.open();
                            } else {
                                var reminderTime = parseInt(localStorage.getItem('version_reminder') || 0);
                                var localTime = new Date().getTime();
                                if (localTime > reminderTime || reminderTime == 0) {
                                    zcGlobal.zc_modal_9676.open();
                                }
                            }
                        }
                    }
                }
                if (res.android && window.cordova.platformId == 'android') {
                    if (res.android.app_availability == "false") {
                        zc['versionInfo']['title'] = res.ios.message_maintance;;
                        zc['versionInfo']['message'] = " ";
                        zc['versionInfo']['app_availability'] = "false";
                        zcGlobal.zc_modal_9676.open();
                    } else {
                        if (res.android && res.android.version !== androidVersion) {
                            zc['versionInfo']['title'] = res.android.title;
                            zc['versionInfo']['message'] = res.android.message;
                            if (res.android.force_update == "true") {
                                zcGlobal.zc_modal_9676.open();
                            } else {
                                var reminderTime = parseInt(localStorage.getItem('version_reminder') || 0);
                                var localTime = new Date().getTime();
                                if (localTime > reminderTime || reminderTime == 0) {
                                    zcGlobal.zc_modal_9676.open();
                                }

                            }
                        }
                    }
                }
            }
        });
    }
}

function downloadFile(file) {
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(file);

    fileTransfer.download(
        uri,
        fileURL,
        function(entry) {
            console.log("download complete: " + entry.toURL());
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);
        },
        false, {}
    );
}