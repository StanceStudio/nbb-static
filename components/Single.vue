<template>
  <article
    class="single pt-20 xl:pt-26"> 
    <div class="container">
      <header class="mb-10 md:mb-20">
        <h3 v-if="type === 'project'" class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none inline-block overflow-hidden">
          <div class="title-item flex items-center">Spaces <Colon style="width: 0.085em;" class="ml-2"/></div>
        </h3>
        <h1
          class="title text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-tight"
          v-html="title"
        >
        </h1>
        <h2
          v-if="data.acf.heading"
          class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none inline-block overflow-hidden text-pink">
          <div class="title-item" v-html="data.acf.heading"></div>
        </h2>
      </header>
      <div
        v-if="data.acf.introduction"
        class="overflow-hidden mb-14">
        <div class="title-item text-lg font-light md:w-1/2" v-html="data.acf.introduction"></div>
      </div>

      <div class="content min-h-screen pb-20">
        <transition name="fade">
          <Sections v-if="pageReady" :sections="data.acf.content" />
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
import Underline from '~/assets/svg/Underline.svg?inline';

import Sections from '~/components/Sections.vue';
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
    Underline,
    Sections,
    Projects,
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
      pageReady: false,
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
      tl.staggerTo('.title-item', .6 , { y: 0, delay: .6, ease: "power3.out"}, .1, "+=0", () => _that.pageReady = true  );
    }
  },

  beforeDestroy () {
    this.removeListeners()
  },

  methods: {
    async fetchProjects() {
        if (!this.$store.state.projects) {
            let projects = await this.$axios.get(
                `${process.env.wordpressAPIUrl}/wp/v2/projects?per_page=100`
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

<style>
  .single {
    @apply flex flex-col relative min-h-screen;
  }

  .title-item {
    transform: translateY(110%);
  }
</style>