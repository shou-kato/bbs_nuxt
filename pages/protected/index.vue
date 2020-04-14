<template>
  <div>
    <h1>現在制作中の掲示板</h1>
    <p>{{ $store.state.user }}でログイン中</p>
    <input v-model="inputTitle" />
    <input v-model="inputBody" />
    <button @click="onclickAddbutton">add</button>
    <button @click="logout">ログアウト</button>
    <ul>
      <li v-for="messageSorted in messagesSorted" :key="messageSorted.id">
        {{ messageSorted.title }} {{ messageSorted.body }}
        {{ messageSorted.user }} {{ messageSorted.time }}
      </li>
    </ul>
  </div>
</template>
<script>
import { db } from '~/plugins/firebase'
export default {
  data() {
    return {
      displayName: '',
      inputTitle: '',
      inputBody: '',
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
      if (!this.inputBody && !this.inputTitle) return
      this.submitFirestore()
      this.addinputText()
    },
    // messageをfirestoreに追加
    submitFirestore() {
      const user = this.$store.state.user
      db.collection('post').add({
        title: this.inputTitle,
        body: this.inputBody,
        id: this.getRandom(),
        time: new Date(),
        user
      })
    },
    // 自分の配列にmessageをPush
    addinputText() {
      const user = this.$store.state.user
      this.messages.push({
        title: this.inputTitle,
        body: this.inputBody,
        id: this.getRandom(),
        time: new Date(),
        user
      })
      this.inputTitle = ''
      this.inputBody = ''
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
      const querySnapshot = await db.collection('post').get()
      querySnapshot.docs.forEach((e) => {
        const data = e.data()
        setTimeout(() => console.log((data.time = data.time.toDate())))
        this.messages.push(data)
      })
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
