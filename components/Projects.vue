<template>
    <div @mousemove="moveImages">
      <h2 class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none overflow-hidden">
            <div class="project-item flex items-center">Interiors <Colon style="width: 0.085em;" class="ml-2"/></div>
        </h2>
        <h3 class="mb-10 text-pink xl:mb-18 text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none overflow-hidden">
            <div class="project-item">Spaces</div>
        </h3>
        <ul>
          <template 
            v-for="project in projects">
            <li
            :key="project.id"
            v-if="project.id !== exclude"
            class="overflow-hidden"
            >
              <div class="project-item underline-reveal">
                  <nuxt-link
                  :to="`/projects/${project.slug}`"
                  class="inline-block relative hover:text-pink">
                  <div
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

        <!-- <transition name="move-up" duration="300"> -->
            <div
                ref="images"
                class="hot-images hidden xl:block absolute z-50 pointer-events-none"
                :class="[`hot-images--${imageOrientation}`, displayImages ? 'opacity-100' : 'opacity-0', {'hot-images--or': imagesOutRight, 'hot-images--ob': imagesOutBottom }]">
              <div
                v-if="heading"
                class="uppercase mb-3 font-light text-pink text-lg"
                v-html="heading">
              </div>
              <img :src="imageSrc"  alt="" ref="image"/>
            </div>
        <!-- </transition> -->
    </div>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";
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
      image: '',
      imageSrc: '',
      imageOrientation: '',
      displayImages: false,
      heading: '',
      imagesOutRight: false,
      imagesOutBottom: false,
    }
  },

  mounted() {
   window.addEventListener('scroll', () => {
     this.displayImages = false;
   });
  },

  methods: {
    showItems() {
      let tl = new TimelineMax();
      tl.staggerFrom('.project-item', .6 , { y: '110%', delay: .6, ease: "power3.out"}, .1 );
    },

    hideItems() {
      TweenMax.staggerTo('.project-item', .6, { y: '-110%', delay: 0, ease: "power3.out"}, .1 );
    },

    hideImages() {
      //setTimeout(() => {
        this.displayImages = false;
      //}, 200);
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
        this.image = image;
        this.imageSrc = image.url;
        //this.displayImages = true;
        //setTimeout(() => {
          this.displayImages = true;
       // }, 150);
      } else {
        this.image = '';
        this.imageSrc = '';
      }
    },

    projectMouseEnter(project, e) {
      this.heading = project.acf.heading ? project.acf.heading : '';
    },

    checkImageBounding() {
      if (this.$refs.images) {
        const rect = this.$refs.images.getBoundingClientRect();
        this.imagesOutRight = (rect.right > (window.innerWidth || document.documentElement.clientWidth));
        this.imagesOutBottom = (rect.bottom > (window.innerHeight || document.documentElement.clientHeight));
        //console.log('this.imagesOutRight',this.imagesOutRight);
        //console.log('this.imagesOutBottom', this.imagesOutBottom);
      }
    }
  },

  watch: {
    image(to, from) {
      this.checkImageBounding();
      this.imageOrientation = to.height > to.width ? 'portait' : 'landscape';
      this.$nextTick(() => {
        this.checkImageBounding();
      });
    }
  }
};
</script>
