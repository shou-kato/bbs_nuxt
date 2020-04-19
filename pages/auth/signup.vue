<template>
  <div>
    <h1>signup!!</h1>
    <p v-show="error">{{ errorMessage }}</p>
    <v-text-field
      v-model="displayName"
      type="text"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      type="email"
      label="email"
      required
    ></v-text-field>
    <v-text-field
      v-model="emailPassword"
      type="password"
      label="password"
      required
    ></v-text-field>
    <v-btn text large @click="submitClick">signup</v-btn>
    <v-btn text to="/auth/login" nuxt>login-menu</v-btn>
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
      error: false
    }
  },
  methods: {
    submitClick() {
      this.error = false
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
