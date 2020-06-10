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
          class="nav-item overflow-hidden leading-tight"
          ref="navItem">
            <nuxt-link
              exact
              :to="{ path: item.link === 'home' ? '/' : `/${item.link}` }"
              @click.native="toggleMenu"
              class="hover:text-pink xl:hover:text-black nav-item__link text-3xl md:text-4xl lg:text-lg lg:p-6 relative inline-block"
              ref="navItemLink"
              @mouseenter.native="navItemMouseover" 
              @mouseleave.native="navItemMouseout">
              {{ item.title }}
            </nuxt-link>
        </li>
      </ul>
    <button @click.prevent="toggleMenu" type="button" class="outline-none block lg:hidden uppercase font-light text-lg relative z-20">{{ showNav ? 'Close' : 'Menu' }}</button>
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
      isHovering: false,
      menuItemSize: 130
    };
  },

  created() {
    this.fetchNavigation();
  },

  updated() {
    this.$nextTick(() => {
      if(this.$refs.navItem) {
        this.$refs.navItem.forEach((item) => {      
          const w = item.getBoundingClientRect().width;      
          if (w > this.menuItemSize) {
            item.classList.add('nav-item--lg');
          } else {
            item.classList.add('nav-item--sm');
          }
        });
      }
    });
  },
  
  methods: {
    async fetchNavigation () {
        const [
            { default: NavigationItem },
            { data: navigation },
        ] = await Promise.all([
            import('~/models/cms/NavigationItem'),
            this.$axios.get(`${process.env.wpAPI}/menus/v1/locations/main-nav`),
        ]);        

        this.menuItems = navigation.items.map(item => new NavigationItem(item));
    },

    navItemMouseout(e) {
      e.target.style.backgroundImage = '';
    },

    navItemMouseover(e) {
      const mq = window.matchMedia( "(min-width: 900px)" );
        
        if (mq.matches) {
        if (e.target) {
          const w = e.target.getBoundingClientRect().width;
          let r = Math.random().toString(36).substring(7);
          
          if (w > this.menuItemSize) {
            e.target.style.backgroundImage = `url(${require('~/assets/img/LargeCircle.gif')}?${r}`;
          } else {
            e.target.style.backgroundImage = `url(${require('~/assets/img/MediumCircle.gif')}?${r}`;
          }
        }
      }
    },

    showMenuItems() {
      if (process.browser) {
        const mq = window.matchMedia( "(max-width: 900px)" );
        if (mq.matches) {
          let tl = new TimelineMax();
          TweenMax.staggerTo('.nav .nav-item__link', .6, {y: 0, delay: 0, ease: "power3.out"}, .1);
        }
      }
    },

    hideMenuItems() {
      const _that = this;
      TweenMax.staggerTo('.nav .nav-item__link', 0, {y: '-110%', delay: 0, ease: "power3.out"}, .1, () => {
        _that.showNav = false;
        setTimeout(() => {
          TweenMax.set('.nav  .nav-item__link', {y: '110%'}) 
        }, 300);
      })
    },

    toggleMenu() {
      if (process.browser) {
        const mq = window.matchMedia( "(max-width: 900px)" );
        
        if (mq.matches) {
          if (this.showNav) {
            this.closeMenu();
          } else {
            this.showMenuItems();
            this.showNav = true;
          }
        }
      }
    },

    closeMenu() {
      if (process.browser) {
        const mq = window.matchMedia( "(max-width: 900px)" );
        
        if (mq.matches) {
          this.hideMenuItems();
        }
      }
    }
  },
};
</script>

<style scoped>
.nav {
  transition: visibility 0s linear .3s, opacity .3s;  
}

.nav--visible {
  @apply opacity-100 visible;

  transition: visibility 0s linear 0s, opacity .3s;
}

.nav-item--lg .nuxt-link-active {
  @screen xl {
    background-image: url('~assets/img/LargeCircle.gif');
  }
}

.nav-item--sm .nuxt-link-active {
  @screen xl {
    background-image: url('~assets/img/MediumCircle.gif');
  }
}

.nav-item__link {
  background-image: url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  @screen xl {
    transform: translateY(0)!important;
  }
}

.nav-item__link {
  @media (max-width: 900px) {
    transform: translateY(110%);
  }
}
</style>