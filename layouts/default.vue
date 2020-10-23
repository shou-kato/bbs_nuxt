<template>
    <v-app>
        <appheader />
        <v-main>
            <v-container fluid class="pa-0">
                <nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import appheader from '@/components/header'
export default {
    components: { appheader },
}
</script>
