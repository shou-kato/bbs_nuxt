export default {
    // mode: 'universal',
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: '掲示板',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/persistedstate.js', ssr: false },
        { src: '~/plugins/firebase' },
    ],

    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/vuetify',
        '@nuxtjs/date-fns',

        // With options
        [
            '@nuxtjs/vuetify',
            {
                /* module options */
            },
        ],
    ],

    dateFns: {
        /* module options */
        locales: ['ja'],
        defaultLocale: 'ja',
        methods: ['format', 'parseISO'],
    },
    /*
     ** Nuxt.js modules
     */
    modules: ['@nuxtjs/pwa', '@nuxtjs/dotenv', 'bootstrap-vue/nuxt'],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        hardSource: true,

        extend(config, ctx) {},
    },
    router: {},
}
