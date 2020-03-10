<template>
  <nav
    role="navigation"
    aria-label="Main"
    class="ml-auto xl:-mr-6">
      <ul
        class="nav flex flex-col md:flex-row md:items-center font-serif uppercase absolute h-screen md:h-auto md:relative inset-0 md:inset-auto z-10 bg-lavender md:bg-transparent pt-18 md:pt-0 opacity-0 invisible md:visible md:opacity-100 px-4 md:px-0"
        :class="{'nav--visible' : showNav}">
        <li
          v-for="(item) in menuItems"
          :key="item.id"
          class="text-2xl md:text-lg xl:px-6"
        >
          <nuxt-link
            exact
            :to="{ path: item.link === 'home' ? '/' : `/${item.link}` }"
            @click.native="showNav = false"
          >
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    <button @click.prevent="toggleMenu" type="button" class="block md:hidden uppercase font-serif text-lg relative z-20">{{ showNav ? 'Close' : 'Menu' }}</button>
  </nav>
</template>

<script>
export default {
  name: "Navigation",

  data() {
  return {
      menuItems: [],
      showNav: false,
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

    toggleMenu() {
      if (this.showNav) {
        this.showNav = false
      } else {
        this.showNav = true;
      }
    }
  }
};
</script>

<style>
.nav {
  transition: visibility 0s linear .3s, opacity .3s;  
}

.nav--visible {
  @apply opacity-100 visible;

   transition: visibility 0s linear 0s, opacity .3s;
}
</style>