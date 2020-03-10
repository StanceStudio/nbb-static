<template>
  <div
    class="intro bg-softlavender"
    :class="{ 'intro--loaded': introLoaded, 'intro--loading': !introLoaded }"
  >
    <section>
      <div class="w-full h-screen flex flex-col items-center justify-center">
        <div
          class="cover h-screen bg-cover bg-no-repeat bg-center absolute inset-0 z-0"
          :style="{ backgroundImage: `url('${backgroundImage}')` }"
          :class="{ ready: introLoaded }"
        ></div>
        <div id="logo-mark" ref="logoMark" class="w-11/12 md:w-10/12 xl:w-6/12 xxl:w-5/12"></div>
      </div>

      <div
        class="w-full min-h-screen text-center font-serif flex flex-col justify-center items-center"
      >
        <div
          class="relative w-full py-8 md:py-10 lg:py-14 xl:w-10/12 xxl:w-1/2"
          :class="{ ready: elementsInView }"
          ref="text"
        >
          <div
            class="reveal relative z-10 leading-none text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl"
          >
            COMBINING <br />
            COLOUR AND <br />
            CONTEMPORARY<br />
            ART WITH FLAIR <br />
            AND EXPRESSION.
          </div>

          <div
            v-for="(image, i) in images"
            :key="image.src"
            :class="'mid-img mid-img--' + i"
          >
            <img :src="image.src" alt="" />
          </div>
        </div>
        <div v-if="page.acf.statement_link" class="text-pink font-sans font-light mt-16 text-2xl text-center">
          <nuxt-link :to="filterPostContent(page.acf.statement_link)">
            READ MORE
          </nuxt-link>
        </div>
      </div>
    </section>
    <div class="container">
      <Underline class="w-full"/>
      <FooterNavigation class="pt-20" />
    </div>
    <Footer />
  </div>
</template>

<script>
import lottie from "lottie-web";
import animationData from "~/assets/json/HomePage.json";
import Underline from '~/assets/svg/Underline.svg?inline'
import Footer from '~/components/Footer.vue';
import FooterNavigation from '~/components/FooterNavigation.vue';

export default {
  name: "Home",

  async asyncData({ app, store, params }) {    
    const { data } = await app.$axios.get(`${process.env.wordpressAPIUrl}/stance/v1/front-page`, {
      params: {
        _embed: true
      }
    });

    console.log(data);

    return { page: data };
  },

  components: {
    Underline,
    Footer,
    FooterNavigation,
  },

  mixins: {
    filterPostContent: Function
  },
  
  head() {
    return {
      bodyAttrs: {
          class: 'home'
      },
    }
  },

  data: function() {
    return {
      elementsReady: false,
      intersected: false,
      elementsInView: false,
      introLoaded: false,
      backgroundImage: require("~/assets/img/HomeTop.jpg"),
      images: [
        {
          src: require("~/assets/img/MidSectionImage1.jpg")
        },
        {
          src: require("~/assets/img/MidSectionImage2.jpg")
        },
        {
          src: require("~/assets/img/MidSectionImage3.jpg")
        }
      ],
    };
  },

  mounted: function() {
    const _that = this;
    
    if (process.browser) {
      require('~/assets/js/SplitTextPlugin.js');

  
      new SplitText(".reveal", {
        type: "lines",
        linesClass: "overflow-hidden reveal__container reveal__container--++"
      });

      new SplitText(".reveal__container", {
        type: "lines",
        linesClass: "reveal__text"
      });
    }

    this.observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            _that.intersected = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(this.$refs.text);

    let anim = lottie.loadAnimation({
      container: this.$refs.logoMark,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animationData
    });

    anim.onComplete = function() {
      _that.introLoaded = true;
    };
  },

  watch: {
    intersected() {
      this.elementsInView = true;
    }
  }
};
</script>

<style>
.cover {
  @apply opacity-0;
  transition: opacity 1.4s cubic-bezier(0.13, 0.74, 0.5, 0.97);
}

.home .site-header {  
  @apply absolute;
}

.cover {
  transition-delay: 0.6s;
}

.intro--loading {
  @apply h-screen;
}

.intro--loading * {
  cursor: wait;
}

.intro--loaded .site-header,
.intro--loaded .cover {
  @apply opacity-100;
}

/** mid image **/
.mid-img {
  @apply z-0 absolute opacity-0;

  width: 20vw;

  transition: opacity 0.8s cubic-bezier(0.13, 0.74, 0.5, 0.97);
  transition-delay: 1.4s;

  @screen xl {
    width: 15vw;
  }

  @screen xxl {
    width: 10vw;
  }
}

.ready .mid-img {
  opacity: 1;
}

.mid-img--0 {
  top: 10%;
  left: 10vw;

  @screen xl {
    top: 12%;
    left: 16vw;
  }

  @screen xxl {
    top: 12%;
    left: 8vw;
  }
}

.mid-img--1 {
  top: 52%;
  right: 10vw;
  transform: translateY(-50%);
  /* transition-delay: 1.6s; */

  @screen xxl {
    top: 53%;
    right: 0;
  }
}

.mid-img--2 {
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  /* transition-delay: 1.8s; */

  @screen xl {
    bottom: 6%;
  }

  @screen xxl {
    bottom: 0;
    left: 50%;
  }
}
</style>
