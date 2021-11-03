import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore"; 
import 'firebase/storage'; 
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
} else {
  Firebase = firebase.app()
}



let auth = Firebase.auth();
let store = Firebase.firestore();
let storage = Firebase.storage();
export { auth, store, storage, firebase};