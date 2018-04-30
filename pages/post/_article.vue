<template>
  <article class="single article-container container section">
    <ArticleFeaturedImage
      v-if="featuredImage"
      :featured-image="featuredImage"
    />
    <transition name="slide-fade">
      <div class="article-body section typeset" :class="{ 'no-featured-image': !featuredImage }">
        <header class="article-header">
          <p class="article-meta">
            <span>{{ longTimestamp(article.date) }}</span>
            <span class="separator">|</span>
            <nuxt-link class="author fancy" :to="`/authors/${author.slug}`">{{ author.name }}</nuxt-link>
            <span class="separator">|</span>
            <span class="categories">
              <nuxt-link class="term" v-for="term in article.terms[0]" :to="`/category/${term.slug}`" :key="term.id" v-html="term.name" v-if="article.terms[0]"></nuxt-link>
            </span>
          </p>
          <h1 class="article-title" v-html="article.title"></h1>
        </header>
        <section v-html="article.content"></section>
        <!-- <ArticleComments :article="article"/> -->
      </div>
    </transition>
  </article>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'
.article-body
  max-width 40rem
  margin 0 auto

.article-meta
  .separator
    margin 0 1rem

</style>

<script>
import { mapState } from 'vuex'
import ArticleFeaturedImage from '~/components/ArticleFeaturedImage'
// import ArticleComments from '~/components/ArticleComments'

export default {
  async asyncData ({ app, store, params, route, payload }) {
    store.commit('setCurrentPath', route.path)

    const query = {
      slug: params.article,
      _embed: 1
    }

    if (!store.state.cachePosts[params.article]) {
      const posts = payload ? {data: [app.$api.mapProparty(payload, 'post')]} : await app.$api.get(`/posts`, query)
      store.commit('setCachePages', {
        path: route.path,
        posts: posts.data
      })
      store.commit('setCachePosts', posts.data)
    }

    if (!store.state.cachePages[store.state.currentPath]) {
      store.commit('setCachePages', {
        path: route.path,
        posts: [store.state.cachePosts[params.article]]
      })
    }

    store.commit('setCurrentQuery', query)
  },

  mixins: {
    longTimestamp: Function
  },

  components: {
    // ArticleComments,
    ArticleFeaturedImage
  },

  computed: {
    article () {
      const page = this.$store.state.cachePages[this.$store.state.currentPath] || {}
      const slug = page.slugs ? page.slugs[0] : null
      return this.$store.state.cachePosts[slug] || {}
      // return this.$store.getters.post || {}
    },
    author () {
      return this.article.author || {}
    },
    featuredImage () {
      if (this.article && this.article.images && this.article.images[0]) {
        const featuredImage = this.article.images[0]
        return featuredImage.sizes.large || featuredImage.sizes.full || false
      } else {
        return { height: 0, width: 0 }
      }
    },
    ...mapState([
      'currentPath',
      'cachePages'
    ])
  },

  head () {
    return {
      title: `${this.article.title} | ${this.$store.state.meta.name}`,
      meta: [
        { description: this.article.excerpt }
      ]
    }
  },

  methods: {
  },

  created () {

  },

  watch: {
  }
}
</script>