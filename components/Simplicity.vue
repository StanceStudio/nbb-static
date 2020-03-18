<template>
<div
    class="relative"
    :style="{height: (scrollHeight * 100) + 'vh'}">
    <div class="top-0 w-full sticky xl:pl-20">
        <div class="h-screen w-full bg-contain bg-center bg-no-repeat relative flex flex-col justify-center" :style="{'background-image': `url(${section.s_image.url})`}">
            <div class="xl:-ml-20">
            <div
                class="heading-1 overflow-hidden relative text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none"
                ref="heading3">
                <div
                v-for="(text, i) in splitText(section.s_text_1)"
                :key="'text-' + i"
                class="heading-item heading-item-1"
                :class="'heading-item--' + i">
                {{ text }}
                <!-- <div>{{ text }}</div>
                <Underline /> -->
                </div>
            </div>
            <div
                class="heading-2 overflow-hidden relative text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none"
                ref="heading2">
                <div
                v-for="(text, i) in splitText(section.s_text_2)"
                :key="'text-' + i"
                class="heading-item heading-item-2"
                :class="'heading-item--' + i">
                {{ text }}
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import { TimelineMax } from "gsap";
import Underline from '~/assets/svg/Underline.svg?inline';

export default {
  name: "Simplicity",

    props: {
        section: Object
    },

    components: {
        Underline
    },

    data() {
        return {
            scrollHeight: 3.5,
        }
    },

    mounted() {
    if (process.browser) {

      if (document.querySelectorAll('.heading-1').length) {

      this.scroll = new TimelineMax({paused:true});
      this.scroll.staggerTo('.heading-item-1', 1 , { y: 0, delay: 0}, 1.8)
        .staggerTo('.heading-item-1:not(:last-child)', .8, { y: '-110%'}, 1.5, 1.5);


      this.scroll2 = new TimelineMax({paused:true});
      this.scroll2.staggerTo('.heading-item-2', 1, { y: 0, delay: 0}, 1.8)
        .staggerTo('.heading-item-2:not(:last-child)', .8, { y: '-110%'}, 1.5, 1.5);
      }

      window.addEventListener("scroll", this.handleScroll);
    }

    //this.calcHeadingWidths();
  },

  methods: {
    calcHeadingWidths() {
        console.log(document.querySelectorAll('.heading-item-1'));    
        document.querySelectorAll('.heading-item-1').forEach((item, i) => {
        // if (document.querySelectorAll('heading-item-2')) {
           //document.querySelectorAll('.heading-item-1')
          const hw = item.getBoundingClientRect().width
          const h2w = document.querySelectorAll('.heading-item-2')[i].getBoundingClientRect().width
          if (hw && h2w) {
            console.log('hw',hw);
            console.log('h2w',h2w);
            const w = Math.max(hw, h2w);
            document.querySelectorAll('.heading-item')[i].style.width = w + 'px';
          }
        //}
      });
    },

    splitText(text) {
      return text.split('<br />');
    },

    handleScroll(e) {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      //const docHeight = document.body.clientHeight;

      // dont animate if loading is up
      // if (document.body.classList.contains('is-loading')) {
      //   return;
      // }

      // if (scrollTop < this.scrollPos) {
      //   this.isScrolling = false;
      // } else {
      //   this.isScrolling = true;
      // }

      if (scrollTop >= 0) {
        // console.log('scrollTop',scrollTop);
        // console.log('winHeight',winHeight);
        // console.log('docHeight',docHeight);

        this.scroll.progress(scrollTop / ( winHeight * this.scrollHeight ));
        this.scroll2.progress(scrollTop / ( winHeight * this.scrollHeight ));
        //this.proxyTween.progress(scrollTop / ( winHeight * 2 ));
      }
    }
  }
}
</script>
<style>
  .heading-1,
  .heading-2 {
    height: 41px!important;

    @screen md {
      height: 74px!important;
    }

    @screen lg {
      height: 100px!important;
    }
  }

  .heading-item {
    /* width: 100%; */
    position: absolute!important;
    top: 0!important;
    transform: translateY(110%);
  }
</style>