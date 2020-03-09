<template>
    <div>
        <h2 class="mb-18 sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none inline-block overflow-hidden">
            <div class="project-item flex items-center">Spaces <Colon style="width: 0.085em;" class="ml-2"/></div>
        </h2>
        <ul>
            <template 
            v-for="project in $store.state.projects"
            >
            <li
            :key="project.id"
            v-if="project.id !== exclude"
            class="overflow-hidden"
            >
            <div class="project-item">
                <nuxt-link
                :to="`/projects/${project.slug}`"
                class="inline-block relative">
                <div
                    @mousemove="moveImages"
                    @mouseleave="displayImages = false"
                    @mouseenter="projectMouseOver(project)">
                    <h2
                    v-html="project.title.rendered"
                    class="sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase inline-block leading-none">
                    </h2>
                    <!-- <Underline class="line" /> -->
                    <div
                    v-if="project.acf.featured_images"
                    class="flex w-full absolute inset-0">
                    <div
                        v-for="image in project.acf.featured_images"
                        :key="image.id"
                        @mouseenter="showImage(image)"
                        class="flex-grow">
                    </div>
                    </div>
                </div>
                </nuxt-link>
            </div>
            </li>
            </template>
        </ul>
        <transition name="fade">
            <div
                v-show="displayImages"
                ref="images"
                class="hot-images fixed z-50 pointer-events-none">
            <div
                v-if="heading"
                class="uppercase mb-3 font-light text-white text-lg"
                v-html="heading"></div>
                <img :src="imageSrc"  alt="" />
            </div>
        </transition>
    </div>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";
import anime from 'animejs/lib/anime.es.js';
import Colon from '~/assets/svg/BlackColon.svg?inline';
import Underline from '~/assets/svg/Underline.svg?inline';

export default {
  components: {
    Colon,
    Underline,
  },

  props: {
    exclude: Number
  },

  data() {
    return {
      imageSrc: '',
      displayImages: false,
      heading: '',
    }
  },

  created() {      
    this.fetchProjects();
  },

  methods: {
    async fetchProjects() {
        if (!this.$store.state.projects) {
            let projects = await this.$axios.get(
                `${process.env.WORDPRESS_API_URL}/wp/v2/projects?per_page=100`
            );

            this.$store.commit('setProjects', projects.data);
        }
    },

    showItems() {
      let tl = new TimelineMax();
      tl.staggerFrom('.project-item', .6 , { y: '110%', delay: .6, ease: "power3.out"}, .1 );
    },

    hideItems() {
      TweenMax.staggerTo('.project-item', .6, { y: '-110%', delay: 0, ease: "power3.out"}, .1 );
    },

    moveImages(e) {
      if (this.$refs.images) {
        TweenMax.to(this.$refs.images, 0.3, {
          css: {
            left: e.clientX,
            top: e.clientY
          }
        });
      }
    },

    showImage(image) {
      if (image) {
        this.imageSrc = image.url;
        setTimeout(() => {
          this.displayImages = true;
        }, 200);
      }
    },

    projectMouseOver(project) {
      this.heading = project.acf.heading;
      if (process.browser) {
        // anime({
        //   targets: '.line',
        //   fill: '#FFF',
        //   easing: 'linear'
        // });
      }
    },
  },
};
</script>

<style scoped>    
    .page-leave-active {
        .hot-images {
            display: none;
        }
    }
</style>
