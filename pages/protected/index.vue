<template lang="pug">
  div
    .card.text-right
      .card-body
        p {{$store.state.user }} でログイン中
        button(@click="logout").btn.btn-primary.btn-l logout
    ul.card
      li(v-for="messageSorted in messagesSorted" :key="messageSorted.id")
        p.card-header たいとる{{ messageSorted.title }}
        .card-body
          p {{ messageSorted.body }}
          p {{ messageSorted.user }}
          p {{ messageSorted.time }}
    .form-group
      label(for="exampleInputEmail1") タイトル
      input(type="text" v-model="inputTitle" aria-describedby="inputTitleHelp" placeholder="Enter Title").form-control
      label(for="exampleInputEmail1") タイトル
      input(type="text" v-model="inputBody" aria-describedby="inputBodyHelp" placeholder="Enter Body").form-control
      button(@click="onclickAddbutton").btn.btn-primary.btn-lg.m-4 add
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
      this.$auth
        .signOut()
        .then(() => {
          this.$store.dispatch('logout')
          this.$router.push('/auth/login')
        })
        .catch(() => {
          console.log('ログアウトできませんでした')
        })
    }
  }
}
</script>
