# ViperWebSite

Viper 编程语言官网（[viper.gvsds.com](https://viper.gvsds.com)）源码。

Viper 是「Python 语法，LLVM 语义」的系统级编程语言：沿用 Python 的书写习惯，编译为原生机器码。

## 技术栈

- Vue 3（`<script setup>` + TypeScript）
- Vite 8（rolldown）
- 零 UI 框架：手写 CSS 设计系统（[src/assets/base.css](src/assets/base.css)）
- [Lenis](https://github.com/darkroomengineering/lenis) 平滑惯性滚动
- 字体自托管（`@fontsource/inter`、`@fontsource/playfair-display`），无外网依赖

## 目录结构

```
src/
├─ App.vue                  页面装配 + Lenis 实例 + 滚动揭示观察器
├─ main.ts                  入口
├─ assets/base.css          设计系统：色板 / 字体栈 / 暗黑模式变量 / 通用工具类
├─ i18n/                    中英双语文案（index.ts 保存语言状态，zh.ts / en.ts 为词条）
└─ components/
   ├─ TheHeader.vue         顶栏：导航、语言切换、主题切换
   ├─ HeroSection.vue       首屏：整屏宽巨字 + 滚动飞行动效
   ├─ FeaturesSection.vue   为什么是 Viper：卡片网格 + 鼠标跟随光晕
   ├─ CompilerSection.vue   编译器流水线
   ├─ OopSection.vue        面向对象
   ├─ MetaSection.vue       元编程
   ├─ ReplSection.vue       交互式 REPL
   ├─ SourceSection.vue     源码导览：数据条 + 目录树
   ├─ QuickStartSection.vue 快速开始
   ├─ EcosystemSection.vue  生态：双列卡片
   ├─ RoadmapSection.vue    路线图：时间轴
   └─ TheFooter.vue         页脚
deploy.ps1                  构建 + 部署脚本（见下）
```

## 开发

```powershell
npm install
npm run dev      # 开发服务器：http://localhost:5175（监听 0.0.0.0，便于局域网/手机真机预览）
```

## 构建与部署

```powershell
npm run build    # vue-tsc -b 类型检查 + vite build → dist/
.\deploy.ps1     # 清理旧产物 → 全量构建 → 同步 dist 到 TempLate/Viper → 校验一致性
```

`deploy.ps1` 做四件事：

1. 删除 `dist/` 与生产目录 `../TempLate/Viper/` 下的旧 `assets/`、`index.html`（避免残留旧 hash 文件）
2. 执行 `npm run build`，类型检查失败即中断
3. 把 `dist/*` 同步到 `../TempLate/Viper/`
4. 校验生产目录的文件名集合与 `dist/` 完全一致，并确认 `index.html` 引用的入口 JS 真实存在

生产目录 `TempLate/Viper` 由 Django 站点以 `viper.gvsds.com` 子域名托管，产物入口使用根绝对路径 `/assets/...`。
**本地直接打开构建产物会白屏**，需以 `TempLate/Viper` 为站点根访问。

> `deploy.ps1` 必须保持纯 ASCII：Windows PowerShell 5.1 会用 ANSI 代码页解析无 BOM 的 UTF-8 脚本，非 ASCII 字符会乱码。

## 设计系统要点

- **单一强调色**：青柠绿 `--accent: #0dc260`，配合面板/描边/灰阶语义变量；组件内不出现硬编码中性色
- **暗黑模式**：由 `html[data-theme='dark']` 驱动，仅覆盖 `base.css` 里的 CSS 变量，组件零改动
  - `index.html` 在首屏渲染前用内联脚本写入 `data-theme`（优先 `localStorage['viper-theme']` 手动选择，否则跟随系统偏好），避免闪白；同时同步 `<meta name="theme-color">`
  - 暗色下 `--accent-strong` 必须换更亮的绿（`#4ddb8a`），`--bg-deep` 需比页面底色再深一档
- **滚动**：Lenis 接管纵向滚动（`lerp: 0.08`、`anchors.offset: -76`）；横向裁剪放在根元素 `html` 上（`overflow-x: clip`），放 `body` 会被 Lenis 的 `allowNestedScroll` 误判为嵌套滚动源
- **动效三条**：首屏巨字随滚动飞入「为什么是 Viper」标题槽位；Features 卡片鼠标跟随光晕；跨 section 背景渐变衔接（下一 section 顶部留透明区让上一区柔光透出）

## 相关仓库

- [VenomWebSite](https://git.gvsds.com/GVSDS/VenomWebSite) — Venom 包管理器官网（venom.gvsds.com）
- [GVSite](https://git.gvsds.com/GVSDS/GVSite) — GVSDS 工作室官网

## 浏览器兼容

- `overflow: clip` 前置 `overflow-x: hidden` 回退（老 iOS Safari < 16 / Chrome < 90 会丢弃 `clip`）
- 尊重 `prefers-reduced-motion`：系统开启「减弱动态效果」时，Lenis 与巨字滚联动效自动退回原生行为
