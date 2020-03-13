<template>
    <div>
        <h2 class="mb-10 xl:mb-18 text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none inline-block overflow-hidden">
            <div class="project-item flex items-center">Spaces <Colon style="width: 0.085em;" class="ml-2"/></div>
        </h2>
        <ul>
          <template 
            v-for="project in projects">
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
                      @mouseleave="hideImages"
                      @mouseenter="projectMouseEnter(project, $event)">
                      <h2
                      v-html="project.title.rendered"
                      class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase inline-block leading-none">
                      </h2>
                      <div class="underline hidden xl:block">
                        <Underline class="text-pink w-full"/>
                      </div>
                      <div
                      v-if="project.acf.featured_images"
                      class="flex w-full absolute inset-0">
                      <div
                        v-for="image in project.acf.featured_images"
                        :key="image.id"
                        @mouseenter="showImage(image)"
                        @mousemove="showImage(image)"
                        class="flex-grow">
                      </div>
                    </div>
                  </div>
                  </nuxt-link>
              </div>
            </li>
            </template>
        </ul>

        <transition
          name="move-up"
          :duration="300">
            <div
                v-show="displayImages"
                ref="images"
                class="hot-images hidden xl:block absolute z-50 pointer-events-none">
              <div
                v-if="heading"
                class="uppercase mb-3 font-light text-white text-lg"
                v-html="heading">
              </div>
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
    exclude: Number,
    projects: Array
  },

  data() {
    return {
      imageSrc: '',
      displayImages: false,
      heading: '',
    }
  },

  mounted() {      
   window.addEventListener('scroll', () => {
     this.displayImages = false;
   });
  },

  methods: {
    async fetchProjects() {
        if (!this.$store.state.projects) {
            let projects = await this.$axios.get(
                `${process.env.wpAPI}/wp/v2/projects?per_page=100`
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

    hideImages() {
      setTimeout(() => {
        this.displayImages = false;
      }, 200);
    },

    moveImages(e) {
      if (this.$refs.images) {
        TweenMax.to(this.$refs.images, 0.3, {
          css: {
            left: e.pageX,
            top: e.pageY
          }
        });
      }
    },

    showImage(image) {
      if (image) {
        this.imageSrc = image.url;
        setTimeout(() => {
          this.displayImages = true;
        }, 150);
      }
    },

    projectMouseEnter(project, e) {
      this.heading = project.acf.heading;
      this.moveImages(e);
    },
  },
};
</script>

<style scoped>    
    .page-leave-active {
        .hot-images,
        .underline {
            opacity: 0;
        }
    }
        
  .underline {
    transition:all .6s cubic-bezier(.13,.74,.5,.97);
    -webkit-clip-path: inset(0 100% 0 0);
    clip-path: inset(0 100% 0 0);
  }

  .project-item:hover {
    .underline {
      clip-path: inset(0);
    }
  }
</style>
