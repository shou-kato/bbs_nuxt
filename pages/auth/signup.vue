<template lang="pug">
  div
    h1 signup
    p {{ erorrMessage }}
    p お名前
    input(v-model="displayName" type="text")
    p メールアドレス
    input(v-model="email" type="email")
    p パスワード
    input(v-model="emailPassword" type="password")
    button(@click="submitClick") signup
    a(href="/auth/login" )
      button login-menu
</template>
<script>
export default {
  data() {
    return {
      displayName: '',
      email: '',
      emailPassword: '',
      errorMessage: ''
    }
  },
  methods: {
    submitClick() {
      this.$auth
        .createUserWithEmailAndPassword(this.email, this.emailPassword)
        .then(async () => {
          console.log('処理が始まるよ')
          await this.$auth.currentUser.updateProfile({
            displayName: this.displayName
          })
          this.$router.push('/auth/login')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message

          if (errorCode === 'auth/weak-password') {
            this.errorMessage = 'weak-password'
          } else {
            alert(errorMessage)
          }
        })
    }
  }
}
</script>
