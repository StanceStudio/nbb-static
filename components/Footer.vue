<template>
  <footer
    class="site-footer w-100 pb-8 pt-12 sm:pb-12 sm:pt-18 xxl:pb-14 xxl:pt-22"
    ref="footer"
  >
    <div class="container flex justify-center">
      <div
        class="w-full font-light flex uppercase text-lg sm:text-xl leading-tight md:text-left">
          <div class="w-1/2 mb-4 md:mb-0 md:w-2/3">
            <a href="#" class="hover:text-pink" @click.prevent="scrollTop">Back to top</a>
          </div>
          <div class="w-1/2 md:w-1/3">
            <a href="https://www.instagram.com/niloufarbakhtiar/" class="hover:text-pink">Instagram</a>
          </div>
        </div>
      </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",

  data() {
    return {
      menuItems: [],
    };
  },

  methods: {
    scrollTop() {
      this.$scrollTo(document, 500);
    }
  }
};
</script>
