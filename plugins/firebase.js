import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
    firebase.initializeApp({
        // apiKey: process.env.API_KEY,
        // authDomain: process.env.AUTH_DOMAIN,
        // databaseURL: process.env.DATABASE_URL,
        // projectId: process.env.PROJECT_ID,
        // storageBucket: process.env.STORAGE_BUCKET,
        // messagingSenderId: process.env.MESSAGING_SENDER_ID,
        // appId: process.env.APP_ID,
        // measurementId: process.env.MEASUREMENTID,
        apiKey: 'AIzaSyAM5sZxLvkhoxXCSRjMkuhCIPV6YvRK3dw',
        authDomain: 'nuxt-bbs-5fc5c.firebaseapp.com',
        databaseURL: 'https://nuxt-bbs-5fc5c.firebaseio.com',
        projectId: 'nuxt-bbs-5fc5c',
        storageBucket: 'nuxt-bbs-5fc5c.appspot.com',
        messagingSenderId: '824105362667',
        appId: '1:824105362667:web:26e81a9acb59a7459fcaae',
        measurementId: 'G-XJS47DMVF7',
    })
}
export default (context, inject) => {
    inject('firebase', firebase)
    inject('firestore', firebase.firestore())
    inject('auth', firebase.auth())
}
