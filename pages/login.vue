<template>
  <div>
    <form action="" method="post">
      <p v-show="error">{{ errorMessage }}</p>
      <p>email</p>
      <input v-model="email" type="email" />
      <p>password</p>
      <input v-model="emailPassword" type="password" />
    </form>
    <button @click="submitClick">送信</button>
  </div>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: '',
      emailPassword: '',
      errorMessage: '',
      error: false
    }
  },
  methods: {
    submitClick() {
      this.error = false
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.emailPassword)
        .then(() => {
          console.log('ログインできました')
        })
        .catch((error) => {
          const errorCode = error.code
          if (errorCode) {
            this.error = true
            this.errorMessage =
              'メールアドレスまたはパスワードが正しくありません'
          }
        })
    }
  }
}
</script>
