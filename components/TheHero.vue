<template>
  <article class="hero">
    <nuxt-link :to="`/${this.heroArticle.slug}`">
      <div class="date">
        <span v-html="shortTimestamp(heroArticle.date)"></span>
        &nbsp–&nbsp
        <span
          v-for="topic in topics"
          class="topic fancy"
          :key="topic.id"
          v-html="topic.name"
        ></span>
      </div>
      <div class="meta">
        <h2 v-html="this.heroArticle.title"></h2>
        <div v-html="this.heroArticle.excerpt"></div>
      </div>
      <div class="featured-image lazy" v-if="featuredImage">
        <div class="image-height" :style="paddingTop"></div>
        <div class="image" v-lazy:backgroundImage="featuredImage.source_url"></div>
        <Loader/>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  props: {
    heroArticle: Object
  },
  mixins: {
    shortTimestamp: Function
  },
  computed: {
    paddingTop () {
      return {
        paddingTop: this.featuredImage.height / this.featuredImage.width * 100 + '%'
      }
    },
    topics () {
      return this.heroArticle.terms ? this.heroArticle.terms[0] : []
    },
    featuredImage () {
      let featuredImage = this.heroArticle.images

      if (featuredImage && featuredImage[0]) {
        return featuredImage[0].sizes.large || featuredImage[0].sizes.full || false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/settings'

.hero
  overflow: hidden
  position: relative

  &:hover
    &::before
      background-color: rgba(0, 0, 0, 0.25)

    .meta
      transform: translateX(4px)

  &:before
    content: ''
    display: block
    pointer-events: none
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-image: linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,0) 60%)
    transition: 0.4s
    z-index: 2

  a
    align-items: flex-end
    display: flex

    &:hover
      .image
        transform: scale(1.0125)

  .date
    color: #eee
    font-family: 'Roboto', sans-serif
    font-size: 0.75rem
    font-weight: 400
    left: 0
    margin-bottom: 12px
    padding: 32px
    position: absolute
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 1)
    text-transform: uppercase
    top: 0
    z-index: 2

    .topic
      & + .topic
        margin-left: 8px

        &::before
          content: ', '
          color: $color-primary
          left: -7px
          position: absolute

    a:hover
      color: $color-primary

  .featured-image
    min-height: 440px
    width: 100%

    .image
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      display: block
      height: 100%
      max-width: 100%
      position: absolute
      top: 0
      transition: transform 0.4s, opacity .5s
      width: 100%

  .meta
    bottom: 0
    color: #eee
    margin: 0 auto 0 0
    padding: 32px
    position: absolute
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 1)
    transition: 0.4s
    z-index: 2

    h2
      color: #eee
      font-size: 1.75rem
      line-height: 1.2
      margin: 0

    p
      margin: 0
</style>
