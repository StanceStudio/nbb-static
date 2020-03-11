<template>
  <nav
    role="navigation"
    aria-label="Main"
    class="ml-auto xl:-mr-6">
      <ul
        class="nav flex flex-col lg:flex-row lg:items-center font-serif uppercase absolute h-screen lg:h-auto lg:relative inset-0 lg:inset-auto z-10 bg-green lg:bg-transparent pt-18 lg:pt-0 opacity-0 invisible lg:visible lg:opacity-100 px-4 lg:px-0"
        :class="{'nav--visible' : showNav}">
        <li
          v-for="(item) in menuItems"
          :key="item.id"
          class="overflow-hidden text-3xl md:text-4xl lg:text-lg lg:px-6 leading-tight"
        >
          <span
            ref="menuItem"
            class="menu-item inline-block">
            <nuxt-link
              exact
              :to="{ path: item.link === 'home' ? '/' : `/${item.link}` }"
              @click.native="toggleMenu">
              {{ item.title }}
            </nuxt-link>
          </span>
        </li>
      </ul>
    <button @click.prevent="toggleMenu" type="button" class="block lg:hidden uppercase font-light text-lg relative z-20">{{ showNav ? 'Close' : 'Menu' }}</button>
  </nav>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";

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
            this.$axios.get(`${process.env.wpAPI}/menus/v1/locations/main-nav`),
        ]);        

        this.menuItems = navigation.items.map(item => new NavigationItem(item));
    },

    showMenuItems() {
      if (process.browser) {
        const mq = window.matchMedia( "(max-width: 900px)" );
        if (mq.matches) {
          let tl = new TimelineMax();
          TweenMax.staggerTo('.menu-item', .6 , { y: 0, delay: .2, ease: "power3.out"}, .1 );
        }
      }
    },

    hideMenuItems() {
      TweenMax.staggerTo('.menu-item', .6, { y: '110%', delay: 0, ease: "power3.out"}, .1 );
    },

    toggleMenu() {
      if (process.browser) {
        const mq = window.matchMedia( "(max-width: 900px)" );
        
        if (mq.matches) {
          if (this.showNav) {
            this.showNav = false;
            setTimeout(() => {
              this.hideMenuItems();
            }, 200);
          } else {
            this.showMenuItems();
            this.showNav = true;
          }
        }
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

.menu-item {
  @media (max-width: 900px) {
    transform: translateY(110%);
  }
}
</style>