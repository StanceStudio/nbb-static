import Vue from 'vue';

Vue.mixin({
  methods: {

    /**
     * Handles the click event of the header logo
     */
    homeScrollTop() {
      if (window.location.pathname === '/') {
        this.$scrollTo(document, 500);
      } else {
        this.$router.push('/');
      }
    },

    /**
     * Returns the featured media object of the given article and size
     * @param {Object} article
     * @param {String} size
     * @return {Object} featured media object
     */
    getFeaturedImage(article, size) {
      const featuredImage = article._embedded['wp:featuredmedia'];

      if (featuredImage) {
        return featuredImage[0].media_details.sizes[size];
      }
    },

    /**
     * 
     */
    filterPostContent(content) {
      return content.replace(process.env.wordpressUrl,'');
    }
  }
});
