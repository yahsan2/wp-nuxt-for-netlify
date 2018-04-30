<template>
  <article class="c-list-article column is-12">
    <div class="article-meta">
      <span class="date" v-html="shortTimestamp(article.date)"></span>
      <span class="categories">
        <nuxt-link class="term" v-for="term in article.terms[0]" :to="`/category/${term.slug}`" :key="term.id" v-html="term.name" v-if="article.terms[0]"></nuxt-link>
      </span>
    </div>
    <nuxt-link :to="`/${article.type}/${article.slug}`" class="article-body">
      <div class="columns">
        <div class="column article-thumbnail">
          <ArticleFeaturedImage
            v-if="featuredImage"
            :featured-image="featuredImage"
          />
        </div>
        <div class="column article-content">
          <h2 v-html="article.title"></h2>
          <div class="excerpt" v-html="article.excerpt"></div>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<style lang="stylus" scoped>
@import '~assets/style/settings'
.c-list-article
  margin-bottom -1 * $column-gap

.article-body
  display block

.article-meta
  margin-bottom: .75rem
  .date
    margin-right: .75rem
  .categories
    a + a
      margin-left 0.5rem

.article-thumbnail
  flex-grow: 1
  max-width 30rem
  +desktop
    max-width 12rem

.article-content
  flex-grow: 2
  +mobile()
    margin-top -1 * $column-gap


</style>

<script>
import ArticleFeaturedImage from '~/components/ArticleFeaturedImage'
import Loader from '~/components/Loader'

export default {
  components: {
    ArticleFeaturedImage,
    Loader
  },
  computed: {
    featuredImage () {
      if (this.article && this.article.images && this.article.images[0]) {
        const featuredImage = this.article.images[0]
        return featuredImage.sizes.large || featuredImage.sizes.full || false
      } else {
        return { height: 0, width: 0 }
      }
    }
  },
  props: {
    article: Object
  },
  mixins: {
    shortTimestamp: Function
  }
}
</script>