import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'peakseekers-b6502.firebaseapp.com',
    databaseURL: 'https://peakseekers-b6502.firebaseio.com',
    projectId: 'peakseekers-b6502',
    storageBucket: 'peakseekers-b6502.appspot.com',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
    //initializing with the config object
    firebase.initializeApp(config);
}

//separting database API and authentication
const db = firebase.firestore();
const auth = firebase.auth();

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, facebookProvider };
