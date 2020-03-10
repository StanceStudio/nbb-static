<template>
  <div>
    <nav role="navigation" aria-label="Footer">
      <ul class="flex flex-col font-serif uppercase">
        <li
          v-for="(item) in menuItems"
          :key="item.id"
          class="text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none"
        >
          <nuxt-link
            exact
            :to="item.link === 'home' ? '/' : `/${item.link}`"
          >
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  name: "Navigation",

  data() {
  return {
      menuItems: [],
    };
  },

  created() {
    this.fetchNavigation();
  },
  
  methods: {
    async fetchNavigation () {
      // Dynamically import the batch of dependencies we need for
      // fetching and displaying the navigation menu.
      const [
          { default: NavigationItem },
          { data: navigation },
      ] = await Promise.all([
          import('~/models/cms/NavigationItem'),
          this.$axios.get(`${process.env.wordpressAPIUrl}/menus/v1/locations/main-nav`),
      ]);        

      this.menuItems = navigation.items.map(item => new NavigationItem(item));
    }
  }
};
</script>

<style>
</style>