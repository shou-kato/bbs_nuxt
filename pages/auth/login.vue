<template lang="pug">
.app
  h1 ログイン画面
  .form-group
    label(for="exampleInputEmail1") Email address
    input(type="email" v-model="email" class="form-control"  aria-describedby="emailHelp" placeholder="Enter email")
  .form-group
    label(for="exampleInputpassword") Password
    input(type="password" v-model="emailPassword" class="form-control"  placeholder="Password" )
    button(@click="dologin" class="btn btn-primary") login
  nuxt-link(to="/auth/signup")
    button(class="btn btn-primary") signup画面に移動
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
