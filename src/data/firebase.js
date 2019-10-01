import { firebase } from '@firebase/app';
import '@firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA8EmB64hiIuvCapLYyYNPKUSEzZhd4zP0",
  authDomain: "uber-riders-community-a6132.firebaseapp.com",
  databaseURL: "https://uber-riders-community-a6132.firebaseio.com",
  projectId: "uber-riders-community-a6132",
  storageBucket: "uber-riders-community-a6132.appspot.com",
  messagingSenderId: "949530650501",
  appId: "1:949530650501:web:3c37fb58913e349d4486ec",
  measurementId: "G-JRMSW9LL6D"
 });


 const db = firebaseApp.firestore();

 export { db }