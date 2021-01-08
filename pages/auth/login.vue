<template>
  <div>
    <h1>ログイン</h1>
    <nuxt-link to="/auth/signup">
      <button>signup画面に移動</button>
    </nuxt-link>
    <div>
      <label for="">
        <input
          v-model="email"
          type="email"
        >
      </label>
      <label for="">
        <input
          v-model="emailPassword"
          type="password"
        >
      </label>
    </div>
    <button @click="login">
      login
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      emailPassword: '',
      errorMessage: '',
    }
  },
  mounted() {
    this.$auth.onAuthStateChanged((user) => {
      this.$store.dispatch('setUser', user.displayName)
      if (user) {
        this.$router.push('/protected')
      }
      if (!user) return 
    })
  },
  methods: {
    login() {
      this.$auth
        .signInWithEmailAndPassword(this.email, this.emailPassword)
        .then(() => this.$router.push('/protected'))
        .catch((error) => {
          const errorCode = error.code
          if (errorCode === 'auth/wrong-password') {
            this.errorMessage = 'Wrong password'
          } 
        })
    },
  },
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
