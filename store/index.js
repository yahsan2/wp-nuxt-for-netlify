import Vuex from 'vuex'

const store = () => new Vuex.Store({
  actions: {
    async nuxtServerInit ({ commit, state }, { app }) {
      const description = app.head.meta && app.head.meta.find((meta) => meta.name === 'description')
      commit('setMeta', {
        'name': app.head.title,
        'description': description ? description.content : ''
      })
    }
  },

  getters: {
    currentPage: (state) => {
      return state.cachePages[state.currentPath] || {}
    },
    posts: (state, getters) => {
      return getters.currentPage.slugs ? getters.currentPage.slugs.map((postSlug) => {
        return state.cachePosts[postSlug] || {}
      }) : []
    },
    post: (state, getters) => {
      return getters.posts[0] || {}
    }
  },

  state: {
    currentQuery: {},
    currentPath: null,
    currentPosts: [],
    cachePosts: {},
    cachePages: {},
    cacheCategories: {},
    cacheAuthors: {},
    meta: {
      name: '',
      description: ''
    }
  },

  mutations: {
    setPost (state, data) {
      state.post = data
    },
    setCachePosts (state, data) {
      const postSlugs = Object.keys(state.cachePosts)
      data.forEach((post) => {
        if (postSlugs.indexOf(post.slug) === -1) {
          state.cachePosts[post.slug] = post
        }
      })
    },
    setCachePages (state, data) {
      if (state.cachePages[data.path]) {
        const pageSlugs = state.cachePages[data.path].slugs
        data.posts.forEach((post) => {
          if (pageSlugs.indexOf(post.slug) === -1) {
            state.cachePages[data.path].slugs.push(post.slug)
          }
        })
        state.cachePages[data.path].slugs = pageSlugs
      } else {
        state.cachePages[data.path] = {
          slugs: data.posts.map((post) => post.slug),
          paged: 1
        }
      }
    },
    setCurrentPosts (state, data) {
      state.currentPosts = state.cachePages[state.currentPath] ? state.cachePages[state.currentPath].slugs : []
    },
    setArticle (state, data) {
      state.article = data
    },
    setArticles (state, data) {
      state.articles = state.articles.concat(data)
    },
    setPage (state, data) {
      state.page = data
    },
    setAuthorArticles (state, data) {
      state.authorArticles.push(data)
    },
    setAuthors (state, data) {
      state.authors = data
    },
    setFeaturedColor (state, data) {
      state.featuredColor = data
    },
    setFeaturedArticles (state, data) {
      state.featuredArticles = state.featuredArticles.concat(data)
    },
    setMeta (state, data) {
      state.meta = data
    },
    setTopicArticles (state, data) {
      state.topicArticles.push(data)
    },
    setTopics (state, data) {
      state.topics = data
    },
    setCacheCategories (state, data) {
      const categorySlugs = Object.keys(state.cacheCategories)
      data.forEach((category) => {
        if (categorySlugs.indexOf(category.slug) === -1) {
          state.cacheCategories[category.slug] = category
        }
      })
    },
    setCurrentQuery (state, data) {
      state.currentQuery = data
    },
    setCurrentPath (state, data) {
      state.currentPath = data
    }
  }
})

export default store
