module.exports = {
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome',
    '@nuxtjs/webpackmonitor'
  ],
  axios: {
    // proxyHeaders: false
  },
  mode: 'spa',
  head: {
    title: 'criptomoedas',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'criptomoedas' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#1E645F' },

  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['buefy', 'vue2-filters', 'vue-chart']
  },
  plugins: [
    '~/plugins/buefy',
    { src: '~/plugins/vue2-filters', ssr: false },
    { src: '~/plugins/vue-charts', ssr: false }],
  router: {
    mode: 'hash',
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active'
  }
}
