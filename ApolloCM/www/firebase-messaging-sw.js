// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyBKlh4Smt2_hcwTwcT-RGn1zQPgszMOY3o",
    authDomain: "apollo-coupon-management.firebaseapp.com",
    projectId: "apollo-coupon-management",
    storageBucket: "apollo-coupon-management.appspot.com",
    messagingSenderId: "188697981634",
    appId: "1:188697981634:web:4ac3cd9aaf92abfb6cc15b",
    measurementId: "G-VEQZ370E8P"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.warn('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});