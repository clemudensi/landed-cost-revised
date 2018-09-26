import firebase from 'firebase';

export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "368210186557"
    });
};
export const askForPermissioToReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('token do usuário:', token);

        return token;
    } catch (error) {
        console.error(error);
    }
};
