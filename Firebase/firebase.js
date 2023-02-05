
import * as FirebaseApp from "firebase/app"
import * as  auth from "firebase/auth";
import * as db from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuhQD6QudKfcVIyCsOGI3ujKfcvaVPn-0",
    authDomain: "signal-clone-590d9.firebaseapp.com",
    projectId: "signal-clone-590d9",
    storageBucket: "signal-clone-590d9.appspot.com",
    messagingSenderId: "170901432817",
    appId: "1:170901432817:web:da5b104adc74c156603c50"

};
let app;
if(FirebaseApp.getApps().length == 0){
    app = FirebaseApp.initializeApp(firebaseConfig);
} else {
    app = FirebaseApp.getApp();
};
export {db, auth};