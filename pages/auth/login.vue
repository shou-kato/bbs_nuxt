<template>
  <div id="app">
    <h1>
      ログインがめーん
    </h1>
    <v-text-field
      v-model="email"
      type="email"
      :counter="10"
      label="email"
      required
    ></v-text-field>
    <v-text-field
      v-model="emailPassword"
      type="password"
      :counter="8"
      label="password"
      required
    ></v-text-field>
    <v-btn width="100" icon @click="dologin">login</v-btn>
    <v-btn width="100" icon to="/auth/signup" nuxt>signup</v-btn>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: '',
      emailPassword: ''
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(this.$store.dispatch('setUser', user.displayName))
      if (user) {
        this.$router.push('/protected')
      }
      if (!user) {
        console.log('メールアドレスが正しくありません')
      }
    })
  },
  methods: {
    dologin() {
      this.error = false
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.emailPassword)
        .then()
        .catch((error) => {
          const errorCode = error.code
          if (errorCode) {
            this.error = true
            this.errorMessage =
              'メールアドレスまたはパスワードが正しくありません'
          }
        })
    },
    dologout() {
      firebase.auth().signOut()
      this.$store.dispatch('logout')
    }
  }
}
</script>
