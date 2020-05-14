<template lang="pug">
.app
  .my-4
    h1 signup画面
    nuxt-link(to="/auth/login")
      button().btn.btn-primary.btn_info.float-right login画面へ戻る
  .form-group
    label(for="InputdisplayName") displayName
    input(type="text" v-model="displayName" placeholder="name").form-control
  .form-group
    label(for="exampleInputEmail1") Email address
    input(type="email" v-model="email"  aria-describedby="emailHelp" placeholder="Enter email").form-control
  .form-group
    label(for="exampleInputpassword") Password
    input(type="password" v-model="emailPassword" placeholder="Password" ).form-control
  .ml-4
    button(@click="submitClick").btn.btn-primary.btn-lg signup
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
                .catch(error => {
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
