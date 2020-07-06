<template>
<div class="md:flex">
  <div
      v-if="section.il_image.url"
      class="lazy md:w-5/12 mb-10 md:mb-0 md:pr-8 lg:pr-14 xxl:pr-20">
      <div class="lazy">
        <img v-lazy="section.il_image.url" :alt="section.il_image.alt" />
      </div>
    </div>
    <div
      v-if="section.il_text_items"
      class="flex flex-col justify-between">
      <div
        v-for="(text, i) in section.il_text_items"
        :key="'section-' + i"
        class="uppercase font-serif text-md md:text-xl lg:text-2xl flex md:flex-no-wrap flex-wrap items-center">
          <div ref="text1" :style="{width: itemWidth}">{{ text.text_1 }}</div> <DashLine class="inline-block px-4" style="width:3em;height:1rem"/> <div>{{ text.text_2 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DashLine from '~/assets/svg/DashLine.svg?inline';

const debounce = function(fn, delay) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}

export default {
  name: "ImageList",

  props: {
    section: Object
  },

  components: {
    DashLine
  },

  data() {
    return {
      itemWidth: '',
    }
  },

  mounted() {
    const _that = this;

    _that.calculateItemWidths();

    if (process.browser) {
      window.addEventListener('resize', function() {
        debounce(_that.calculateItemWidths(), 500);
      });
    }

    this.$Lazyload.$on('loaded', function ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error }, formCache) {
      _that.calculateItemWidths();
    })
  },

  methods: {
    calculateItemWidths() {
      const widths = [];
      this.itemWidth = '';

      this.$nextTick(() => {
        this.$refs.text1.forEach((item, i) => {
            const w = item.getBoundingClientRect().width;
            //console.log('hw',w);
            widths.push(w);
        });

        this.itemWidth = Math.max(...widths) + 'px';
      });
    }
  }
}
</script>
