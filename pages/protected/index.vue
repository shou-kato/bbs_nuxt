<template>
  <div>
    <p><span style="padding-right: 10px;">ユーザー名</span>{{ $store.state.user }}</p>
    <button @click="logout">
      ログアウト
    </button>
    <div v-if="show" style="margin-top: 40px;">
      <section
        style="  border-style: solid;border-width: 1px; border-color: black; margin-bottom: 30px; width: 50%;"
        v-for="messaged in messagesSorted"
        :key="messaged.id"
      >
        <p><span style="padding-right: 30px;">タイトル</span>{{ messaged.title }}</p>
        <p><span style="padding-right: 30px;">本文</span>{{ messaged.body }}</p>

        <p><span style="padding-right: 30px;">投稿ユーザー</span>{{ messaged.user }}</p>
        <p>
          <span style="padding-right: 30px;">投稿時間</span>
          {{ $dateFns.format(messaged.time, 'yyyy年 M月 d日') }}
        </p>
      </section>

      <label>
        <p>タイトル</p>
        <input v-model="inputTitle">
      </label>

      <label>
        <p>本文</p>
        <input
          v-model="inputBody"
          type="text"
        >
      </label>

      <button @click="onclickAddbutton">投稿する</button>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'default',
  middleware: 'authenticated',
  data() {
    return {
      displayName: '',
      inputTitle: '',
      inputBody: '',
      messages: [],
      show: false,
    }
  },
  computed: {
    // メッセージを日付順にソート
    messagesSorted() {
      const messages = this.messages
      messages.sort((a, b) => a.time < b.time ? 1 : -1)
      return messages
    },
  },
  created() {
    this.getMessages()
    this.show = true
  },
  mounted() {
    console.log(process.env.API_KEY)
  },
  methods: {
    checkHostUser() {
      const user = this.$auth.currentUser.uid
      return user
    },
    onclickAddbutton() {
      // 空の場合は除外
      if (!this.inputBody && !this.inputTitle) return
      this.submitFirestore()
    },
    // messageをfirestoreに追加
    submitFirestore() {
      const ref = (doc) => this.$firestore.collection('post').doc(doc)
      const now = new Date()
      this.$firestore
        .collection('post')
        .add({
          title: this.inputTitle,
          body: this.inputBody,
          id: '',
          time: now, // 別に切り分ける
          user: this.$store.state.user,
        })
        .then((docref) => {
          this.addinputText(docref.id, now)
          ref(docref.id).update({
            id: docref.id,
          })
        })
    },
    // 自分の配列にmessageをPush
    addinputText(docId, now) {
      this.messages.push({
        title: this.inputTitle,
        body: this.inputBody,
        id: docId,
        time: now, // 別に切り分ける
        user: this.$store.state.user,
      })
      this.inputTitle = ''
      this.inputBody = ''
    },
    // 乱数生成関数
    getRandom() {
      const len = 8
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
      querySnapshot.forEach((e) => {
        const data = e.data()
        data.time = data.time.toDate()
        this.messages.push(data)
      })
    },
    contentDelete(index) {
      // オブジェクトのインデックス番号を取得
      const messId = this.messages[index].id
      this.$firestore
        .collection('post')
        .doc(messId)
        .delete()
      this.messages.splice(index, 1)
    },
    logout() {
      this.$auth
        .signOut()
        .then(() => {
          this.$store.dispatch('logout')
          this.$router.push('/auth/login')
        })
        .catch(() => {
          console.log('ログアウトできませんでした')
        })
    },
  },
}
</script>
