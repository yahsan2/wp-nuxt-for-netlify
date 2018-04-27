<template>
  <section class="category-container main-container container section">
    <header>
      <h1>{{ category.name }}</h1>
      <p v-if="category.description">{{ category.description }}</p>
    </header>
    <main class="section">
      <ArticleList
        :articles="articles"
        :query="$store.state.currentQuery"
      />
    </main>
  </section>
</template>

<style lang="stylus" scoped>

</style>


<script>
import { mapGetters, mapState } from 'vuex'
import ArticleList from '~/components/ArticleList'

export default {
  async asyncData ({ app, store, params, route, error }) {
    store.commit('setCurrentPath', route.path)

    // Set default category cache
    if (!Object.keys(store.state.cacheCategories).length) {
      let categories = await app.$api.get('/categories', {
        per_page: 100
      })
      store.commit('setCacheCategories', categories.data)
    }

    const category = store.state.cacheCategories[params.category] || null

    if (!category) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
      return
    }

    const query = {
      orderby: 'date',
      per_page: 10,
      categories: category.id,
      page: 1,
      _embed: 1
    }
    store.commit('setCurrentQuery', query)

    if (!store.state.cachePages[route.path]) {
      const posts = await app.$api.get('/posts', query)
      store.commit('setCachePages', {
        path: route.path,
        posts: posts.data
      })
      store.commit('setCachePosts', posts.data)
    }
  },
  computed: {
    articles () {
      return this.$store.state.currentPosts.map((postSlug) => {
        return this.$store.state.cachePosts[postSlug] || {}
      })
    },
    category () {
      return this.$store.state.cacheCategories[this.$route.params.category] || {}
    },
    ...mapState([
      'currentPath',
      'cachePages'
    ]),
    ...mapGetters([
      'posts',
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
