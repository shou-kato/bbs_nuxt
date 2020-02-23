<template>
  <div>
    <h1>こんばんはです</h1>
    <input v-model="inputText" />
    <button @click="onclickAddbutton">add</button>
    <ul id="example">
      <li v-for="messageSorted in messagesSorted" :key="messageSorted.id">
        {{ messageSorted.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { db } from '~/plugins/firebase'
export default {
  data() {
    return {
      inputText: null,
      messages: []
    }
  },
  computed: {
    // メッセージを日付順にソート
    messagesSorted() {
      const messages = this.messages
      messages.sort((a, b) => (a.time < b.time ? 1 : -1))
      return messages
    }
  },
  created() {
    this.getMessages()
  },
  methods: {
    onclickAddbutton() {
      // 空の場合は除外
      if (!this.inputText) return
      this.submitFirestore()
      this.addinputText()
    },
    // messageをfirestoreに追加
    submitFirestore() {
      db.collection('users').add({
        name: this.inputText,
        time: new Date(),
        id: this.get_random()
      })
    },
    // 自分の配列にmessageをPush
    addinputText() {
      this.messages.push({
        name: this.inputText,
        time: new Date(),
        state: 'user_text',
        id: this.get_random()
      })
      this.inputText = ''
    },
    // 乱数生成関数
    get_random() {
      // 生成する文字列の長さ
      const l = 8
      // 生成する文字列に含める文字セット
      const c = 'abcdefghijklmnopqrstuvwxyz0123456789'
      const cl = c.length
      let r = ''
      for (let i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)]
      }
      return r
    },
    // firestoreからメッセージを取得
    async getMessages() {
      const querySnapshot = await db.collection('users').get()
      querySnapshot.docs.forEach((e) => {
        const data = e.data()
        data.time = data.time.toDate()
        this.messages.push(data)
      })
    }
  }
}
</script>
