<template>
  <div>
    <h1>こんばんはです</h1>
    <input v-model="inputText" />
    <button @click="onclickAddbutton">add</button>
    <ul>
      <li v-for="messageSorted in messagesSorted" :key="messageSorted.id">
        {{ messageSorted.name }} {{ messageSorted.time }}
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
        id: this.getRandom(),
        time: new Date()
      })
    },
    // 自分の配列にmessageをPush
    addinputText() {
      this.messages.push({
        name: this.inputText,
        id: this.getRandom(),
        time: new Date()
      })
      this.inputText = ''
    },
    // 乱数生成関数
    getRandom() {
      // 生成する文字列の長さ
      const len = 8
      // 生成する文字列に含める文字セット
      const alphanuMeric = 'abcdefghijklmnopqrstuvwxyz0123456789'
      const strLen = alphanuMeric.length
      let spaceStr = ''
      for (let i = 0; i < len; i++) {
        spaceStr += alphanuMeric[Math.floor(Math.random() * strLen)]
      }
      return spaceStr
    },
    // firestoreからメッセージを取得
    async getMessages() {
      const querySnapshot = await db.collection('users').get()
      console.log(querySnapshot)
      querySnapshot.docs.forEach((e) => {
        const data = e.data()
        data.time = data.time.toDate()
        this.messages.push(data)
      })
    }
  }
}
</script>
