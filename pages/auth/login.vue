<template>
  <div>
    {{ $store.state.user }}
    <input type="text" v-model="email" />
    <input type="password" v-model="emailPassword" />
    <button v-on:click="login">ログイン</button>
    <button v-on:click="logout">ログアウト</button>
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
    })
  },
  methods: {
    login() {
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
    logout() {
      firebase.auth().signOut()
      this.$store.dispatch('logout')
    }
  }
}
</script>
