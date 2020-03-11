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
          <!-- <span
            class="inline-block"> -->
            <nuxt-link
              exact
              :to="{ path: item.link === 'home' ? '/' : `/${item.link}` }"
              @click.native="toggleMenu"
              class="nav-item__link text-3xl md:text-4xl lg:text-lg lg:p-6 relative inline-block"
              ref="navItemLink"
              @mouseenter.native="navItemMouseover" 
              @mouseleave.native="navItemMouseout">
              {{ item.title }}
              <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" class="hidden"/>
            </nuxt-link>
          <!-- </span> -->
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
      isHovering: false
    };
  },

  created() {
    this.fetchNavigation();
  },

  updated() {
    this.$nextTick(() => {
    this.$refs.navItem.forEach((item) => {
      console.log(item);
      
      const w = item.getBoundingClientRect().width;      
      if (w > 150) {
        item.classList.add('nav-item--lg');
      } else {
        item.classList.add('nav-item--sm');
      }
    })
    });
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

    navItemMouseout(e) {
      //console.log(e);
      let img = e.target.getElementsByTagName('img')[0];
     // console.log(img);
      e.target.style.backgroundImage = '';
      if (img) {
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
      }
    },

    navItemMouseover(e) {
     // console.log(e);
      //let img = e.target.getElementsByTagName('img')[0];
      //console.log(img);
      if (e.target) {
        const w = e.target.getBoundingClientRect().width;
        //console.log(w);

        let r = Math.random().toString(36).substring(7);
        
        if (w > 130) {
          e.target.style.backgroundImage = `url(${require('~/assets/img/LargeCircle.gif')}?${r}`;
        } else {
          e.target.style.backgroundImage = `url(${require('~/assets/img/MediumCircle.gif')}?${r}`;
        }
      }

      // if (img) {
      //   const w = img.getBoundingClientRect().width;
      //   if (w > 130) {
      //     img.src = require('~/assets/img/LargeCircle.gif');
      //   } else {
      //     img.src = require('~/assets/img/MediumCircle.gif');
      //   }
      // }
    },

    showMenuItems() {
      if (process.browser) {
        const mq = window.matchMedia( "(max-width: 900px)" );
        if (mq.matches) {
          let tl = new TimelineMax();
          TweenMax.staggerTo('.nav-item__link', .6 , { y: 0, delay: .2, ease: "power3.out"}, .1 );
        }
      }
    },

    hideMenuItems() {
      TweenMax.staggerTo('.nav-item__link', .6, { y: '110%', delay: 0, ease: "power3.out"}, .1 );
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
          this.showNav = false;
          setTimeout(() => {
            this.hideMenuItems();
          }, 200);
        }
      }
    }
  },
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

  /* img {
    @apply inset-0;

    object-fit: contain;
    position: absolute;
    width: 100%;
    pointer-events: none;
    object-position: center;
    height: 100%;
    z-index: -1;
  } */
}

.nav-item__link {
  @media (max-width: 900px) {
    transform: translateY(110%);
  }
}
</style>