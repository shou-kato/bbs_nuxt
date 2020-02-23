<template>
  <div>
    <form action="/" method="post">
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
        .createUserWithEmailAndPassword(this.email, this.emailPassword)
        .catch((error) => {
          const errorCode = error.code
          switch (errorCode) {
            case 'auth/invalid-email':
              this.error = true
              this.errorMessage = 'メールアドレスの形式が間違ってます'
              break
            case 'auth/weak-password':
              this.error = true
              this.errorMessage = 'パスワードをもう少し頭を使って考えてください'
              break
          }
        })
    }
  }
}
</script>
