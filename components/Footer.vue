<template>
  <footer
    class="site-footer w-100 py-8 sm:py-12 xxl:py-14"
    ref="footer"
  >
    <div class="container flex justify-center mt-20">
      <div
        class="w-full font-light flex flex-col sm:flex-row uppercase text-center text-lg sm:text-xl leading-tight md:text-left">
          <div class="mb-4 md:mb-0 w-2/3">
            <a href="#" class="hover:text-pink" @click.prevent="scrollTop">Back to top</a>
          </div>
          <div class="w-1/3">
            <a href="https://instagram.com" class="hover:text-pink">Instagram</a>
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
