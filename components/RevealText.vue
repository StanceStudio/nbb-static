<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";

export default {
  props: {
    data: Object,
    type: String
  },

  mounted() {
    const _that = this;    

    if (process.browser) {
      require('~/assets/js/SplitTextPlugin.js');

      const target = this.$el;
      
      new SplitText(target, {
       type: 'lines',
       linesClass: `overflow-hidden text-${this._uid}__container test`
      });

      new SplitText(`.text-${this._uid}__container `, {
        stype: 'lines',
        linesClass: `text-${this._uid}__item text__item`
      });

      let tl = new TimelineMax();
      //tl.set(`.text-${this._uid}__item`, {y:'110%'})
      tl.staggerTo(`.text-${this._uid}__item`, .6 , {y: 0, delay: .6, ease: "power3.out"}, .1, "+=0", () => _that.$emit('reveal-text-complete'));
    }
  },
};
</script>
<style>
  .text__item {
    transform: translateY(100%);
  }
</style>