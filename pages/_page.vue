<template>
  <Press v-if="page.template === 'templates/template-press.php'" :data="page" type="page" />
  <Contact v-else-if="page.template === 'templates/template-contact.php'" :data="page" type="page" />
  <Page v-else :data="page" />
</template>

<script>
import Page from '~/components/Single.vue';
import Press from '~/components/Press.vue';
import Contact from '~/components/Contact.vue';

export default {
  async asyncData({ app, store, params }) {    
    const { data } = await app.$axios.get(`${process.env.wordpressAPIUrl}/wp/v2/pages`, {
      params: {
        slug: params.page,
        _embed: true
      }
    });
    return { page: data[0] };
  },

  components: {
    Page,
    Press,
    Contact,
  }
};
</script>
