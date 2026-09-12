# AI Engineer 知识库

面向 AI Agent / 后端工程师的完整技术知识库，部署在 GitHub Pages 上。

🔗 **访问地址**: https://<username>.github.io/tech-guide-docs/

## 文档目录

### 🤖 AI & LLM
- [AI Agent 架构总指南](guides/ai/ai-agent-engineering-guide.html) — Agent 编排、LangGraph、RAG、系统设计
- [LLM 原理指南](guides/ai/llm-fundamentals-guide.html) — Transformer、Attention、Tokenization
- [LLM 评估 + 成本优化](guides/ai/llm-eval-cost-guide.html) — RAGAS、Token 经济学、优化策略
- [Pi Agent 源码阅读指南](guides/ai/pi-agent-reading-guide.html) — Agent 工具包架构解析

### 💻 编程语言
- [Python 工程实战指南](guides/lang/python-engineering-guide.html) — 异步编程、FastAPI、性能优化
- [Go 语言工程指南](guides/lang/go-engineering-guide.html) — 并发编程、Gin、GORM

### 🏗️ 后端基础设施
- [数据库进阶](guides/backend/database-advanced-guide.html) — 索引、事务、Redis
- [消息队列深入](guides/backend/message-queue-guide.html) — Kafka、RabbitMQ
- [gRPC / Protocol Buffers](guides/backend/grpc-guide.html) — 四种通信模式

### 📅 学习计划
- [Week 1 — 跑通 Demo](guides/plan/learning-week1.html)
- [Week 2 — 做深做精](guides/plan/learning-week2.html)
- [Week 3 — 面试冲刺](guides/plan/learning-week3.html)
- [Week 4 — LLM + Go + Pi](guides/plan/learning-week4.html)
- [Week 5 — 评估 + 模拟面试](guides/plan/learning-week5.html)

## 本地开发

```bash
# 启动本地服务器
cd ..  # 到 tech-guide-docs 的父目录
python3 -m http.server 8000
# 访问 http://localhost:8000/tech-guide-docs/
```

## 新增文档

1. 复制 `docs/page-template.html` 到 `guides/<分类>/` 目录
2. 修改页面标题、描述、内容
3. 在 `assets/js/shared.js` 的 `SITE.categories` 中注册新文档
4. 更新 `sitemap.xml`

## 技术栈

纯 HTML/CSS/JavaScript，无构建工具依赖。GitHub Pages 直接托管。
