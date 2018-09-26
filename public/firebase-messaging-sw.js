// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
//
// firebase.initializeApp({
//     messagingSenderId: "368210186557"
// });
// const messaging = firebase.messaging();

importScripts("https://www.gstatic.com/firebasejs/4.12.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.12.0/firebase-messaging.js");
let config = {
    messagingSenderId: "368210186557"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
    const title = payload.notification.title;
    console.log('payload', payload.notification.icon);
    const options = {
        body: payload.notification.body,
        icon: payload.notification.icon
    }
    return self.registration.showNotification(title, options);
})
