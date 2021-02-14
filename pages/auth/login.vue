<template>
  <div style="text-align: center">

  <h1>ログイン</h1>
    <nuxt-link to="/auth/signup">
      <button>signup画面に移動</button>
    </nuxt-link>
    <div style="margin-top: 50px;">
      <label for="">
        <p>メールアドレス</p>
        <input
          v-model="email"
          type="email"
        >
      </label>
      <label for="">
        <p>パスワード</p>
        <input
          v-model="emailPassword"
          type="password"
        >
      </label>
    </div>
    <button @click="login">
      ログインする
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
      if (user == null) return
      this.$store.dispatch('setUser', user.displayName)
      if (user) return this.$router.push('/protected')
      if (!user) return
    })
  },
  methods: {
    login() {
      this.$auth
        .signInWithEmailAndPassword(this.email, this.emailPassword)
        .then(() => this.$router.push('/protected'))
        .catch((error) => {
          throw error
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

input {
  margin-bottom: 40px;
  width: 50%; /*親要素いっぱい広げる*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
</style>

