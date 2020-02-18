import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDUmUvxF3Ns9d5WY4Krtsp0pRb2coTAg_A',
  authDomain: 'firestore-3a9e6.firebaseapp.com',
  databaseURL: 'https://firestore-3a9e6.firebaseio.com',
  projectId: 'firestore-3a9e6',
  storageBucket: 'firestore-3a9e6.appspot.com',
  messagingSenderId: '438266842909',
  appId: '1:438266842909:web:29a6116283ef0992229bf4',
  measurementId: 'G-6GMESK99WC'
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export default firebase
