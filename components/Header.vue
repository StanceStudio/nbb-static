<template>
  <header
    class="site-header w-full px-4 pt-6 xl:px-8 xxl:pt-6 xxl:px-14 absolute top-0 z-10 flex items-center">
    <nuxt-link
      to="/"
      @click.native="$refs.nav.closeMenu"
      class="site-logo relative xl:fixed z-20">
        <!-- <Logo class="w-16 xl:w-18 xxl:w-32"/> -->
        <div class="w-16 xl:w-18 xxl:w-32" ref="logo"></div>
    </nuxt-link>
    <Navigation ref="nav" />
  </header>
</template>
<script>
import Navigation from '../components/Navigation';
import Logo from '~/assets/svg/NBBLogoMark.svg?inline';
import lottie from "lottie-web";
import animationData from "~/assets/json/LogoLoading.json";

export default {
  name: "Header",

  components: {
    Navigation,
    Logo,
  },

  mounted() {
    const _that = this;

    this.animation = lottie.loadAnimation({
      container: this.$refs.logo,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: animationData
    });

    this.animation.setSpeed(2.25);

    this.$router.beforeEach((to, from, next) => {
      if (from.path !== to.path) {
        _that.animation.removeEventListener( 'loopComplete', _that.loopCompleteHandler );

        if (_that.animation.isPaused) {
          _that.animation.goToAndStop(1);
            _that.animation.play();
        }
      }

      next()
    });

    // this.$bus.$on('page-enter', () => {
    //   //console.log('page-enter');
    //   _that.animation.addEventListener( 'loopComplete', _that.loopCompleteHandler );
    // })

    window.onNuxtReady((app) => {
      app.$nuxt.$on('routeChanged', (to, from) => {
        //console.log('routeChanged');
        _that.animation.addEventListener( 'loopComplete', _that.loopCompleteHandler );
      })
    })
  },

  methods: {
    loopCompleteHandler() {
      this.animation.removeEventListener( 'loopComplete', this.loopCompleteHandler );
      this.animation.stop();
    }
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