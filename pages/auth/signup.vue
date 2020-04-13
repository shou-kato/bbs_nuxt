<template>
  <div>
    <h1>サインアップ</h1>
    <form action="/login.vue" method="post">
      <p v-show="error">{{ errorMessage }}</p>
      <p>名前</p>
      <input v-model="displayName" />
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
        .then(() => {
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: this.displayName
            })
            .then(function(profile) {
              // Update successful.
            })
          console.log('登録完了')
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
