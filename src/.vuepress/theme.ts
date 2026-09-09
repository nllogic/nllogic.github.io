import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://nllogic.github.io",

  author: {
    name: "下一行逻辑",
    url: "https://nllogic.github.io",
  },

  logo: "/assets/image/logo.png",
  favicon: "/assets/image/logo.png",

  repo: "nllogic/nllogic.github.io",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "下一行逻辑 · Next Line Logic",
  displayFooter: true,
  copyright: "Copyright © 2026 下一行逻辑",

  // 深色模式默认开启，贴合品牌黑底青字
  darkmode: "toggle",

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        // oxlint-disable-next-line typescript/consistent-return
        replacer: ({ tag }) => {
          if (tag === "em") {
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
          }
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    // 需要评论时，替换为自有 Giscus 仓库后再启用
    // comment: {
    //   provider: "Giscus",
    //   repo: "nllogic/nllogic.github.io",
    //   repoId: "",
    //   category: "Announcements",
    //   categoryId: "",
    // },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },
  },
});
