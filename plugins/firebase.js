import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAZrsqKSSrJkAcuiKO-uZKmorart8ZoVeU',
  authDomain: 'nuxt-bbs-ac678.firebaseapp.com',
  databaseURL: 'https://nuxt-bbs-ac678.firebaseio.com',
  projectId: 'nuxt-bbs-ac678',
  storageBucket: 'nuxt-bbs-ac678.appspot.com',
  messagingSenderId: '382599098446',
  appId: '1:382599098446:web:75ac0cce8c1bbbea61931f',
  measurementId: 'G-NN7BRVVJW9'
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
export const db = firebase.firestore()
