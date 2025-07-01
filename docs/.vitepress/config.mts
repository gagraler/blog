import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';
// import { autoGenerateMultiSidebar } from '../utils/autoSidebar.mts'

const vitePressConfigs = {
  /* ... */
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "XuHuaian,s Blog",
  description: "记录自己的工作学习心得，争取当一条有梦想的咸鱼",
  head: [ // 注入到页面<head> 中的标签
    ['link', {rel: 'icon', href: '/favicon.png'}], //favicon，资源放在public文件夹
  ],

  // markdown: {
  //   lineNumbers: true, // 代码块是否显示行号
  // },
  
  // 主题配置
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {

    // sidebar: autoGenerateMultiSidebar('develop'),
    sidebar: generateSidebar({
      /*
       * For detailed instructions, see the links below:
       * https://vitepress-sidebar.jooy2.com/guide/api
       */
      documentRootPath: 'docs', //文档根目录
      // scanStartPath: null,
      // resolvePath: null,
      // useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
      // frontmatterTitleFieldName: 'title',
      // useFolderTitleFromIndexFile: true, //是否使用层级首页文件名做分级标题
      // useFolderLinkFromIndexFile: false, //是否链接至层级首页文件
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // capitalizeFirst: false,
      // capitalizeEachWords: false,
      collapsed: false, //折叠组关闭
      // collapseDepth: 2, //折叠组2级菜单
      // sortMenusByName: false,
      // sortMenusByFrontmatterOrder: false,
      // sortMenusByFrontmatterDate: false,
      // sortMenusOrderByDescending: false,
      // sortMenusOrderNumericallyFromTitle: false,
      // sortMenusOrderNumericallyFromLink: false,
      // frontmatterOrderDefaultValue: 0,
      manualSortFileNameByPriority: ['develop', 'cloud-navite', 'operation', 'database', 'about'], //手动排序，文件夹不用带后缀
      //removePrefixAfterOrdering: false, //删除前缀，必须与prefixSeparator一起使用
      // prefixSeparator: '.', //删除前缀的符号
      // excludeFiles: ['first.md', 'secret.md'],
      // excludeFilesByFrontmatterFieldName: 'exclude',
      // excludeFolders: ['secret-folder'],
      // includeDotFiles: false,
      // includeRootIndexFile: false,
      // includeFolderIndexFile: false, //是否包含层级主页
      // includeEmptyFolder: false,
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
      // rootGroupCollapsed: false,
      // convertSameNameSubFileToGroupIndexPage: false,
      // folderLinkNotIncludesFileName: false,
      // keepMarkdownSyntaxFromTitle: false,
      // debugPrint: false,
    }),

    // 搜索
    // https://vitepress.dev/reference/default-theme-config#search
    search: {
      provider: 'local'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      // label: '页面导航',
      level: [1, 4],
    },

    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      },
    },

    // 侧边栏
    // https://vitepress.dev/reference/default-theme-config#sidebar

    siteTitle: 'XuHuaian,s Blog', // 站点标题
    logo: '/imgs/logo.jpg', // 站点logo

    // 编辑链接
    // https://vitepress.dev/guide/site-config#edit-link
    editLink: {
      pattern: ({ filePath }) => {
        if (filePath.startsWith('packages/')) {
          return `https://github.com/gagraler/blog/edit/main/${filePath}`
        } else {
          return `https://github.com/gagraler/blog/edit/main/docs/${filePath}`
        }
      },
      text: 'Edit this page on GitHub'
    },

    // 页脚
    // https://vitepress.dev/reference/default-theme-config#footer
    footer: {
      message: '许怀安 | MIT License',
      copyright: `Copyright © 2020-${new Date().getFullYear()}`
    },

    // 导航
    nav: [
      {text: 'Home', link: '/'},

      {
        text: 'Develop', items: [
          {
            text: '微服务', items: [
              {text: 'RPC与gRPC', link: '/develop/微服务/RPC与gRPC'},
            ],
          },

          {
            text: 'Golang', items: [
              {text: 'Kubernetes client-go源码阅读', link: '/develop/Golang/1.kubernetes-client-go源码阅读.md'},
              {text: 'Kubernetes Informer分页实现', link: '/develop/Golang/2.kubermetes-Informer分页实现.md'},
              {text: 'kubernetes Compatible Engine：跨版本集群资源管理的利器', link: '/develop/Golang/3.kubernetesCompatibleEngine:跨版本集群资源管理的利器.md'},
            ]
          },

        ],
      },

      {
        text: 'Cloud Native', items: [

          {
            text: 'Kubernetes', items: [
              {text: 'Kubernetes架构', link: '/cloud-navite/1.Kubernetes/01.Kubernetes架构'},
              {text: 'Kubernetes基于RBAC的认证与授权', link: '/cloud-navite/1.Kubernetes/02.Kubernets基于RBAC的认证与授权.md'},
              {text: 'Kubeadm部署 Kubernetes(v1.27.2)集群', link: '/cloud-navite/1.Kubernetes/03.kubeadm 部署 Kubernetes(v1.27.2)集群.md'},
            ],
          },

          {
            text: 'Istio', items: [
              {text: 'Istio笔记', link: '/cloud-navite/2.istio/1.istio笔记.md'},
              {text: 'Ingress与Egress', link: '/cloud-native/2.istio/2.ingress与egress.md'},
              {text: 'Istio Gateway', link: '/cloud-native/2.istio/3.istioGateway.md'},
              {text: 'Istio多集群管理', link: '/cloud-native/2.istio/4.istio多集群管理.md'},
            ]
          },
        ],
      },

      // 运维部分
      {
        text: 'Operation', items: [

            // 挖矿病毒部分
          {
            text: 'Linux', items: [
              {text: '挖矿病毒排杀过程', link: '/operation/Linux/1.Linux下挖矿病毒排杀过程'},
            ],
          },
        ],
      },

      // 数据库部分
      {
        text: 'Database', items: [
          {
            text: 'MySQL', items: [
              {text: '两阶段提交', link: '/database/1.MySQL/1.两阶段提交.md'},
              {text: '查询关键字详解', link: '/database/1.MySQL/2.查询关键字详解'},
            ],
          },
          {
            text: 'Redis', items: [
              {text: 'Redis数据类型', link: '/pages/0f7590/'},
              {text: 'Redis数据结构', link: '/pages/0f7590/'},
            ]
          },
        ]
        },

        // 关于
      {
        text: 'About', items:[
            {text: '关于我',link: 'about/aboutMe'},
            {text: '开源项目', link: 'about/openSource'},
       ],
      },
    ],

    socialLinks: [
      { icon: 'GitHub', link: 'https://github.com/gagraler' }
    ]
  },
  
})
