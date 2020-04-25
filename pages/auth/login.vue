<template lang="pug">
  div.login-content
    h1 ログイン画面
      p {{ errorMessge }}
      .form
        p.form-content メールアドレス
        input(v-model="email" type="email" class="login-form")
        p.form-content パスワード
        input(v-model="emailPassword" type="password" class="login-form")
      button(@click="dologin") login
      a(href="/auth/signup" )
        button signup
    
</template>
<script>
export default {
  data() {
    return {
      email: '',
      emailPassword: '',
      errorMessage: ''
    }
  },
  mounted() {
    this.$auth.onAuthStateChanged((user) => {
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
      this.$auth
        .signInWithEmailAndPassword(this.email, this.emailPassword)
        .then(() => console.log('ログイン完了'))
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message

          if (errorCode === 'auth/wrong-password') {
            this.errorMessage = 'Wrong password'
          } else {
            alert(errorMessage)
          }
        })
      // this.error = true
      // this.errorMessage = 'メールアドレスかパスワードが間違っています'
      // setTimeout(() => {
      //   this.errorMessage = ''
      // }, 10000)
      // this.error = false
    },
    dologout() {
      this.$$auth.signOut()
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style>
.login-content {
  min-height: 100%;
}
.form {
  padding: 10px 10px 10px 10px;
}
.form-content {
  color: #000000;
}
</style>
