import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
var config = {
    apiKey: "AIzaSyCuflWRz_J8eo1It4jv9zfUJmBgplAyzuM",
    authDomain: "chaatspace.firebaseapp.com",
    databaseURL: "https://chaatspace.firebaseio.com",
    projectId: "chaatspace",
    storageBucket: "chaatspace.appspot.com",
    messagingSenderId: "1074826334369",
    appId: "1:1074826334369:web:21c06746dd06f537ece0e0",
    measurementId: "G-YG4L2Q0SG9"
  };
  firebase.initializeApp(config);

  export default firebase;