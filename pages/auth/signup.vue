<template>
  <div>
    <h1>signup</h1>
    <nuxt-link to="/auth/login">
      <button>ioginへ</button>
    </nuxt-link>
    <div>
      <label>
        <input v-model="displayName">
      </label>
      <label>
        <input v-model="email">
      </label>
      <label>
        <input v-model="emailPassword">
      </label>
    </div>
    <button @click="submitClick">
      signup
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
