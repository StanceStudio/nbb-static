<template>
    <div class="min-h-screen pt-20 xl:pt-26">
      <Press :pressItems="press" class="container" />
      <Footer />
    </div>
</template>

<script>
//import { TweenMax, TimelineMax } from "gsap";
import Press from '~/components/PressArchive.vue';
import Footer from '~/components/Footer';

export default {
  async asyncData({ app, store, params }) {
    const { data } = await app.$axios.get(
      `${process.env.wpAPI}/wp/v2/press?orderby=date&per_page=100&_embed`
    );
    return { press: data };
  },

  components: {
    Press,
    Footer
  },

  // transition: {
  //   name: 'out-in',

  //   enter(el) {
  //     this.$bus.$emit('page-enter');
      
  //     let tl = new TimelineMax();
  //     tl.staggerFrom('.project-item', .6 , {y: '110%', delay: 1.5, ease: "power3.out"}, .1, "+=0", () => { TweenMax.to('.site-footer', .6 ,{ autoAlpha: 1, ease: "power3.out"} ); });
  //   },

  //   beforeLeave(el) {
  //     this.$bus.$emit('page-before-leave');

  //     TweenMax.to('.site-footer', .6 ,{ autoAlpha: 0, ease: "power3.out"} );
  //     TweenMax.staggerTo('.project-item', .6 ,{ y: '-110%', delay: 0, ease: "power3.out"}, .1 );
  //   }
  // },

  head() {
    return {
      title: `Press - ${this.$store.state.meta.name}`,
      meta: [{ description: this.$store.state.meta.description }],
      bodyAttrs: {
        class: 'press'
      }
    };
  },
};
</script>

<style>
.press .wrapper {
  @apply overflow-hidden;
}
</style>

