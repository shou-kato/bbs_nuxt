<template>
  <div style="text-align: center">
    <h1>signup</h1>
    <nuxt-link to="/auth/login">
      <button>ログイン画面へ移動</button>
    </nuxt-link>
    <div style="margin-top: 50px;">
      <label>
        <p>Name</p>
        <input v-model="displayName">
      </label>
      <label>
        <p>Email</p>
        <input v-model="email">
      </label>
      <label>
        <p>PassWorld</p>

        <input v-model="emailPassword">
      </label>
    </div>
    <button @click="submitClick">
      アカウント作成する
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      displayName: '',
      email: '',
      emailPassword: '',
      errorMessage: '',
    }
  },
  methods: {
    submitClick() {
      this.$auth
        .createUserWithEmailAndPassword(this.email, this.emailPassword)
        .then(async () => {
          console.log('処理が始まるよ')
          await this.$auth.currentUser.updateProfile({
            displayName: this.displayName,
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
    },
  },
}
</script>
<style>
input {
  margin-bottom: 40px;
  width: 50%; /*親要素いっぱい広げる*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
</style>
