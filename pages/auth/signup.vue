<template>
  <div>
    <h1>signup!!</h1>
    {{ errorMessage }}
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
