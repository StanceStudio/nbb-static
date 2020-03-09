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

  loading: false,

  css: [
    '~/assets/css/fonts.css',
  ],

  plugins: [
    { src: '~/plugins/vue-lazyload', ssr: false },
    { src: '~/plugins/vue-scrollto', ssr: false },
    { src: '~/plugins/mixins' },
    { src: '~/plugins/axios' }
  ],

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/svg'
  ],

  axios: {},

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
    hostname: process.env.WORDPRESS_URL,
    path: '/sitemap.xml',
    sitemaps: [
      {
        path: '/sitemap-articles.xml',
        routes: async () => {
          const { data } = await axios.get(process.env.WORDPRESS_API_URL + '/wp/v2/posts', {
            params: { orderby: 'date', per_page: 1000000 }
          });
          return data.map(article => ({
            url: `/${article.slug}`,
            lastmod: article.modified
          }));
        }
      },
      {
        path: '/sitemap-pages.xml',
        routes: async () => {
          const { data } = await axios.get(process.env.WORDPRESS_API_URL + '/wp/v2/pages', {
            params: { orderby: 'date', per_page: 1000000 }
          });
          return data.map(page => ({
            url: `/${page.slug}`,
            lastmod: page.modified
          }));
        }
      },
    ]
  },

  generate: {
  }
};
