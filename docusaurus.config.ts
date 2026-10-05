import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'myColis',
  tagline: 'Étiquettes, douane et points relais Colissimo pour Shopify',
  // Brand images are generated from static/img/logo.svg by
  // scripts/brand-assets.mjs: run it again whenever the logo changes.
  favicon: 'img/favicon.ico',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/img/favicon-192.png',
      },
    },
    {
      tagName: 'link',
      attributes: {rel: 'apple-touch-icon', href: '/img/favicon-192.png'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'manifest', href: '/site.webmanifest'},
    },
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://mycolis.docs.webesencia.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',
  trailingSlash: false,

  // Deployment config.
  organizationName: 'wethelab',
  projectName: 'mycolis-docs',

  onBrokenLinks: 'throw',

  // French by default. To add English, see README.md: the locale list, the
  // search languages and a localeDropdown navbar item change together.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
    localeConfigs: {
      fr: {
        label: 'Français',
        htmlLang: 'fr-FR',
      },
    },
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['fr'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'myColis',
      logo: {
        alt: 'myColis',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        // Explicit search item: renders the bar within the right-side items,
        // before the color mode toggle, which the theme always appends after.
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/introduction',
            },
            {
              label: 'Créer une étiquette',
              to: '/docs/etiquettes/creer-une-etiquette',
            },
            {
              label: 'Dépannage',
              to: '/docs/depannage',
            },
          ],
        },
        {
          title: 'Assistance',
          items: [
            {
              label: 'Écrire au support',
              href: 'mailto:support@webesencia.com',
            },
            {
              label: 'Questions fréquentes',
              to: '/docs/faq',
            },
          ],
        },
        {
          title: 'Webesencia',
          items: [
            {
              label: 'Site web',
              href: 'https://www.webesencia.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Webesencia.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
