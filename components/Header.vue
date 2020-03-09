<template>
  <header
    class="site-header w-full px-4 mt-6 xl:px-8 xxl:mt-6 xxl:px-14 absolute top-0 z-10 flex items-center"
  >
    <router-link to="/" @click.prevent="homeScrollTop">
      <Logo class="w-16 xl:w-18 xxl:w-32" />
    </router-link>
    <Navigation />
  </header>
</template>
<script>
import Navigation from '../components/Navigation';
import Logo from '~/assets/svg/NBBLogoMark.svg?inline';

export default {
  name: "Header",

  components: {
    Navigation,
    Logo,
  },

  computed: {
    meta() {
      return this.$store.state.meta;
    }
  },

  mixins: {
    homeScrollTop: Function
  }
};
</script>
