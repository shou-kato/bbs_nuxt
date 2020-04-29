<template lang="pug">
.app
  h1 signup画面
  .form-group
    label(for="InputdisplayName") displayName
    input(type="text" v-model="displayName" class="form-control" placeholder="name")
  .form-group
    label(for="exampleInputEmail1") Email address
    input(type="email" v-model="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email")
  .form-group
    label(for="exampleInputpassword") Password
    input(type="password" v-model="emailPassword" class="form-control"  placeholder="Password" )
    button(@click="submitClick" class="btn btn-primary") signup
  nuxt-link(to="/auth/login")
    button(class="btn btn-primary") login画面へ戻る
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
