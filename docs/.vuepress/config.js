module.exports = {
  base: '/docs-site/', //部署站点的基础路径
  title: 'theaoe', //网站的标题
  description: 'Weclome my friend', //网站的描述
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.png'
    }],
    ["link", {
      rel: "stylesheet",
      href: "/css/style.css"
    }]
  ],
  port: '7777',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/logo.jpg',
    nav: require('./navbar.js'), //顶部导航栏
    sidebar: 'auto',
    lastUpdated: 'Last Updated', // string | boolean
    serviceWorker: {
      updatePopup: {
        message: '有新的内容',
        buttonText: '更新'
      }
    },
    smoothScroll: true, //启用页面滚动效果
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页!'
  }
}