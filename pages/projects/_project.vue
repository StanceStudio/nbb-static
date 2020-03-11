<template>
  <Project :data="project" type="project" />
</template>

<script>
import Project from '~/components/Single.vue';

export default {
  async asyncData({ app, store, params }) {    
    const { data } = await app.$axios.get(`${process.env.wpAPI}/wp/v2/projects`, {
      params: {
        slug: params.project,
        _embed: true
      }
    });
    return { project: data[0] };
  },
  
  components: {
    Project
  }
};
</script>
