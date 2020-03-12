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
            class="nav-item__link inline-block">
            {{ item.title }}
            <div class="underline hidden xl:inline-block">
              <Underline class="text-pink" />
            </div>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Underline from '~/assets/svg/Underline.svg?inline';

export default {
  name: "FooterNavigation",

  components: {
    Underline,
  },

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
          this.$axios.get(`${process.env.wpAPI}/menus/v1/locations/main-nav`),
      ]);        

      this.menuItems = navigation.items.map(item => new NavigationItem(item));
    }
  }
};
</script>

<style scoped>
.underline {
  transition:all .6s cubic-bezier(.13,.74,.5,.97);
  -webkit-clip-path: inset(0 100% 0 0);
  clip-path: inset(0 100% 0 0);
}

.nav-item__link:hover {
  .underline {
    clip-path: inset(0);
  }
}
</style>