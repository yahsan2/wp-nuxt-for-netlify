<template>
  <div class="featured-image-container">
    <div
      class="featured-image lazy"
      :class="{ 'expanded': expanded }"
      :style="{ paddingTop: featuredImageAspectRatio}"
    >
      <img v-lazy="featuredImage.source_url">
      <Loader/>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },

  props: {
    expanded: Boolean,
    featuredImage: Object
  },

  computed: {
    featuredImageAspectRatio () {
      return this.featuredImage.height / this.featuredImage.width * 100 + '%'
    }
  }
}
</script>

<style lang="stylus" scoped>
.featured-image-container
  position relative

.featured-image
  width: 100%
  height 0
  position relative
  overflow hidden
  img
    backface-visibility: hidden
    display: block
    width: 100%
    max-width: 100%
    height: auto
    position: absolute
    top: 0
    transition: opacity 0.8s
    background #f9f9f9
    opacity: 0.6
    &:not([lazy="loaded"])
      max-height 100%
    &[lazy="loaded"]
      opacity: 1

  &.expanded
    img[lazy="loaded"]
      opacity: 1

  .featured-image-padding
    transition: padding-top 1s

  @media (min-width: 901px)
    &:not(.expanded)
      .featured-image-padding
        padding-top: 96px !important
</style>
