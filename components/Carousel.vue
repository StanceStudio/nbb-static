
<template>
  <div>
    <client-only>
      <div class="carousel">
        <vue-tiny-slider
          ref="tinySlider"
          :mouse-drag="true"
          :loop="false"
          items="1"
          :controls="false"
          :nav="false"
          :preventScrollOnTouch="'auto'"
          
          >
            <div
              v-for="image in section.images"
              :key="image.id"
              class="carousel__slide">
              <img :src="image.url" alt="">
            </div>
        </vue-tiny-slider>
        <!-- <div class="carousel__nav" v-if="section.images.length > 1">
          <div class="carousel__nav-prev" :class="{'full' : currentSlide === section.images.length}" data-tooltip="Prev" @click="prevPane" @mouseover="direction = 'prev'" @mouseout="direction = ''" v-if="currentSlide > 1" ref="prev"></div>
          <div class="carousel__nav-next" :class="{'full' : currentSlide === 1}" data-tooltip="Next" @click="nextPane" @mouseover="direction = 'next'" @mouseout="direction = ''" v-if="section.images.length > currentSlide" ref="next"></div>
        </div> -->
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    defaultIndex: {
      default: 0,
      type: Number
    },
    // slides: {
    //   default: [],
    //   type: Array
    // }
    section: Object
  },

  data() {
    return {
      //      : [],
      direction   : '',
      carousel    : '',
      currentSlide: 0,
    };
  },

  // created() {
  //   this.$slots.default.forEach((tab, idx) => {
  //     this.slides.push({
  //       id: idx,
  //       title: tab.data.attrs.title,
  //       elem: tab.data.domProps.innerHTML
  //     });
  //   });
  // },

  mounted() {
    const _that = this;

    console.log(this.section);
    
    //this.currentSlide = this.$refs.tinySlider.slider.getInfo().displayIndex;

    // console.log('slides.length', this.slides.length)
    // console.log(this.$refs.tinySlider.slider.getInfo().displayIndex);

    // $(this.$refs.carousel).on('afterChange', function(event, slick, currentSlide, nextSlide){
    //   _that.currentSlide = currentSlide;
    //   _that.$emit("event-slide-change", _that.currentSlide > 0 ? "Prev" : "Next" );
    // });

    //this.$refs.tinySlider.slider.events.on('indexChanged', function (info, eventName) {
      //console.log(info);
       //_that.currentSlide = info.displayIndex;
      //_that.$emit("event-slide-change", _that.currentSlide > 0 ? "Prev" : "Next" );
    //});
  },

  methods: {
    prevPane() {
      //console.log('prevPane');
      
      //this.$refs.tinySlider.slider.goTo('prev');
    },

    nextPane() {
      //this.$refs.tinySlider.slider.goTo('next');
    },
  }
};
</script>

<style lang="scss">
@import '~tiny-slider/src/tiny-slider';

.carousel {
  img {
    @apply w-full h-auto;
  }

  .tns-outer {
    @apply overflow-hidden;
  }
}

// .carousel {
//     &__slides {
//         img {
//             width: 100%;
//             height: auto;
//         }
//     }

//     .tns-inner {
//         transition: left 0.2s;
//         position: relative;
//         left: 0;
//         top: 0;
//         display: block;
//     }

//     &.next .tns-inner {
//         left: -50px;
//     }

//     &.prev .tns-inner {
//         left: 50px;
//     }

//     &__nav {
//         position: absolute;
//         top: 0;
//         left: 0;
//         right: 0;
// 		bottom: 0;
// 		display: none;

// 		  @media (min-width: 1200px) {
// 			  display: block;
// 		  }
//     }

//     &__nav-prev {
//         position: absolute;
//         top: 0;
//         left: 0;
//         width: 50%;
//         height: 100%;

//         &.full {
//             width: 100%;
//         }
//     }

//     &__nav-next {
//         position: absolute;
//         top: 0;
//         right: 0;
//         width: 50%;
//         height: 100%;

//         &.full {
//             width: 100%;
//         }
//     }
// }
</style>