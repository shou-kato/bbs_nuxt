<template>
  <div>
    <input v-model="input_text" />
    <button @click="addinput_text">add</button>
    <ul id="example">
      <li v-for="test in tests" :key="test.id">
        {{ test.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { db } from '~/plugins/firebase'
export default {
  data() {
    return {
      input_text: null,
      tests: []
    }
  },
  created() {},
  methods: {
    addinput_text() {
      if (!this.input_text) return
      db.collection('users').add({
        name: this.input_text,
        time: new Date(),
        state: 'user_text',
        id: this.get_random()
      })
      this.input_text = ''
      this.save()
    },
    get_random() {
      // 生成する文字列の長さ
      const l = 8

      // 生成する文字列に含める文字セット
      const c = 'abcdefghijklmnopqrstuvwxyz0123456789'

      const cl = c.length
      // eslint-disable-next-line no-unused-vars
      let r = ''
      for (let i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)]
      }
      return r
    },
    async save() {
      // eslint-disable-next-line no-unused-vars
      const querySnapshot = await db
        .collection('users')
        .where('state', '==', 'user_text')
        .get()
      querySnapshot.docs.forEach((e) => {
        this.tests.push(e.data())
        // ここで重複の配列を取り除く
      })
    }
  }
}
</script>
