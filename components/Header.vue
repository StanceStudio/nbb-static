<template>
  <header
    class="site-header w-full px-4 pt-6 xl:px-8 xxl:pt-6 xxl:px-14 absolute top-0 z-10 flex items-center">
    <nuxt-link
      to="/"
      @click.native="$refs.nav.closeMenu"
      class="site-logo relative xl:fixed z-20">
        <Logo class="w-16 xl:w-18 xxl:w-32" />
    </nuxt-link>
    <Navigation ref="nav" />
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
};
</script>

<style scoped>
header {
  @screen xl {
    top: 1.5rem;
  }
}
</style>