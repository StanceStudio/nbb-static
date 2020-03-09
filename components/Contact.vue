<template>
  <article
    class="single pt-26"
    :class="{ready : pageReady}"
> 
    <div class="container">
      <header class="mb-20">
        <h1
          class="title text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-tight"
          v-html="title"
        >
        </h1>
      </header>

      <div class="min-h-screen">
        <transition class="fade">
          <div v-show="pageReady" class="flex pb-20">
            <div class="md:w-5/12">
              <img :src="data.acf.image.url" alt="">
            </div>
            <div class="md:w-1/2 pl-14 xxl:pl-20 flex flex-col justify-between">
              <div class="mb-10">
                <div class="font-serif text-xl xxl:text-2xl mb-8">
                  <PinkDiamond style="width: 0.5em;" class="mr-1 inline-block" /> ENQUIRIES
                </div>
                <div class="text-xl xxl:text-2xl font-light pl-20 leading-snug">
                  <a href="tel:+44 (0)20 7349 7099" class="hover:text-pink">+44 (0)20 7349 7099</a><br/>
                  <a href="mailto:CONTACT@NBBTRADING.COM" class="hover:text-pink">CONTACT@NBBTRADING.COM</a>
                </div>
              </div>

              <div class="mb-10">
                <div class="font-serif text-xl xxl:text-2xl mb-8">
                  <PinkDiamond style="width: 0.5em;" class="mr-1 inline-block" /> EMAIL
                </div>
                <div class="text-xl xxl:text-2xl font-light pl-20 leading-snug">
                  <a href="mailto:NILOUFAR@NBBTRADING.COM" class="hover:text-pink">NILOUFAR@NBBTRADING.COM</a><br/>
                  <a href="mailto:SARA@NBBTRADING.COM" class="hover:text-pink">SARA@NBBTRADING.COM</a><br/>
                  <a href="mailto:ELENA@NBBTRADING.COM" class="hover:text-pink">ELENA@NBBTRADING.COM</a><br/>
                  <a href="mailto:JULIE@NBBTRADING.COM" class="hover:text-pink">JULIE@NBBTRADING.COM</a>
                </div>
              </div>

              <div class="mb-10">
                <div class="font-serif text-xl xxl:text-2xl mb-8">
                  <PinkDiamond style="width: 0.5em;" class="mr-1 inline-block" /> ADDRESS
                </div>
                <div class="text-xl xxl:text-2xl font-light pl-20 leading-snug">
                  132-134 WORLD’S END STUDIOS <br/>
LOTS RD, LONDON, SW10 0RJ
                </div>
              </div>

              <div>
                <div class="font-serif text-xl xxl:text-2xl mb-8">
                  <PinkDiamond style="width: 0.5em;" class="mr-1 inline-block" /> FOLLOW
                </div>
                <div class="text-xl xxl:text-2xl font-light pl-20 leading-snug">
                  <a href="https://instagram.com" class="hover:text-pink">INSTAGRAM</a>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <Underline class="w-full"/>
      <FooterNavigation class="pt-20" />
    </div>
    <Footer />
  </article>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";
import Underline from '~/assets/svg/Underline.svg?inline';
import PinkDiamond from '~/assets/svg/PinkDiamond.svg?inline';
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
    PinkDiamond,
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
    const _that = this;

    console.log('post data --', this.data);
    
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
      tl.staggerFrom('.title-item', .6 , { y: '110%', delay: .6, ease: "power3.out"}, .1, "+=0", () => _that.pageReady = true );
    }
  },

  methods: {
  }
};
</script>

<style scoped>
  .single {
    @apply flex flex-col relative min-h-screen;
  }

  .small_large {
    > div:first-child {
      @apply w-1/3 pr-10
    }

    > div:nth-child(2) {
      @apply w-2/3
    }
  }

  .large_small {
    > div:first-child {
      @apply w-2/3
    }

    > div:nth-child(2) {
      @apply w-1/3 pl-10
    }
  }
</style>