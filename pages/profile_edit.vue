<template>
  <div>
    <h1>Edit</h1>
    <p>display name</p>
    <input v-model="displayName" />
    <p>age</p>
    <input v-model="age" size="2" />
    <p>seibetu</p>
    <input v-model="seibetu" type="radio" name="seibetu" value="男" />男
    <input v-model="seibetu" type="radio" name="seibetu" value="女" />女
    <button @click="submit">送信</button>
  </div>
</template>
<script>
import { db } from '~/plugins/firebase'
export default {
  data() {
    return {
      displayName: '',
      age: '',
      seibetu: ''
    }
  },
  methods: {
    submit() {
      db.collection('users').add({
        displayName: this.displayName,
        Age: this.age,
        seibetu: this.seibetu
      })
    }
  }
}
</script>
