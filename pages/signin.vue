<template>
  <div>
    <h1>サインイン</h1>
    <form action method="post">
      <p v-show="error">{{ errorMessage }}</p>
      <p>email</p>
      <input v-model="email" type="email" />
      <p>password</p>
      <input v-model="emailPassword" type="password" />
    </form>
    <button @click="submitClick">送信</button>
    <button @click="signout">サインアウト</button>
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
          alert('ログインできました')
        })
        .catch((error) => {
          const errorCode = error.code
          if (errorCode) {
            this.error = true
            this.errorMessage =
              'メールアドレスまたはパスワードが正しくありません'
          }
        })
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          alert(
            'あなたのメールアドレス' +
              user.email +
              'あなたのユーザーネーム' +
              user.displayName
          )
          // ...
        } else {
          // User is signed out.
          // ...
        }
      })
    },
    signout() {
      firebase.auth().signOut()
    }
  }
}
</script>
