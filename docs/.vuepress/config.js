const { fs, path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  base:'/node-learning-notes/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Node笔记归纳整理',
      description: 'Node学习笔记归纳整理'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style',  }]
  ],
  themeConfig: {
    repo: 'poetries/node-learning-notes',
    lastUpdated: 'Last Updated',
    docsBranch: 'dev',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '帮助我们改善此页面！',
    locales: {
      '/': {
        editLinkText: '在 GitHub 上编辑此页',
        nav: require('./nav/zh'),
        sidebar: {
            '/guide/': renderSiderBar()
        }
      }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-145821923-1'
    }],
    // ['vuepress-plugin-baidu-google-analytics', {
    //   hm: '009a2f9b89cfc23cb5722f109462e450f',
    //   ignore_hash: false
    // }],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>',
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>',
    }],
  ],
  extraWatchFiles: [
    '.vuepress/nav/zh.js',
  ]
})

function renderSiderBar() {
  return ([
    {
      title: 'Note笔记',
      collapsable: false,
      children: [
            'part1/lesson01'
        ]
    },
])
}
