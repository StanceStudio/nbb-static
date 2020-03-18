<template>
    <div class="bg-green min-h-screen pt-20 xl:pt-26">
      <Projects :projects="projects" class="container" />
      <Footer />
    </div>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";
import Projects from '~/components/Projects.vue';
import Footer from '~/components/Footer';

export default {
  async asyncData({ app, store, params }) {
    const { data } = await app.$axios.get(
      `${process.env.wpAPI}/wp/v2/projects?orderby=date&per_page=100&_embed`
    );
    return { projects: data };
  },

  components: {
    Projects,
    Footer
  },

  transition: {
    name: 'out-in',

    enter(el) {
      this.$bus.$emit('page-enter');
      
      let tl = new TimelineMax();
      tl.staggerFrom('.project-item', .6 , {y: '110%', delay: 1.5, ease: "power3.out"}, .1, "+=0", () => { document.getElementsByClassName('site-footer')[0].style.opacity = '1'; });
    },

    beforeLeave(el) {
      this.$bus.$emit('page-before-leave');

      document.getElementsByClassName('site-footer')[0].style.opacity = '0';
      TweenMax.staggerTo('.project-item', .6 ,{ y: '-110%', delay: 0, ease: "power3.out"}, .1 );
    }
  },

  head() {
    return {
      title: `Projects - ${this.$store.state.meta.name}`,
      meta: [{ description: this.$store.state.meta.description }],
      bodyAttrs: {
        class: 'projects'
      }
    };
  },
};
</script>

<style>
.projects .wrapper {
  @apply overflow-hidden;
}
</style>

<style scoped>
.out-in-enter-active,
.page-leave-active {
  .site-footer {
    @apply opacity-0;

    transition: opacity 0.4s cubic-bezier(.13,.74,.5,.97);
  }
}

.page-leave-active,
.out-in-enter-active {
  @apply opacity-100;
  transform: translateX(-100%);
}

.out-in-enter-to {
  transform: translateX(0);
}

.page-leave-active,
.out-in-enter-active {
  transition: transform 0.6s cubic-bezier(.13,.74,.5,.97), opacity 0.6s cubic-bezier(.13,.74,.5,.97);
  transition-delay: .6s;

}

.page-leave-active {
  transition-delay: .6s;
}

.out-in-leave-active {
  transition: opacity 0.4s cubic-bezier(.13,.74,.5,.97);
  transition-duration: 2s;
}
</style>
