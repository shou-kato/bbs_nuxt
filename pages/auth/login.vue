<template lang="pug">
.app
  .my-4
    h1 ログイン画面
    nuxt-link(to="/auth/signup")
      button().btn.btn-primary.btn_info.float-right signup画面に移動
  .form-group
    label(for="exampleInputEmail1") Email address
    input(type="email" v-model="email" aria-describedby="emailHelp" placeholder="Enter email").form-control
  .form-group
    label(for="exampleInputpassword") Password
    input(type="password" v-model="emailPassword" placeholder="Password" ).form-control
  .ml-4
    button(@click="dologin").btn.btn-primary.btn-lg login
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
        this.$auth.onAuthStateChanged(user => {
            this.$store.dispatch('setUser', user.displayName)
            if (user) {
                this.$router.push('/protected')
            }
            if (!user) {
                console.log('メールアドレスが正しくありません')
            }
        })
    },
    methods: {
        dologin() {
            this.$auth
                .signInWithEmailAndPassword(this.email, this.emailPassword)
                .then(() => this.$router.push('/protected'))
                .catch(error => {
                    const errorCode = error.code
                    const errorMessage = error.message

                    if (errorCode === 'auth/wrong-password') {
                        this.errorMessage = 'Wrong password'
                    } else {
                        alert(errorMessage)
                    }
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
</style>
