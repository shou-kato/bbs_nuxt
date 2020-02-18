<template>
  <div>
    <input v-model="text" />
    <button @click="addtext">add</button>
  </div>
</template>
<script>
import firebase from '~/plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()
export default {
  data() {
    return {
      text: null,
      texts: []
    }
  },
  methods: {
    addtext() {
      if (!this.text) return
      db.collection('users').add({
        name: this.text
      })
      this.text = ''
    }
  }
}
</script>
