<template>
  <div>
    <h1>signup!!</h1>
    <p v-show="error">{{ errorMessage }}</p>
    <v-text-field
      type="text"
      v-model="displayName"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      type="email"
      v-model="email"
      label="email"
      required
    ></v-text-field>
    <v-text-field
      type="password"
      v-model="emailPassword"
      label="password"
      required
    ></v-text-field>
    <v-btn text large @click="submitClick">signup</v-btn>
    <v-btn text to="/auth/login" nuxt>login-menu</v-btn>
  </div>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      displayName: '',
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
        .then(async () => {
          console.log('処理が始まるよ')
          await firebase.auth().currentUser.updateProfile({
            displayName: this.displayName
          })
          this.$router.push('/auth/login')
        })
        .catch((error) => {
          const errorCode = error.code
          switch (errorCode) {
            case 'auth/invalid-email':
              this.error = true
              this.errorMessage = 'メールアドレスの形式が間違ってます'
              break
            case 'auth/weak-password':
              this.error = true
              this.errorMessage = '英数字6文字以上でお願いします'
              break
            case 'auth/email-already-in-use':
              this.error = true
              this.errorMessage = 'このメールアドレスは使用されています'
              break
          }
        })
    }
  }
}
</script>
