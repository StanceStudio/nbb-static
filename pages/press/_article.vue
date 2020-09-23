<template>
  <Press :data="press" type="press" />
</template>

<script>
import Press from '~/components/Single.vue';

export default {
  async asyncData({ app, store, params }) {    
    const { data } = await app.$axios.get(`${process.env.wpAPI}/wp/v2/press`, {
      params: {
        slug: params.press,
        _embed: true
      }
    });
    return { press: data[0] };
  },
  
  components: {
    Press
  }
};
</script>
