<template>
<div class="md:flex">
  <div
      v-if="section.il_image.url"
      class="lazy md:w-5/12 mb-10 md:mb-0">
      <div class="lazy">
        <img v-lazy="section.il_image.url" :alt="section.il_image.alt" />
      </div>
    </div>
    <div
      v-if="section.il_text_items"
      class="md:w-1/2 md:pl-8 lg:pl-14 xxl:pl-20 flex flex-col justify-between">
      <div
        v-for="(text, i) in section.il_text_items"
        :key="'section-' + i"
        class="uppercase font-serif text-xl lg:text-2xl flex md:flex-nowrap flex-wrap">
          {{ text.text_1 }} <DashLine class="inline-block px-4" style="width:3em"/> {{ text.text_2 }}
      </div>
    </div>
  </div>
</template>

<script>
import DashLine from '~/assets/svg/DashLine.svg?inline';

export default {
  name: "ImageList",

  props: {
    section: Object
  },

  components: {
    DashLine
  },

  computed: {

  }
}
</script>
