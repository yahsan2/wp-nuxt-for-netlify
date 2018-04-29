<template>
  <div id="container">
    <TheHeader/>
    <main>
      <nuxt />
    </main>
    <TheFooter/>
  </div>
</template>

<style lang="stylus">
@import '~assets/style/settings'

.font-light
  font-weight: $font-weight-light

.font-regular
  font-weight: $font-weight-regular

.font-heavy
  font-weight: $font-weight-heavy


// utility
.text-left
  text-align: left

.text-right
  text-align: right

.text-center
  text-align: center

.text-justify
  text-align: justify


.center
  margin-left: auto
  margin-right: auto

.right
  float: right

.left
  float: left

.hide
  display: none

+media("small-only")
  .hide-small-only
    display: none

</style>

<script>
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
import Loader from '~/components/Loader'

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  components: {
    TheHeader,
    TheFooter,
    Loader
  },
  methods: {
    async defaultPostCache () {
      const query = {
        orderby: 'date',
        per_page: 10,
        page: 1,
        _embed: 1
      }
      if (!this.$store.state.cachePages['/']) {
        const posts = await this.$api.get('/posts', query)
        this.$store.commit('setCachePages', {
          path: '/',
          posts: posts.data
        })
        this.$store.commit('setCachePosts', posts.data)
      }
    }
  },
  mounted () {
    this.defaultPostCache()
  }
}
</script>
