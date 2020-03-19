<template>
  <div class="sections">
    <section
      v-for="(section, i) in content"
      :key="'section-' + i"
      :data-type="section.acf_fc_layout"
      class="py-10 xl:py-14">
      
        <div
          v-if="'text' === section.acf_fc_layout"
          class="font-light text-lg xxl:text-xl xl:w-1/2"
          :class="{'ml-auto' : section.text_align === 'right'}">
          <div
            v-if="section.heading"
            class="flex items-baseline mb-2">
            <PinkDiamond style="width: 0.5em;" class="mr-1" />
            <h3 v-html="section.heading" class="uppercase"></h3>
          </div>
          <div
            v-html="filterPostContent(section.text)"
            class="wysiwyg">
          </div>
          <div
            v-if="section.link && section.link_text"
            class="mt-6">
            <nuxt-link
              :to="filterPostContent(section.link)"
              class="uppercase text-pink text-xl xxl:text-2xl">
              {{ section.link_text }}
            </nuxt-link>
          </div>
        </div>
     

      <div
        v-if="'image' === section.acf_fc_layout"
        class="lazy">
        <img v-lazy="section.image.url" :alt="section.image.alt" />
      </div>

      <div
        v-else-if="'image_quote' === section.acf_fc_layout"
        class="lg:flex lg:items-center">
        <div
          v-if="section.image.url"
          class="mb-10 xl:mb-0 lg:w-1/3">
          <div class="lazy">
            <img v-lazy="section.image.url" :alt="section.image.alt" />
          </div>
        </div>
        <div
          v-if="section.quote"
          class="lg:w-1/2 lg:ml-10 xl:ml-20">
          <blockquote class="font-serif uppercase leading-none text-2xl lg:text-3xl xl:text-4xl">
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

      <div
        v-if="'heading' === section.acf_fc_layout">
        <h2
          v-html="section.heading_text"
          class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none"
          :class="{'text-pink' : section.heading_colour === 'pink'}">
        </h2>
      </div>

      <div
        v-if="'headline' === section.acf_fc_layout"
        class="flex">
        <div class="w-12 mt-4 mr-8 lg:mr-18" >
          <PinkDiamond />
        </div>
        <div
          v-html="section.headline_text"
          class="text-xl sm:text-2xl lg:text-3xl xxl:text-4xl font-serif uppercase leading-tight">
        </div>
      </div>

      <div
        v-if="'simplicity_heading' === section.acf_fc_layout"
        class="">
          <div
            v-html="section.sh_text_1"
            class="heading-1 overflow-hidden relative text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none">
          </div>
          <div
            v-html="section.sh_text_2"
            class="heading-2 overflow-hidden relative text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none">
          </div>
      </div>

      <Simplicity v-if="'simplicity' === section.acf_fc_layout" :section="section" />

    </section>
  </div>
</template>

<script>
import Simplicity from '~/components/Simplicity.vue';
import PinkDiamond from '~/assets/svg/PinkDiamond.svg?inline';

export default {
  name: "Sections",

  components: {
    PinkDiamond,
    Simplicity,
  },

  props: {
    content: Array
  },

  mixins: {
    filterPostContent: Function
  },
};
</script>


<style scoped>
.small_large {
  > div {
    @apply w-1/2 pl-10;
  }

  > div:first-child {
    @screen xl {
      @apply w-1/3 pr-10
    }
  }

  > div:nth-child(2) {
    @screen xl {
      @apply w-2/3
    }
  }
}

.large_small {
  > div {
    @apply w-1/2 pl-10;
  }

  > div:first-child {
    @screen xl {
      @apply w-2/3
    }
  }

  > div:nth-child(2) {
    @screen xl {
      @apply w-1/3 pl-10
    }
  }
}
</style>