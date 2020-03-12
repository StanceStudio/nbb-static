<template>
  <article
    class="single pt-20 xl:pt-26"
    :class="{ready : pageReady}"> 
    <div class="container">
      <header class="mb-18 md:mb-20">
        <h1
          class="title text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-tight"
          v-html="title">
        </h1>
      </header>

      <ul class="min-h-screen">
        <li
          v-for="(section, i) in data.acf.press_items"
          :key="'section-' + i"
          :data-type="section.acf_fc_layout"
          class="py-1 xl:py-4">
          <div
            class="inline-block"
            @mousemove="moveImages"
            @mouseleave="displayImages = false"
            @mouseenter="projectMouseOver(section)">
            <a v-if="section.link" :href="section.link" rel="nofollow" target="_blank">
              <div class="title text-xl sm:text-2xl lg:text-3xl xxl:text-4xl font-serif uppercase leading-none" v-html="section.title"></div>
            </a>
            <div v-else class="title inline-block text-xl sm:text-2xl lg:text-3xl xxl:text-4xl font-serif uppercase leading-none" v-html="section.title"></div>
          </div>
        </li>
      </ul>

      <transition name="fade">
          <div
            v-show="displayImages"
            ref="images"
            class="hidden xl:block hot-images fixed z-50 pointer-events-none">
            <div
              v-if="heading"
              class="uppercase mb-3 text-pink text-lg xxl:text-xl"
              v-html="heading"></div>
            <img :src="imageSrc"  alt="" />
          </div>
      </transition>
      <Underline class="w-full"/>
      <FooterNavigation class="pt-20" />
    </div>
    <Footer />
  </article>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";
import Underline from '~/assets/svg/Underline.svg?inline';
import Footer from '~/components/Footer.vue';
import FooterNavigation from '~/components/FooterNavigation.vue';

export default {
  props: {
    data: Object,
    type: String
  },

  components: {
    Underline,
    FooterNavigation,
    Footer,
  },

  head() {
    return {
      title: `${this.data.title.rendered} - ${this.$store.state.meta.name}`,
      //meta: [{ description: this.$store.state.meta.description }]
    };
  },

  data() {
    return {
      imageSrc: '',
      heading: '',
      pageReady: false,
      displayImages: false,
    };
  },

  computed: {
    title() {
      // if page is rendered put everything but first word on a new line.
      return this.type === 'page' ? this.data.title.rendered.replace(/^((\S+\s+){0}\S+)\s+/, '$1<br>') : this.data.title.rendered;
    },
  },

  mounted() {
    //console.log('post data --', this.data);
    
    // move this to a heading component
    if (process.browser) {
      require('~/assets/js/SplitTextPlugin.js');
  
      new SplitText(".title", {
        type: "lines",
        linesClass: "overflow-hidden title__container"
      });

      new SplitText(".title__container", {
        type: "lines",
        linesClass: "title-item flex"
      });

      let tl = new TimelineMax();
      tl.staggerTo('.title-item', .6 , { y: 0, delay: .6, ease: "power3.out"}, .1 );
    }
  },

  methods: {
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
      if (project.date) {
        this.heading = project.date;
      }
      this.showImage(project.image);
    },
  }
};
</script>