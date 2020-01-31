const readFileList = require("../../scripts/build.js");

module.exports = {
  repo: 'poetries/node-learning-notes',
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    docsBranch: 'master',
    docsDir: 'docs',
    editLinks: false,
    editLinkText: '帮助我们改善此页面！',
    algolia: {
      apiKey: '8c8a7cb8b23131c1282654084a8ca10f',
      indexName: 'Monthly',
      inputSelector: '',
      debug: false
    },
    locales: {
      '/': {
        editLinkText: '在 GitHub 上编辑此页',
        // nav: require('./nav/zh'),
        sidebar: {
          '/notes/': renderSiderBar()
        }
      }
    }
}

function renderSiderBar() {
  return ([
    // ["/notes/", "首页"],
    {
      title: "基础篇",
      collapsable: false,
      children: readFileList('base')
    },
    {
      title: "内置模块",
      collapsable: true,
      children: readFileList('modules')
    },
    {
      title: "进阶篇",
      collapsable: true,
      children: readFileList('advance')
    },
    {
      title: "Express",
      collapsable: true,
      children: readFileList('express')
    },
    {
      title: "Koa2",
      collapsable: true,
      children: readFileList('koa2')
    },
    {
      title: "其他",
      collapsable: false,
      children: readFileList('other')
    }
])
}