import axios from 'axios';
require('dotenv').config();

export default {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    htmlAttrs: {
      lang: 'en'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  loading: {
    color: '#ff40b4'
  },

  pageTransition: {
    enter () {
      this.$bus.$emit('page-enter')
    },
    
    beforeEnter () {
      this.$bus.$emit('page-before-enter')
    },

    afterEnter () {
      this.$bus.$emit('page-after-enter')
    },

    beforeLeave () {
      this.$bus.$emit('page-before-leave')
    },

    leaveCancelled (){
      this.$bus.$emit('page-leave-cancelled')
    }
  },

  css: [
    '~/assets/css/fonts.css',
  ],

  plugins: [
    { src: '~/plugins/vue-lazyload', ssr: false },
    { src: '~/plugins/vue-scrollto', ssr: false },
    { src: '~/plugins/tiny-slider.js', mode: 'client' },
    { src: '~/plugins/mixins' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/bus' },
  ],

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    //'@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/svg',
    '@nuxtjs/device'
  ],

  env: {
    wpAPI: process.env.WP_API,
    wpURL: process.env.WP_URL,
  },

  axios: {},

  workbox: {
    runtimeCaching: [
      {
        urlPattern:  process.env.WP_API + '/.*',
        strategyOptions: {
          cacheName: 'wordpress',
          cacheExpiration: {
            maxEntries: 50,
            maxAgeSeconds: 300
          }
        }
      },
    ]
  },

  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ];
      }
    },

    postcss: {
      plugins: {
        'postcss-nested': {},
      },
    },
  },

  sitemap: {
    hostname: 'https://nbb-api.stance.design'
  },

  // sitemap: {
  //   hostname: process.env.wpURL,
  //   path: '/sitemap.xml',
  //   sitemaps: [
  //     {
  //       path: '/sitemap-articles.xml',
  //       routes: async () => {
  //         const { data } = await axios.get(process.env.wpAPI + '/wp/v2/posts', {
  //           params: { orderby: 'date', per_page: 1000000 }
  //         });
  //         return data.map(article => ({
  //           url: `/${article.slug}`,
  //           lastmod: article.modified
  //         }));
  //       }
  //     },
  //     {
  //       path: '/sitemap-pages.xml',
  //       routes: async () => {
  //         const { data } = await axios.get(process.env.wpAPI + '/wp/v2/pages', {
  //           params: { orderby: 'date', per_page: 1000000 }
  //         });
  //         return data.map(page => ({
  //           url: `/${page.slug}`,
  //           lastmod: page.modified
  //         }));
  //       }
  //     },
  //   ]
  // },

  generate: {
    async routes() {
      let posts = await axios
        .get(`${ process.env.WP_API}/wp/v2/posts`, {
          params: { orderby: 'date', per_page: 100, _embed: null }
        })
        .then(res => {          
          return res.data.map(post => {
            return {
              route: '/update/' + post.slug,
              payload: post
            };
          });
        });
      let pages = await axios
        .get(`${ process.env.WP_API}/wp/v2/pages`, {
          params: { orderby: 'date', per_page: 100, _embed: null }
        })
        .then(res => {
          return res.data.map(page => {
            return {
              route: '/' + page.slug,
              payload: page
            };
          });
        });
      let projects = await axios
        .get(`${ process.env.WP_API}/wp/v2/projects`, {
          params: { orderby: 'date', per_page: 100, _embed: null }
        })
        .then(res => {
          return res.data.map(project => {
            return {
              route: '/projects/' + project.slug,
              payload: project
            };
          });
        });
      let press = await axios
        .get(`${ process.env.WP_API}/wp/v2/press`, {
          params: { orderby: 'date', per_page: 100, _embed: null }
        })
        .then(res => {
          return res.data.map(pressItem => {
            return {
              route: '/press/' + pressItem.slug,
              payload: pressItem
            };
          });
        });
      return Promise.all([posts, pages, projects, press]).then(values => {
        return [...values[0], ...values[1], ...values[2], ...values[3]];
      });
    }
  }
};

