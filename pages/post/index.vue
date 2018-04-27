<template>
  <section class="home-container main-container container section">
    <ArticleList
      :articles="articles"
      :query="$store.state.currentQuery"
    />
  </section>
</template>

<style lang="stylus" scoped>

</style>


<script>
import { mapGetters, mapState } from 'vuex'
import ArticleList from '~/components/ArticleList'

export default {
  async asyncData ({ app, store, params, route }) {
    store.commit('setCurrentPath', route.path)

    const query = {
      orderby: 'date',
      per_page: 10,
      page: 1,
      _embed: 1
    }

    if (!store.state.cachePages[route.path]) {
      const posts = await app.$api.get('/posts', query)
      store.commit('setCachePages', {
        path: route.path,
        posts: posts.data
      })
      store.commit('setCachePosts', posts.data)
    }
    store.commit('setCurrentQuery', query)
  },

  computed: {
    articles () {
      return this.$store.state.currentPosts.map((postSlug) => {
        return this.$store.state.cachePosts[postSlug] || {}
      })
    },
    ...mapState([
    ]),
    ...mapGetters([
      'currentPage'
    ])
  },

  components: {
    ArticleList
  },

  head () {
    return {
      title: `Home | ${this.$store.state.meta.name}`,
      meta: [
        { description: this.$store.state.meta.description }
      ]
    }
  }
}
</script>
