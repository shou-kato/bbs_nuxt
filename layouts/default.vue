<template lang="pug">
  #app-wrapper
    Appheader
    #content-wrapper
      nuxt    
    Appfooter
</template>
<script>
import Appheader from '@/components/header'
import Appfooter from '@/components/footer'
export default {
  components: { Appheader, Appfooter }
}
</script>
<style>
body {
  font-size: 16px;
}
</style>
