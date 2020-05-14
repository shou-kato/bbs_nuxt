<template lang="pug">
  .wrapper
    Appheader
    #content-wrapper
      nuxt    
    Appfooter
</template>
<script>
import Appheader from '@/components/header'
import Appfooter from '@/components/footer'
export default {
    components: { Appheader, Appfooter },
}
</script>
<style>
.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
