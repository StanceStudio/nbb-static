<template>
  <nav role="navigation" aria-label="Main" class="ml-auto xl:-mr-6">
    <ul class="flex items-center font-serif uppercase">
      <li
        v-for="(item) in menuItems"
        :key="item.id"
        class="text-lg xl:px-6"
      >
        <NuxtLink
          exact
          :to="item.link === 'home' ? '/' : `${item.link}`"
        >
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navigation",

  data() {
  return {
      menuItems: [],
      showSubNav: false,
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
    },

    toggleSubNav() {
      if (this.showSubNav) {
        this.showSubNav = false
      } else {
        this.showSubNav = true;
      }
    }
  }
};
</script>

<style>
</style>