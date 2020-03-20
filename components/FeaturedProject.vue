<template>
  <div class="w-full xl:pl-20">
    <div v-if="section.project[0]" class="h-screen w-full bg-contain bg-center bg-no-repeat relative flex flex-col justify-center" :style="{'background-image': `url(${backgroundImage})`}">
        <div class="xl:-ml-20">
          <nuxt-link
            :to="`/projects/${section.project[0].post_name}`"
            class="hover:text-pink">
            <h3 class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none text-pink">Interiors</h3>
            <h2
                class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none">
                  {{ section.project[0].post_title }}
            </h2>
          </nuxt-link>
        </div>
    </div>
  </div>
</template>

<script>
import Underline from '~/assets/svg/Underline.svg?inline';

export default {
  name: "FeaturedProject",

  props: {
    section: Object
  },

  components: {
    Underline
  },

  computed: {
    backgroundImage() {
      if (process.browser) {
        const mq = window.matchMedia( "(min-width: 900px)" );
        
        if (mq.matches) {
          return this.section.p_image.url ? this.section.p_image.url : '';
        } else {
          return this.section.p_mobile_image.url ? this.section.p_mobile_image.url : '';
        }
      }
    }
  }
}
</script>