import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "下一行逻辑",
  description: "下一行逻辑 · 写下一段思考，推演下一行逻辑",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
