<template>
  <header id="header">
    <div v-if="meta" class="header-container container">
      <div class="columns is-gapless">
        <div class="header-title column">
          <h1>
            <nuxt-link to="/" exact>{{meta.name}}</nuxt-link>
          </h1>
        </div>
        <div class="header-nav column">
          <nav>
            <ul class="columns is-gapless is-inline is-ended text-right">
              <li class="column"><nuxt-link to="/about" exact>about</nuxt-link></li>
              <li class="column"><nuxt-link to="/sample-page" exact>sample-page</nuxt-link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    meta () {
      return this.$store.state.meta
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/settings'

#header
  background: #fff
  border-bottom: 1px solid #ccc

.header-container
  padding: $section-gap $column-gap
  +media("small-only")
    padding ($section-gap/2)

.header-title
  width 20rem
  padding-right $column-gap

.header-nav
  overflow-x auto
  -webkit-overflow-scrolling touch
  flex-grow: 2
  nav
    display block
    ul
      margin-top 0
      min-width 100%
      line-height 2
      margin-top ($section-gap/4)
      padding ($section-gap/2) 0
      li + li
        a
          padding 0 .5rem

</style>
