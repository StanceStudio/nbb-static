<template>
    <div class="bg-green min-h-screen pt-26">
      <Projects class="container" />
      <Footer />
    </div>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";
import Projects from '~/components/Projects.vue';
import Footer from '~/components/Footer';

export default {
  components: {
    Projects,
    Footer
  },

  transition: {
    name: 'out-in',

    enter(el, done) {       
      const _that = this; 
      let tl = new TimelineMax();
      tl.staggerFrom('.project-item', .6 , { y: '110%', delay: .6, ease: "power3.out"}, .1, "+=0", () => { document.getElementsByClassName('site-footer')[0].style.opacity = '1'; } );
    },

    beforeLeave(el) {
      document.getElementsByClassName('site-footer')[0].style.opacity = '0';
      TweenMax.staggerTo('.project-item', .6 ,{ y: '-110%', delay: 0, ease: "power3.out"}, .1 );
    }
  },

  head() {
    return {
      title: `Projects - ${this.$store.state.meta.name}`,
      meta: [{ description: this.$store.state.meta.description }]
    };
  },
};
</script>

<style scoped>
.out-in-enter-active,
.page-leave-active {
  .site-footer {
    @apply opacity-0;

    transition: opacity 0.2s;
  }
}

.page-leave-active,
.out-in-enter-active {
  @apply opacity-100;
  transform: translateX(-100%);
}

.out-in-enter-to {
  transform: translateX(0);

  /* .site-footer {
    @apply opacity-100;
    transition-delay: 1s;
  } */
}

.page-leave-active,
.out-in-enter-active {
  transition: transform 0.6s cubic-bezier(.13,.74,.5,.97), opacity 0.6s cubic-bezier(.13,.74,.5,.97);
}

.page-leave-active {
  transition-delay: .8s;
}
</style>
