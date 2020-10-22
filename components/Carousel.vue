
<template>
  <div>
    <client-only>
      <div class="carousel">
        <vue-tiny-slider
          ref="tinySlider"
          items="1"
          slideBy="1"
          gutter="0"
          :mouse-drag="true"
          :loop="true"
          :controls="true"
          :nav="false"
          :preventScrollOnTouch="'auto'"
          :autoHeight="true"
          :responsive="responsiveSettings"
          >
            <div
              v-for="image in slideItems"
              :key="image.id"
              class="carousel__slide">
              <img 
                :src="image.sizes['stance-1000']" :alt="image.alt">
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
      slideItems: [],
      responsiveSettings: {
        920: {
          items: this.section.gallery_items,
          slideBy: this.section.gallery_items,
          gutter: 20,
        }
      }
    };
  },

  head() {
      return {
        link: [
          {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.1/tiny-slider.css'
          }
        ]
      }
    },

    mounted() {
      // removes first slide if using a tablet or mobile
      const slides = this.section.images;
      
      if (this.$device.isMobileOrTablet && this.section.hide_first_slide === 'yes') {
        this.slideItems = slides.splice(0, 1);
      }

      this.slideItems = slides;
    }
};
</script>

<style lang="scss">
//@import '~tiny-slider/src/tiny-slider';

.carousel {
  img {
    @apply inline-block;
    
    @screen xl {
      max-height: 100vh;
      width: auto;
    }
    //max-width: 50rem;
  }

  .tns-item {
    @apply text-center;
  }

  .tns-outer {
    @apply overflow-hidden relative;
  }

  .tns-controls {
    @apply absolute flex w-full z-10 justify-between outline-none;

    top: 50%;
    transform: translateY(-50%);

    @screen lg {
      @apply h-full inset-0 z-10;

      transform: none;
      top: 0;
    }

     button {
       @apply bg-no-repeat bg-center outline-none h-12 w-12 bg-contain;

       font-size: 0px;

      @screen lg {
        @apply w-1/2 h-auto;
        background-image: none!important;
      }
    }

    button[data-controls="prev"] {
      background-image: url(../assets/svg/ArrowLeft.svg);
    }

    button[data-controls="next"] {
      background-image: url(../assets/svg/ArrowRight.svg);
    }

    button[data-controls="prev"]:hover {
      cursor: url(../assets/svg/ArrowLeft.svg), auto;
    }

    button[data-controls="next"]:hover {
      cursor: url(../assets/svg/ArrowRight.svg), auto;
    }
  }
}

// hide first slide on small devices if option is set.
  // @media (max-width: 920px) {
  //   .tns-slide-active {
  //     display: none!important;
  //   }
  // }
</style>