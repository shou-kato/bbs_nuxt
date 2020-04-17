<template>
  <div>
    {{ $store.state.user }}
    <input type="text" v-model="email" />
    <input type="password" v-model="emailPassword" />
    <button v-on:click="dologin">ログイン</button>
    <nuxt-link to="/auth/signup">サインアップ画面へ</nuxt-link>
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
