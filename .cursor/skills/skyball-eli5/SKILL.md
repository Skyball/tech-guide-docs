---
name: skyball-eli5
description: >-
  为 tech-guide-docs 仓库生成交互式 HTML 学习文档（技术指南或学习计划）。
  结合 brainstorm 主题探索和 ELI5 通俗讲解，输出符合项目侧边栏布局和 shared.css/js 的完整 HTML 页面，
  并自动注册到 SITE 和 sitemap。仅限 tech-guide-docs 项目。
  触发词：「生成指南」「写一篇 guide」「新增知识」「ELI5 写入知识库」「添加到知识库」「tech-guide-docs 新文档」。
---

# Skyball ELI5 — 知识库文档生成器

为 **tech-guide-docs** 项目生成高质量交互式 HTML 学习文档。融合 brainstorm（主题探索）和 ELI5（用最直白的语言讲清复杂概念）两种方法论。

## 生成前必读

每次生成前，agent **必须**先阅读以下文件获取最新项目状态：
1. `assets/js/shared.js` — 前 40 行 SITE 注册表（确认分类和 `SITE.base`）
2. 同分类一篇现有 guide（如 backend → `guides/backend/grpc-guide.html`）作为风格参考
3. `docs/page-template.html` — HTML 骨架基线

## 产出路径规范

```
输出：guides/{ai|lang|backend|plan}/{slug}.html
slug：kebab-case，与 SITE.categories[].docs[].slug 一致
示例：guides/backend/redis-guide.html → slug: 'redis-guide'
```

## 工作流程

```
用户提出主题
  → Phase 1: 头脑风暴（确定分类/结构/章节）
  → Phase 2: ELI5 写作
  → Phase 3: 生成 HTML
  → Phase 4: 注册 + 验证
```

### Phase 1: 头脑风暴

1. **确认分类**：ai / lang / backend / plan（或新建分类）
2. **确认优先级**：P0 / P1 / P2（plan 类可省略）
3. **判断文档类型** → 进入对应分支：
   - **tech guide**（ai / lang / backend）：8-17 章节，每章聚焦一个核心概念
   - **learning plan**（plan）：按 Day/Task 结构，参考 `learning-week1.html`
4. **确定内容深度**：面试导向？工程实战？原理理解？
5. **用 AskQuestion 逐步确认**；不可用时对话提问

### Phase 2: ELI5 写作

**tech guide 章节原则**：
- **一句话说清本质**：给完全不懂的人解释，一句话怎么说？
- **类比先行**：用生活场景类比技术概念
- **图解优先**：ASCII 图、流程图、对比表代替大段文字
- **代码紧跟**：每个概念配可运行的完整代码示例
- **踩坑实录**：常见错误和线上事故案例
- **面试高频题**：主要章节配 2-3 道面试题（details 折叠）

**learning plan 章节原则**：
- 按 Day 划分，每 Day 有明确目标和任务清单
- 使用 checkbox（`<input type="checkbox">`）做进度追踪
- 配资源链接和检查点

### Phase 3: 生成 HTML

**所有 href/src 使用 SITE.base（当前为 `/tech-guide-docs`）+ 相对路径。**

#### tech guide 结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="【描述】">
  <title>【标题】</title>
  <link rel="stylesheet" href="/tech-guide-docs/assets/css/shared.css">
  <style>
    /* 页面特有样式 — 从同分类现有 guide 的 <style> 块复制并调整 */
    html,body { overflow-x:hidden; }
    .hero { background: linear-gradient(135deg, #1a1a2e 0%, #主色 100%); color:#fff; text-align:center; padding:56px 20px; overflow:hidden; }
    .hero h1 { font-size:clamp(1.6rem,5vw,2.4rem); font-weight:800; margin-bottom:8px; }
    .hero p { opacity:.85; font-size:1.1rem; max-width:600px; margin:0 auto; }
    .container { max-width:860px; margin:0 auto; padding:0 20px; }
    /* .nav 样式已在 shared.css 中统一定义，无需重复 */
  </style>
</head>
<body>
  <div class="layout">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">🤖 AI Engineer 知识库</div>
    </aside>
    <main class="main-content">
      <div class="breadcrumb" id="breadcrumb"></div>
      <div class="progress-bar-top" id="progressBar"></div>
      <div class="hero"><h1>【标题】</h1><p>【副标题】</p></div>
      <div class="nav"><div class="nav-inner"><!-- 章节锚点 --></div></div>
      <div class="container">
        <!-- <section id="chN"> 章节内容 </section> -->
      </div>
      <div id="page-nav"></div>
    </main>
  </div>
  <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="打开导航">☰</button>
  <script src="/tech-guide-docs/assets/js/shared.js" defer></script>
</body>
</html>
```

#### learning plan 结构

参考 `guides/plan/learning-week1.html`。使用 `.day`/`.task`/checkbox 布局，不强制 sticky nav 和面试题。

## 章节内容模板（tech guide）

```html
<section id="chN">
  <h2>章节标题</h2>
  <div class="callout callout-info">
    <div class="callout-icon">💡</div>
    <div><strong>一句话</strong>：...</div>
  </div>
  <div class="card"><h3>直觉理解</h3><p>类比/图解...</p></div>
  <h3>核心概念</h3>
  <div class="grid-2">
    <div class="card card-accent">...</div>
    <div class="card card-green">...</div>
  </div>
  <h3>代码实战</h3>
  <pre><code>// 完整可运行代码</code></pre>
  <div class="tip">⚠️ 常见坑：...</div>
  <details><summary>面试题：XXX？</summary><div class="card">参考答案</div></details>
</section>
```

## CSS 组件速查

| 类名 | 用途 |
|------|------|
| `.card` / `.card-accent` / `.card-green` / `.card-orange` | 卡片（白/蓝/绿/橙左边框） |
| `.tag-blue/green/orange/red/purple` | 小标签 |
| `.callout-info` / `.callout-ok` | 提示框 |
| `.tip` | 橙色警告 |
| `.grid-2` / `.grid-3` | 多列网格 |
| `.vs` + `.vs-divider` | 左右对比 |
| `pre` + `code` / `details` + `summary` | 代码块 / 折叠 |
| `.animate-in` | 滚动入场动画 |

## Hero 配色参考

| 分类 | 渐变色 |
|------|--------|
| AI & LLM | `#1a1a2e → #2563eb` |
| Python | `#1a1a2e → #3776ab` |
| Go | `#1a1a2e → #00897b` |
| 后端基础设施 | `#1a1a2e → #1976d2` 或 `#1a1a2e → #4527a0` |
| 学习计划 | `#1e3a5f → #2563eb` |

## 质量标准

| 指标 | tech guide | learning plan |
|------|-----------|---------------|
| 章节数 | 8–17 | 按 Day 划分（5-7 天） |
| 文件体积 | 40–170 KB | 20–40 KB |
| 代码占比 | 30–40% | 10–20% |
| 面试题 | 8–15 道 | 不强制 |
| 对比表/图解 | 每 2-3 章至少一个 | 按需 |

### Phase 4: 注册 + 验证

1. **更新 `assets/js/shared.js`** — 在对应 category 的 `docs` 数组中添加：
   ```javascript
   { slug: 'xxx-guide', title: '文档标题', priority: 'P0', keywords: ['关键词'] }
   ```

2. **更新 `sitemap.xml`** — 添加一行（用户名参考已有条目保持一致）：
   ```xml
   <url><loc>https://skyball.github.io/tech-guide-docs/guides/{category}/{slug}.html</loc></url>
   ```

3. **本地预览**（可选，用于浏览器验证）：

   页面中所有资源路径带 `/tech-guide-docs` 前缀（为 GitHub Pages 设计），本地预览需做路径映射：
   ```bash
   cd /path/to/tech-guide-docs
   ln -sf . tech-guide-docs          # 创建自指符号链接
   python3 -m http.server 8765       # 启动本地服务器
   # 打开 http://localhost:8765/tech-guide-docs/guides/{category}/{slug}.html
   # 验证完毕后删除符号链接
   rm tech-guide-docs
   ```
   > **注意**：不创建符号链接时，shared.css/js 无法加载，sidebar / breadcrumb / page-nav 不会渲染。这不是生成错误，是路径前缀不匹配的预期行为。

4. **验证清单**：
   - [ ] slug 与文件名一致
   - [ ] `getDocUrl(category, slug)` 路径与实际文件位置匹配
   - [ ] 文件体积在质量标准范围内（tech guide: 40–170 KB）
   - [ ] 本地预览：页面可正常打开，Hero / 导航栏 / 章节内容渲染正确
   - [ ] 本地预览（需符号链接）：sidebar 显示且文档条目存在、面包屑正确、上/下一篇导航正确
