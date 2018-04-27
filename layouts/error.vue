<template>
  <section class="error-container main-container container section typeset">
    <h1 v-if="error.statusCode === 404">ページが見つかりません</h1>
    <h1 v-else>エラーが発生しました</h1>
    <nuxt-link to="/">ホーム</nuxt-link>
  </section>
</template>

<style lang="stylus">
@import '~assets/style/settings'

.error-container
  margin-top -1 * $section-gap
  padding 2*$section-gap 0

</style>

<script>
export default {
  props: ['error']
}
</script>