import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyAOIGd5KzfOc_he_j4MgMQcFMWKrBX180Y",
    authDomain: "pl2050.firebaseapp.com",
    projectId: "pl2050",
    storageBucket: "pl2050.appspot.com",
    messagingSenderId: "80052485520",
    appId: "1:80052485520:web:bb7ebf28840b56cb4c0715",
    measurementId: "G-YQDX1SVHBZ"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export const db = firebaseApp.firestore();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();

export default auth;