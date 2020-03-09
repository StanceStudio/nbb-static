export const strict = false;

export const state = () => ({
  article: null,
  articles: [],
  page: null,
  authorArticles: [],
  projects: null,
  enableComments: false,
  indexInfiniteLoading: {
    enabled: true,
    page: 1
  },
  featuredArticles: [],
  featuredColor: {},
  meta: {
    description: '',
    name: ''
  },
  topicArticles: [],
  topics: null
});

export const mutations = {
  setArticle(state, data) {
    state.article = data;
  },
  setPage(state, data) {
    state.page = data;
  },
  setAuthorArticles(state, data) {
    state.authorArticles.push(data);
  },
  setProjects(state, data) {
    state.projects = data;
  },
  setIndexInfiniteLoading(state, data) {
    state.indexInfiniteLoading = data;
  },
  setFeaturedColor(state, data) {
    state.featuredColor = data;
  },
  setFeaturedArticles(state, data) {
    state.featuredArticles = state.featuredArticles.concat(data);
  },
  setMeta(state, data) {
    state.meta = data;
  },
  setTopicArticles(state, data) {
    state.topicArticles.push(data);
  },
  setTopics(state, data) {
    state.topics = data;
  }
};

export const actions = {
  async nuxtServerInit({ commit }) {
    let meta = await this.$axios.get(process.env.wordpressAPIUrl);
    commit('setMeta', meta.data);
  }
};