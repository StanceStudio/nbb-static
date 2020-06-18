<template>
  <article
    class="single pt-20 xl:pt-26"
    @mousemove="moveImages">
    <div class="container">
      <header class="mb-10 xl:mb-20">
        <h1
          class="title text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-tight"
          v-html="title">
        </h1>
      </header>

      <!-- <transition name="fade"> -->
        <div class="xl:min-h-screen">
          <div class="content pb-12 sm:pb-18 xl:pb-20">

            <!-- <div
            class="pB-10 md:pb-16"
            v-if="data.acf.award_items">
              <section
              v-for="(award_item, i) in data.acf.award_items"
              :key="'section-' + i"
              :data-type="award_item.acf_fc_layout"
              class="md:flex py-6 md:py-10 items-center">
                <div class="w-8/12 md:w-1/3 mb-6 md:mb-0 pr-10 lg:pr-0" v-if="award_item.image">
                  <img v-lazy="award_item.image.url" :alt="award_item.image.alt" />
                </div>
                <div class="md:w-2/3">
                  <div class="text-xl md:text-2xl font-light text-pink leading-tight" v-if="award_item.title">{{ award_item.title }}</div>
                  <div class="md:text-xl font-light" v-if="award_item.location">{{ award_item.location }}</div>
                </div>
              </section>
            </div>

            <header class="mb-10 xl:mb-20">
            <h2
              class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-tight">
              Press
            </h2>
          </header> -->

            <ul>
              <li
                v-for="(section, i) in data.acf.press_items"
                :key="'section-' + i"
                :data-type="section.acf_fc_layout"
                class="press-item py-1 xl:py-4">
                <span
                  class="inline-block"
                  @mouseleave="displayImages = false"
                  @mouseenter="projectMouseOver(section)">
                  <a v-if="section.link" :href="section.link" rel="nofollow" target="_blank" class="flex">
                    <span class="title text-xl sm:text-2xl lg:text-3xl xxl:text-4xl font-serif uppercase leading-none">{{ section.title }}</span>
                    <ExternalLink
                      class="inline w-5 md:w-6 ml-2 lg:hidden" />
                  </a>
                  <span v-else class="title inline-block text-xl sm:text-2xl lg:text-3xl xxl:text-4xl font-serif uppercase leading-none" v-html="section.title"></span>
                  <span class="underline hidden xl:block w-full">
                    <Underline class="text-pink w-full"/>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      <!-- </transition> -->

      <transition name="move-up">
          <div
            v-show="displayImages"
            ref="images"
            class="hidden xl:block hot-images fixed z-50 pointer-events-none">
            <div
              class="uppercase mb-3 text-pink text-lg xxl:text-xl"
              :class="{'text-right': !heading}">
              <ExternalLink
                v-if="link"
                class="inline w-5 mr-2" />{{ heading }}
            </div>
            <img :src="imageSrc"  alt="" />
          </div>
      </transition>
      <transition name="fade">
        <Underline v-if="pageReady" class="w-full"/>
      </transition>
      <transition name="fade">
        <FooterNavigation v-if="pageReady" class="pt-12 sm:pt-18 xxl:pt-20" />
      </transition>
    </div>
    <Footer />
  </article>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";
import Underline from '~/assets/svg/Underline.svg?inline';
import ExternalLink from '~/assets/svg/ExternalLink.svg?inline';
import Footer from '~/components/Footer.vue';
import FooterNavigation from '~/components/FooterNavigation.vue';

export default {
  props: {
    data: Object,
    type: String
  },

  components: {
    Underline,
    ExternalLink,
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
      link: '',
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
    const _that = this;    
    // move this to a heading component?
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
      tl.staggerTo('.title-item', .6 , { y: 0, delay: .6, ease: "power3.out"}, .1, "+=0", () => _that.pageReady = true );
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
        this.displayImages = true;
      }
    },

    projectMouseOver(project) {
      this.heading = project.date ? project.date : '';
      this.link = project.link ? project.link : '';
      this.showImage(project.image);
    },
  }
};
</script>
<style scoped>
.underline {
    transition:all .6s cubic-bezier(.13,.74,.5,.97);
    -webkit-clip-path: inset(0 100% 0 0);
    clip-path: inset(0 100% 0 0);
  }

  .press-item:hover {
    .underline {
      clip-path: inset(0);
    }
  }
</style>