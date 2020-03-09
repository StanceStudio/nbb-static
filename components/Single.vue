<template>
  <article
    class="single"> 
    <div class="container pt-20 xl:pt-26">
      <header class="mb-18 md:mb-20">
        <h3 v-if="type === 'project'" class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none inline-block overflow-hidden">
          <div class="title-item flex items-center">Spaces <Colon style="width: 0.085em;" class="ml-2"/></div>
        </h3>
        <h1
          class="title text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-tight"
          v-html="title"
        >
        </h1>
        <h2 class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none inline-block overflow-hidden text-pink">
          <div class="title-item" v-if="data.acf.heading" v-html="data.acf.heading"></div>
        </h2>
      </header>
      <div class="overflow-hidden mb-14">
        <div class="title-item text-lg font-light md:w-1/2" v-html="data.acf.introduction"></div>
      </div>
      <div class="overflow-hidden">
        <transition name="fade">
          <div class="content title-item pb-20">
            <section
              v-for="(section, i) in data.acf.content"
              :key="'section-' + i"
              :data-type="section.acf_fc_layout"
              class="py-14">

              <div v-if="'text' === section.acf_fc_layout" class="title-item text-lg font-light w-1/2">
                <div
                  v-if="section.heading"
                  class="flex items-baseline mb-2">
                  <PinkDiamond style="width: 0.5em;" class="mr-1" />
                  <h3 v-html="section.heading" class="uppercase"></h3>
                </div>
                <div v-html="filterPostContent(section.text)" class="wysiwyg"></div>
              </div>

              <div v-if="'image' === section.acf_fc_layout" class="lazy">
                <img v-lazy="section.image.url" :alt="section.image.alt" />
              </div>

              <div v-else-if="'image_quote' === section.acf_fc_layout" class="flex items-center">
                <div class="w-1/3 mr-auto" v-if="section.image.url">
                  <div class="lazy">
                    <img v-lazy="section.image.url" :alt="section.image.alt" />
                  </div>
                </div>
                <div class="w-2/4" v-if="section.quote">
                <blockquote class="font-serif uppercase leading-none text-4xl">
                  <p v-html="section.quote"></p>
                  <cite class="not-italic">{{ section.cite }}</cite>
                </blockquote>
                </div>
              </div>

              <div
                v-if="'image_set' === section.acf_fc_layout"
                class="flex"
                :class="section.image_layout">
                <div
                  v-for="(image, i) in section.images"
                  :key="'image-' + i">
                    <div class="lazy">
                      <img v-if="image.image.url" v-lazy="image.image.url" :alt="image.image.alt" />
                    </div>
                </div>
              </div>

            </section>
          </div>
        </transition>
      </div>
      
      <Underline class="w-full"/>
      <Projects v-if="data.type === 'project'" :projects="$store.state.projects" :exclude="data.id" class="pt-20"/>
      <FooterNavigation v-else class="pt-20" />
    </div>
    <Footer />
  </article>
</template>

<script>
import { TimelineMax } from "gsap";

import Colon from '~/assets/svg/BlackColon.svg?inline';
import PinkDiamond from '~/assets/svg/PinkDiamond.svg?inline';
import Underline from '~/assets/svg/Underline.svg?inline';

import Projects from '~/components/Projects.vue';
import Footer from '~/components/Footer.vue';
import FooterNavigation from '~/components/FooterNavigation.vue';

export default {
  props: {
    data: Object,
    type: String
  },

  components: {
    Colon,
    PinkDiamond,
    Underline,
    Projects,
    FooterNavigation,
    Footer,
  },

  mixins: {
    filterPostContent: Function
  },

  head() {
    return {
      title: `${this.data.title.rendered} - ${this.$store.state.meta.name}`,
      //meta: [{ description: this.$store.state.meta.description }]
    };
  },

  data() {
    return {
      expanded: false,
    };
  },

  computed: {
    title() {
      // if page is rendered put everything but first word on a new line.
      return this.type === 'page' ? this.data.title.rendered.replace(/^((\S+\s+){0}\S+)\s+/, '$1<br>') : this.data.title.rendered;
    },
  },

  mounted() {
    console.log('post data --', this.data);
    
    this.$nextTick(this.addListeners);

    this.fetchProjects();

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
      tl.staggerFrom('.title-item', .6 , { y: '110%', delay: .6, ease: "power3.out"}, .1 );
    }
  },

  beforeDestroy () {
    this.removeListeners()
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

    addListeners () {
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },
    
    removeListeners () {
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].removeEventListener('click', this.navigate, false)
      }
      this._links = []
    },
  
    navigate (event) {
      let target = event.target
      let i = 0
      // Go throught 5 parents max to find a tag
      while (i < 5 && !(target instanceof HTMLAnchorElement) && target.parentNode) {
        target = target.parentNode
        i++
      }
      // If target is still not a link, ignore
      if (!(target instanceof HTMLAnchorElement)) { return }
      const href = target.getAttribute('href')
      console.log(href);
      
      // Get link target, if local link, navigate with router link
      if (href && href[0] === '/') {
        event.preventDefault()
        this.$router.push(href)
      } else if (this.$ga) {
        // If Google Analytics is activated & is external link
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
        this.$ga('send', 'event', 'Outbound Link', 'click', target.href)
      }
    }
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