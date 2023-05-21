import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyCeJZ0gEfG2pQPhFAxTaHfXHZaIx7xg61U",
    authDomain: "foodwebsite-2a163.firebaseapp.com",
    databaseURL: "https://foodwebsite-2a163-default-rtdb.firebaseio.com",
    projectId: "foodwebsite-2a163",
    storageBucket: "foodwebsite-2a163.appspot.com",
    messagingSenderId: "810743389073",
    appId: "1:810743389073:web:dd688795416d37bc6a9830",
    measurementId: "G-WJZ07VPDEM"
};

firebase.initializeApp(firebaseConfig);

export default firebase;