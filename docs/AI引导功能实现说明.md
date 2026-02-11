# AI 引导功能实现说明

本文档描述当前 Nuxt 版本中 AI 引导模块的实现方式与代码位置。

## 功能范围

- 欢迎页与理论说明（折叠展开）
- 对话式问答流程
- 基于回答的候选方法推荐
- 结果页展示与跳转到方法论实践

## 路由与页面

- 页面路由：`/ai-guide`
- 页面文件：`app/pages/ai-guide.vue`

## 数据来源

- 问题树数据：`app/data/ai-guide-questions.json`
- 方法论元数据：`app/lib/methodology-data.ts`
- AI 引导逻辑：`app/api/ai-guide.ts`

## 交互流程

1. 用户进入欢迎页，点击“开始提问”。
2. 页面调用 `getStartQuestion()` 获取起始问题。
3. 用户每次作答后调用 `getNextQuestion()`。
4. 若进入推荐节点，或问题结束，则调用 `getRecommendations()`。
5. 在结果页展示推荐方法，点击后跳转 `/methodology/[slug]`。

## 关键状态

页面内部维护以下核心状态：

- `started`：是否开始问答
- `currentQuestion`：当前题目
- `conversationHistory`：问答历史
- `candidateMethods`：候选方法
- `isRecommendation`：是否进入推荐结果页

## 推荐机制（当前版本）

当前为规则驱动 + 模拟延迟：

- 根据选项 `method` 字段可直接命中推荐
- 否则根据上下文作简单规则匹配
- 预留后续接入真实大模型接口

## 与其他模块关系

- 方法论详情页：`/methodology/[slug]`
- 用户记录页：`/user`（查看实践记录）
- 可视化页：`/visualization`（Mermaid 图示）

## 后续可优化项

- 接入真实 LLM 推荐与问题生成
- 增加置信度解释与可追溯推荐依据
- 支持多轮上下文记忆与个性化问答路径
