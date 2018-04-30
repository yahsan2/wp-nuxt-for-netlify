<template>
  <div class="article-list">
    <div class="articles columns is-multiline">
      <Article :article="article" v-for="article in articles" :key="article.id" />
    </div>
    <no-ssr>
      <InfiniteLoading
        ref="infiniteLoading"
        @infinite="moreArticles"
      >
        <span slot="spinner">
          <Loader/>
        </span>
        <span slot="no-results">
          <div>No Results Articles :)</div>
        </span>
        <span slot="no-more">
          <div>No More Articles :)</div>
        </span>
      </InfiniteLoading>
    </no-ssr>
  </div>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'
.spinner
  position: relative
  margin: auto

.article-list
  width: 100%
  margin-left: auto
  margin-right: auto
  article + article
    border-top: 1px dotted lighten($color-primary, 20%)
    margin-top: 32px
    padding-top: 32px
</style>

<script>
import { mapState } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import Article from '~/components/Article'
import Loader from '~/components/Loader.vue'

export default {
  components: {
    Article,
    InfiniteLoading,
    Loader
  },
  props: {
    articles: Array,
    query: Object
  },
  computed: {
    ...mapState([
      'currentPath',
      'cachePages'
    ])
  },
  methods: {
    moreArticles (loadingState) {
      if (!this.cachePages[this.currentPath]) return
      this.cachePages[this.currentPath].paged++
      this.query.page = this.cachePages[this.currentPath].paged
      this.$api.get('/posts', this.query)
        .then((response) => {
          this.$store.commit('setCachePages', {
            path: this.$route.path,
            posts: response.data
          })
          this.$store.commit('setCachePosts', response.data)
          this.$store.commit('setCurrentPosts')
          loadingState.loaded()
          this.$forceUpdate()
        })
        .catch(() => {
          loadingState.complete()
        })
    }
  }
}
</script>