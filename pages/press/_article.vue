<template>
  <Press :data="article" type="press" />
</template>

<script>
import Press from '~/components/Single.vue';

export default {
  async asyncData({ app, store, params }) {    
    const { data } = await app.$axios.get(`${process.env.wpAPI}/wp/v2/press`, {
      params: {
        slug: params.article,
        _embed: true
      }
    });
    return { article: data[0] };
  },
  
  components: {
    Press
  }
};
</script>
