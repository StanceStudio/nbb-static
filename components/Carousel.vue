
<template>
  <div>
    <client-only>
      <div class="carousel">
        <vue-tiny-slider
          ref="tinySlider"
          items="1"
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
              v-for="image in section.images"
              :key="image.id"
              class="carousel__slide">
              <img :src="image.sizes['stance-1000']" :alt="image.alt">
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
      responsiveSettings: {
        920: {
          items: this.section.gallery_items,
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