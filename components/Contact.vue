<template>
  <article
    class="single pt-20 xl:pt-26"> 
    <div class="container">
      <header class="mb-10 xl:mb-20">
        <h1 class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-tight">
            <RevealText @reveal-text-complete="pageReady = true">{{ title }}</RevealText>
        </h1>
      </header>

      <transition name="fade">
        <div v-show="pageReady">
          <div class="xl:min-h-screen">
            <div class="content pb-12 md:flex sm:pb-18 xl:pb-20">
              <div class="lazy md:w-5/12 mb-10 md:mb-0">
                <img v-lazy="data.acf.image.url" alt="">
              </div>
              <div class="md:w-1/2 md:pl-8 lg:pl-14 xxl:pl-20 flex flex-col justify-between">
                <div class="mb-10">
                  <div class="font-serif text-xl xxl:text-2xl mb-4 lg:mb-8">
                    <PinkDiamond style="width: 0.5em;" class="mr-1 inline-block" /> ENQUIRIES
                  </div>
                  <div class="text-xl xxl:text-2xl font-light md:pl-10 xl:pl-20 leading-snug">
                    <a href="tel:+44 (0)20 7349 7099" class="hover:text-pink">+44 (0)20 7349 7099</a><br/>
                    <a href="mailto:CONTACT@NBBTRADING.COM" class="hover:text-pink">CONTACT@NBBTRADING.COM</a>
                  </div>
                </div>

                <div class="mb-10">
                  <div class="font-serif text-xl xxl:text-2xl mb-4 lg:mb-8">
                    <PinkDiamond style="width: 0.5em;" class="mr-1 inline-block" /> EMAIL
                  </div>
                  <div class="text-xl xxl:text-2xl font-light md:pl-10 xl:pl-20 leading-snug">
                    <a href="mailto:NILOUFAR@NBBTRADING.COM" class="hover:text-pink">NILOUFAR@NBBTRADING.COM</a><br/>
                    <a href="mailto:SARA@NBBTRADING.COM" class="hover:text-pink">SARA@NBBTRADING.COM</a><br/>
                    <a href="mailto:ELENA@NBBTRADING.COM" class="hover:text-pink">ELENA@NBBTRADING.COM</a><br/>
                    <a href="mailto:JULIE@NBBTRADING.COM" class="hover:text-pink">JULIE@NBBTRADING.COM</a>
                  </div>
                </div>

                <div class="mb-10">
                  <div class="font-serif text-xl xxl:text-2xl mb-4 lg:mb-8">
                    <PinkDiamond style="width: 0.5em;" class="mr-1 inline-block" /> ADDRESS
                  </div>
                  <div class="text-xl xxl:text-2xl font-light md:pl-10 xl:pl-20 leading-snug">
                    132-134 WORLD’S END STUDIOS <br/>
  LOTS RD, LONDON, SW10 0RJ
                  </div>
                </div>

                <div>
                  <div class="font-serif text-xl xxl:text-2xl mb-4 lg:mb-8">
                    <PinkDiamond style="width: 0.5em;" class="mr-1 inline-block" /> FOLLOW
                  </div>
                  <div class="text-xl xxl:text-2xl font-light md:pl-10 xl:pl-20 leading-snug">
                    <a href="https://www.instagram.com/niloufarbakhtiar/" class="hover:text-pink">INSTAGRAM</a>
                  </div>
                </div>
                </div>
              </div>
            </div>

            <Underline class="w-full"/>
            <FooterNavigation class="pt-12 sm:pt-18 xxl:pt-20" />
          </div>
          </transition>
        </div>
      <transition name="fade">
        <Footer v-show="pageReady" />
      </transition>
  </article>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";
import Underline from '~/assets/svg/Underline.svg?inline';
import PinkDiamond from '~/assets/svg/PinkDiamond.svg?inline';
import Footer from '~/components/Footer.vue';
import FooterNavigation from '~/components/FooterNavigation.vue';
import RevealText from '~/components/RevealText.vue'

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
    RevealText,
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
};
</script>