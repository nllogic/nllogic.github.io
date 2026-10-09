# AGENTS.md

本文件面向在此仓库中工作的 AI 编码代理。开始改动前请先通读。

## 项目概述

**下一行逻辑 / nllogic** —— 一个基于 VuePress 2 的文档与博客站点，主题为 `vuepress-theme-hope`。
内容以简体中文为主，站点标题「下一行逻辑」，副标题「写下一段思考，推演下一行逻辑」。

- 框架：VuePress `2.0.0-rc.31`（Vite bundler）+ `vuepress-theme-hope` `2.0.0-rc.109`
- 语言/模块：TypeScript，ESM（`package.json` 中 `"type": "module"`）
- Node：CI 使用 Node 24，本地建议同版本
- 部署：GitHub Actions 推送到 `main` 后自动构建并发布到 `gh-pages` 分支

## 常用命令

```bash
npm ci                 # 按 lockfile 安装依赖（CI 与本地首选）
npm run docs:dev       # 本地开发服务器（热更新）
npm run docs:clean-dev # 清理缓存后启动开发（排查缓存类问题时用）
npm run docs:build     # 生产构建，输出到 src/.vuepress/dist/
npm run docs:update-package # 升级 VuePress 生态依赖（npx vp-update）
```

构建产物在 `src/.vuepress/dist/`，已被 `.gitignore` 忽略；不要手动提交该目录。

## 目录结构

```
src/
  README.md              # 站点首页（home: true 的 frontmatter）
  portfolio.md           # 「关于」页（portfolio: true）
  guide/                 # 文档区，README.md 为分区首页
  demo/                  # 功能演示页（可参考其 frontmatter 与 Markdown 写法）
  .vuepress/
    config.ts            # 站点级配置：base / lang / title / description
    theme.ts             # 主题配置：导航、侧边栏、页脚、Markdown 扩展、插件
    navbar.ts            # 顶部导航栏结构
    sidebar.ts           # 侧边栏结构
    styles/
      config.scss        # 主题变量（$theme-color 等）
      palette.scss       # 调色板覆盖
      index.scss         # 自定义全局样式
  .vuepress/public/      # 静态资源，构建时原样拷贝到站点根
    assets/image/        # 图片资源（logo、插图）
    assets/icon/         # PWA 图标
```

## 内容与写作约定

新增页面 = 在 `src/` 下新建 `.md` 文件，通过 frontmatter 声明元信息，通常无需改动配置。

- **首页 / 特殊布局**：`home: true` 为首页，`portfolio: true` 为个人页。修改首页时保留 `heroImage`、`actions`、`highlights` 等结构。
- **frontmatter 字段**（参考 `src/demo/page.md`）：`title`、`icon`、`order`（侧边栏排序）、`category`、`tag`、`sticky`、`star`、`index`、`footer`、`copyright`。
- **图标**：`icon` 使用 Font Awesome 6 Solid 前缀（`theme.ts` 中约定 `prefix: "fa6-solid:"`），品牌图标显式写全前缀，如 `fa6-brands:markdown`。纯名称如 `lightbulb` 会套用默认前缀。
- **目录首页**：分区目录用 `README.md` 作为入口；`order` 控制同级排序。
- **侧边栏/导航**：新增分区需要**同时**在 `sidebar.ts`（及必要时 `navbar.ts`）中登记，否则页面不会出现在导航中。侧边栏的 `children: "structure"` 表示按目录结构自动生成。
- **演示内容**：`src/demo/` 下的页面是模板演示，替换正式内容时可参考但不要照搬其文案。

## 代码与配置约定

- 所有配置使用 TypeScript + ESM。**导入本地 `.ts` 模块时必须写 `.js` 扩展名**（NodeNext 解析），例如 `config.ts` 中 `import theme from "./theme.js"`。新增配置模块同理。
- 仅 `src/.vuepress/**/*.ts` 与 `**/*.vue` 纳入 `tsconfig.json` 类型检查。
- 主题能力（Markdown 扩展、插件）集中在 `theme.ts` 的 `markdown` 与 `plugins` 字段中配置。仓库默认开启了较多演示功能，**新增配置应遵循「只保留实际用到」的原则**，不要无谓开启。
- 评论功能（Giscus）在 `theme.ts` 中已写好但被注释，启用前需替换为自有仓库的 `repoId` 与 `categoryId`。

## 品牌与样式

- 品牌基调为黑底青字，主题色 `$theme-color: #00e5ff`（见 `styles/config.scss`）。
- 颜色统一在 `config.scss`/`palette.scss` 覆盖，个别组件微调写入 `index.scss`；避免在页面内写行内样式。
- 深色模式为可切换（`darkmode: "toggle"`），改动样式时需同时确认浅色与深色下的效果。
- Logo 为黑底方图，导航栏有专门的尺寸/圆角样式（`index.scss` 中的 `.vp-nav-logo`）。

## 部署

`.github/workflows/deploy-docs.yml`：push 到 `main` → `npm ci` → `npm run docs:build` → 生成 `dist/.nojekyll` → 通过 `JamesIves/github-pages-deploy-action` 发布到 `gh-pages`。
构建内存上限 `NODE_OPTIONS=--max_old_space_size=4096`。若需改动部署目标或分支，同步修改该 workflow 与 `theme.ts` 中的 `hostname`、`repo`、`docsDir`。

## 改动检查清单

- [ ] 本地 `npm run docs:dev` 能正常预览，新增页面出现在导航/侧边栏中
- [ ] `npm run docs:build` 通过，无未解析的链接或 frontmatter 报错
- [ ] 中文文案风格与站点一致
- [ ] 浅色 / 深色模式均正常
- [ ] 未提交 `dist/`、`.cache/`、`.temp/`、`node_modules/` 等忽略目录
