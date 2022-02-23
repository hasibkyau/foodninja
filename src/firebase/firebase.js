//import firebase from "firebase/app"
import firebase from 'firebase/compat/app';
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdJvlmOsgrH_t3Jr_mXFkus6RlTqA6ZDg",
    authDomain: "foodninja-4c3c8.firebaseapp.com",
    databaseURL: "https://foodninja-4c3c8-default-rtdb.firebaseio.com",
    projectId: "foodninja-4c3c8",
    storageBucket: "foodninja-4c3c8.appspot.com",
    messagingSenderId: "887193688736",
    appId: "1:887193688736:web:258b6fa767dda8dd1a47c5",
    measurementId: "G-QB1G1DSQRB"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

 export {storage, firebase as default};