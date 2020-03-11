<template>
  <Article :data="article" type="article" />
</template>

<script>
import Article from '~/components/Single.vue';

export default {
  async asyncData({ app, store, params }) {    
    const { data } = await app.$axios.get(`${process.env.wpAPI}/wp/v2/posts`, {
      params: {
        slug: params.article,
        _embed: true
      }
    });
    return { article: data[0] };
  },
  
  components: {
    Article
  }
};
</script>
