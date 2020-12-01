<template>
  <div class="sections">
    <section
      v-for="(section, i) in content"
      :key="'section-' + i"
      :data-type="section.acf_fc_layout"
      class="py-8 xl:py-12">
      
        <div
          v-if="'text' === section.acf_fc_layout"
          class="font-light text-lg xxl:text-xl xl:w-1/2"
          :class="{'ml-auto' : section.text_align === 'right', 'flex items-baseline' : !section.heading && template === 'templates/template-dna.php'}">
          <PinkDiamond
          v-if="section.text_align === 'right' && !section.heading && template === 'templates/template-dna.php'"
          class="mt-4 mr-8 lg:mr-18"
          style="width: 25px;"/>
          <div
            v-if="section.heading"
            class="flex items-baseline mb-2 items-start">
            <PinkDiamond
              v-if="section.heading"
              style="width: 0.5em;" class="mr-1" />
              <h3 v-html="section.heading" class="uppercase"></h3>
          </div>
          <div
            v-html="filterPostContent(section.text)"
            class="wysiwyg w-full flex-1">
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
          class="lg:w-1/2"
          :class="{'lg:ml-10 xl:ml-20': section.image.url}">
          <blockquote class="font-serif uppercase leading-none text-2xl lg:text-3xl xl:text-4xl">
            <p v-html="section.quote"></p>
            <cite class="not-italic text-lg sm:text-xl lg:text-2xl">{{ section.cite }}</cite>
          </blockquote>
        </div>
      </div>

      <div
        v-if="'image_set' === section.acf_fc_layout"
        class="md:flex images"
        :class="`images--${section.image_layout}`">
        <div
          v-for="(image, i) in section.images"
          :key="'image-' + i"
          class="lazy">
            <!-- <div class="lazy"> -->
              <img v-if="image.image.url" v-lazy="image.image.url" :alt="image.image.alt" />
            <!-- </div> -->
        </div>
      </div>

      <div
        v-if="'image_set_3' === section.acf_fc_layout"
        class="md:flex images images--3">
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
        v-if="'line' === section.acf_fc_layout">
          <Underline class="text-black w-full"/>
      </div>

      <div
        v-if="'headline' === section.acf_fc_layout"
        class="flex">
        <div class="mt-4 mr-8 lg:mr-18">
          <PinkDiamond style="width: 25px;"/>
        </div>
        <div
          v-html="section.headline_text"
          class="text-xl sm:text-2xl lg:text-3xl xxl:text-4xl font-serif uppercase leading-tight"
          :class="{'text-pink' : section.headline_colour === 'pink'}">
        </div>
      </div>

      <div
        v-if="'menu' === section.acf_fc_layout">
         <div
          v-for="(menu_item, i) in section.menu_items"
          :key="'menu-item-' + i"
          class="overflow-hidden">
            <div class="underline-reveal">
                <nuxt-link
                  v-if="menu_item.link"
                  :to="filterPostContent(menu_item.link)"
                  class="inline-block relative hover:text-black">
                  <h2
                    v-html="menu_item.title"
                    class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase inline-block leading-none">
                    </h2>
                    <div class="underline hidden xl:block">
                      <Underline class="text-pink w-full"/>
                    </div>
              </nuxt-link>
              <h2
                v-else
                  v-html="menu_item.title"
                  class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase inline-block leading-none">
                  </h2>
            </div>
        </div>
      </div>

      <Video v-if="'video' === section.acf_fc_layout" :section="section" />

      <Simplicity v-if="'simplicity' === section.acf_fc_layout" :section="section" />

      <Carousel v-if="'gallery' === section.acf_fc_layout" :section="section" />

      <FeaturedProject v-if="'project' === section.acf_fc_layout" :section="section" />

      <ImageList v-if="'image_list' === section.acf_fc_layout" :section="section" />

    </section>
  </div>
</template>

<script>
import Simplicity from '~/components/Simplicity.vue';
import Video from '~/components/Video.vue';
import FeaturedProject from '~/components/FeaturedProject.vue';
import Carousel from '~/components/Carousel.vue';
import ImageList from '~/components/ImageList.vue';
import PinkDiamond from '~/assets/svg/PinkDiamond.svg?inline';
import Underline from '~/assets/svg/Underline.svg?inline';

export default {
  name: "Sections",

  components: {
    PinkDiamond,
    Underline,
    Simplicity,
    Video,
    FeaturedProject,
    Carousel,
    ImageList
  },

  props: {
    content: Array,
    template: String
  },

  mixins: {
    filterPostContent: Function
  },

  mounted() {
    console.log(this.content);
  }
};
</script>


<style scoped>
.small_large {
  > div {
    @apply w-1/2;
  }

  > div:first-child {
    @screen xl {
      @apply w-1/3;
    }
  }

  > div:nth-child(2) {
    @apply pl-5;

    @screen xl {
      @apply w-2/3 pl-10;
    }
  }
}

.large_small {
  > div {
    @apply w-1/2;
  }

  > div:first-child {
    @screen xl {
      @apply w-2/3;
    }
  }

  > div:nth-child(2) {
    @apply pl-5;

    @screen xl {
      @apply w-1/3 pl-10;
    }
  }
}

.images {
  @apply -mx-4;
  
  > div {
    @apply px-4 mb-8;

    @screen md {
      @apply mb-0;
    }
  }

  img {
    object-fit: cover
  }
}

.images--50-50 {
  > div {
    @screen md {
      @apply w-1/2;
    }
  }
}

.images--30-70 {
  > div:first-child {
    @screen md {
      @apply w-1/3;
    }
  }

  > div:nth-child(2) {
    @screen md {
      @apply w-2/3;
    }
  }
}

.images--70-30 {
  > div:first-child {
    @screen md {
      @apply w-2/3;
    }
  }

  > div:nth-child(2) {
    @screen md {
      @apply w-1/3;
    }
  }
}

.images--3 {
  > div {
    @screen md {
      @apply w-1/3;
    }
  }
}
</style>