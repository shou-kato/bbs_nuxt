<template lang="pug">
  .app
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
<style></style>
