<template>
  <div>
    <h1>けいじば〜ん</h1>
    <v-card width="150" class="mx-auto">
      <v-card-text>
        <p>{{ $store.state.user }}でログイン中</p>
      </v-card-text>
    </v-card>
    <v-text-field
      v-model="inputTitle"
      type="text"
      label="タイトル"
      required
    ></v-text-field>
    <v-text-field
      v-model="inputBody"
      type="text"
      label="ほんぶん"
      required
    ></v-text-field>
    <v-btn width="100" @click="onclickAddbutton">add</v-btn>
    <v-btn width="100" @click="logout">logout</v-btn>
    <ul>
      <li v-for="messageSorted in messagesSorted" :key="messageSorted.id">
        <p>タイトル{{ messageSorted.title }}</p>
        <p>メッセージ本文{{ messageSorted.body }}</p>
        <p>ユーザー名{{ messageSorted.user }}</p>
        <p>投稿日時{{ messageSorted.time }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
// import firebase, { $firestore } from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
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
      this.$firestore.collection('post').add({
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
      const querySnapshot = await this.$firestore.collection('post').get()
      querySnapshot.docs.forEach((e) => {
        const data = e.data()
        data.time = data.time.toDate()
        this.messages.push(data)
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        this.$auth()
          .signOut()
          .then(
            () => this.$store.dispatch('logout'),
            this.$router.push('/auth/login')
          )
      })
    }
  }
}
</script>
