# Tasks: Next.js to Nuxt Migration

## Phase 1: Project Setup

- [x] 1. 创建 Nuxt 3 项目
  - [x] 1.1 使用 `npx nuxi@latest init` 创建新项目
  - [x] 1.2 配置项目名称和基本设置
  - [x] 1.3 安装依赖包

- [ ] 2. 配置 TypeScript
  - [x] 2.1 确保 `tsconfig.json` 正确配置
  - [x] 2.2 启用严格模式
  - [-] 2.3 配置路径别名 (`~/*`, `@/*`)

- [ ] 3. 配置开发工具
  - [~] 3.1 配置 ESLint
  - [~] 3.2 配置 Prettier
  - [~] 3.3 配置 Git hooks (husky)

- [ ] 4. 设置环境变量
  - [~] 4.1 创建 `.env.example` 文件
  - [~] 4.2 配置 `nuxt.config.ts` 中的 runtimeConfig
  - [~] 4.3 添加 OpenRouter API Key 配置

## Phase 2: Core Infrastructure

- [ ] 5. 迁移类型定义
  - [ ] 5.1 复制 `types/methodology.ts`
  - [ ] 5.2 复制 `types/user.ts`
  - [ ] 5.3 验证类型定义无错误

- [ ] 6. 迁移数据文件
  - [ ] 6.1 复制 `utils/methodology-data.ts`
  - [ ] 6.2 复制 `data/ai-guide-questions.json`
  - [ ] 6.3 验证数据结构完整

- [ ] 7. 迁移工具函数
  - [ ] 7.1 复制 `utils/visualization-utils.ts`
  - [ ] 7.2 调整导入路径为 Nuxt 风格
  - [ ] 7.3 测试工具函数

- [ ] 8. 设置全局样式
  - [ ] 8.1 创建 `assets/styles/global.css`
  - [ ] 8.2 复制原 `globals.css` 内容
  - [ ] 8.3 在 `nuxt.config.ts` 中配置 CSS

- [ ] 9. 配置字体
  - [ ] 9.1 安装 `@nuxtjs/google-fonts` 模块
  - [ ] 9.2 配置 Geist Sans 和 Geist Mono
  - [ ] 9.3 验证字体加载

## Phase 3: Layout and Navigation

- [ ] 10. 创建默认布局
  - [ ] 10.1 创建 `layouts/default.vue`
  - [ ] 10.2 添加基本 HTML 结构
  - [ ] 10.3 配置 SEO meta 标签

- [ ] 11. 迁移 GlobalNav 组件
  - [ ] 11.1 创建 `components/GlobalNav.vue`
  - [ ] 11.2 转换 React 代码为 Vue Composition API
  - [ ] 11.3 使用 `useRoute()` 替代 `usePathname()`
  - [ ] 11.4 使用 `<NuxtLink>` 替代 `<Link>`
  - [ ] 11.5 迁移样式（CSS Modules 或 Scoped）
  - [ ] 11.6 测试导航高亮功能

- [ ] 12. 配置路由结构
  - [ ] 12.1 创建 `pages/` 目录结构
  - [ ] 12.2 验证路由映射正确
  - [ ] 12.3 测试动态路由 `[slug].vue`

## Phase 4: Pages Migration

- [ ] 13. 迁移首页
  - [ ] 13.1 创建 `pages/index.vue`
  - [ ] 13.2 转换 JSX 为 Vue template
  - [ ] 13.3 迁移样式
  - [ ] 13.4 测试页面渲染

- [ ] 14. 迁移 AI 引导页
  - [ ] 14.1 创建 `pages/ai-guide.vue`
  - [ ] 14.2 转换组件逻辑
  - [ ] 14.3 迁移 AI 对话状态管理
  - [ ] 14.4 迁移样式文件
  - [ ] 14.5 测试对话功能

- [ ] 15. 迁移方法论页面
  - [ ] 15.1 创建 `pages/methodology/index.vue`
  - [ ] 15.2 创建 `pages/methodology/all.vue`
  - [ ] 15.3 创建 `pages/methodology/scenarios.vue`
  - [ ] 15.4 创建 `pages/methodology/[slug].vue`
  - [ ] 15.5 测试所有方法论页面

- [ ] 16. 迁移用户中心
  - [ ] 16.1 创建 `pages/user.vue`
  - [ ] 16.2 转换用户数据展示逻辑
  - [ ] 16.3 迁移样式
  - [ ] 16.4 测试历史记录显示

- [ ] 17. 迁移可视化页面
  - [ ] 17.1 创建 `pages/visualization.vue`
  - [ ] 17.2 集成 Mermaid 库
  - [ ] 17.3 测试图表渲染

## Phase 5: Components Migration

- [ ] 18. 迁移 MethodologyGrid 组件
  - [ ] 18.1 创建 `components/MethodologyGrid.vue`
  - [ ] 18.2 转换 props 和 emits
  - [ ] 18.3 使用 `v-for` 替代 `map()`
  - [ ] 18.4 迁移样式
  - [ ] 18.5 测试组件

- [ ] 19. 迁移 MethodologyHeader 组件
  - [ ] 19.1 创建 `components/MethodologyHeader.vue`
  - [ ] 19.2 转换组件逻辑
  - [ ] 19.3 迁移样式
  - [ ] 19.4 测试组件

- [ ] 20. 迁移 MethodologyNav 组件
  - [ ] 20.1 创建 `components/MethodologyNav.vue`
  - [ ] 20.2 转换导航逻辑
  - [ ] 20.3 迁移样式
  - [ ] 20.4 测试组件

- [ ] 21. 迁移 PracticeView 组件
  - [ ] 21.1 创建 `components/PracticeView.vue`
  - [ ] 21.2 使用 `v-model` 实现表单绑定
  - [ ] 21.3 转换问题列表渲染
  - [ ] 21.4 迁移样式
  - [ ] 21.5 测试表单提交

- [ ] 22. 迁移 ScenarioSection 组件
  - [ ] 22.1 创建 `components/ScenarioSection.vue`
  - [ ] 22.2 转换场景选择逻辑
  - [ ] 22.3 迁移样式
  - [ ] 22.4 测试组件

- [ ] 23. 迁移 SearchFilter 组件
  - [ ] 23.1 创建 `components/SearchFilter.vue`
  - [ ] 23.2 实现搜索和筛选逻辑
  - [ ] 23.3 迁移样式
  - [ ] 23.4 测试搜索功能

- [ ] 24. 迁移 VisualizationPanel 组件
  - [ ] 24.1 创建 `components/VisualizationPanel.vue`
  - [ ] 24.2 转换可视化控制逻辑
  - [ ] 24.3 迁移样式
  - [ ] 24.4 测试组件

- [ ] 25. 迁移 MermaidViewer 组件
  - [ ] 25.1 创建 `components/visualization/MermaidViewer.vue`
  - [ ] 25.2 使用 `onMounted` 初始化 Mermaid
  - [ ] 25.3 实现图表渲染逻辑
  - [ ] 25.4 添加错误处理
  - [ ] 25.5 测试图表渲染

## Phase 6: State Management

- [ ] 26. 创建 usePracticeHistory composable
  - [ ] 26.1 创建 `composables/usePracticeHistory.ts`
  - [ ] 26.2 使用 `ref` 和 `onMounted` 管理状态
  - [ ] 26.3 实现 localStorage 读写
  - [ ] 26.4 添加错误处理
  - [ ] 26.5 编写单元测试

- [ ] 27. 创建 useLocalStorage composable
  - [ ] 27.1 创建 `composables/useLocalStorage.ts`
  - [ ] 27.2 实现通用 localStorage 封装
  - [ ] 27.3 添加 SSR 兼容性检查
  - [ ] 27.4 编写单元测试

- [ ] 28. 创建 useMermaid composable
  - [ ] 28.1 创建 `composables/useMermaid.ts`
  - [ ] 28.2 实现 Mermaid 初始化逻辑
  - [ ] 28.3 实现图表渲染方法
  - [ ] 28.4 添加错误处理
  - [ ] 28.5 编写单元测试

- [ ] 29. 创建 useAIChat composable
  - [ ] 29.1 创建 `composables/useAIChat.ts`
  - [ ] 29.2 实现消息管理
  - [ ] 29.3 实现 API 调用逻辑
  - [ ] 29.4 添加加载和错误状态
  - [ ] 29.5 编写单元测试

## Phase 7: API Integration

- [ ] 30. 创建 AI Chat API
  - [ ] 30.1 创建 `server/api/ai/chat.post.ts`
  - [ ] 30.2 集成 OpenRouter API
  - [ ] 30.3 实现请求验证
  - [ ] 30.4 添加错误处理
  - [ ] 30.5 测试 API 端点

- [ ] 31. 配置环境变量
  - [ ] 31.1 在 `nuxt.config.ts` 中配置 runtimeConfig
  - [ ] 31.2 确保 API Key 安全存储
  - [ ] 31.3 测试环境变量读取

- [ ] 32. 实现 API 错误处理
  - [ ] 32.1 创建统一错误处理中间件
  - [ ] 32.2 实现友好的错误消息
  - [ ] 32.3 添加错误日志
  - [ ] 32.4 测试错误场景

## Phase 8: Testing

### Unit Tests

- [ ] 33. 测试 MethodologyGrid 组件
  - [ ] 33.1 测试方法论列表渲染
  - [ ] 33.2 测试点击事件
  - [ ] 33.3 测试 props 传递

- [ ] 34. 测试 PracticeView 组件
  - [ ] 34.1 测试表单渲染
  - [ ] 34.2 测试表单提交
  - [ ] 34.3 测试快速选项

- [ ] 35. 测试 usePracticeHistory composable
  - [ ] 35.1 测试历史记录加载
  - [ ] 35.2 测试添加记录
  - [ ] 35.3 测试删除记录
  - [ ] 35.4 测试 localStorage 持久化

- [ ] 36. 测试 useLocalStorage composable
  - [ ] 36.1 测试数据读取
  - [ ] 36.2 测试数据写入
  - [ ] 36.3 测试 SSR 兼容性

- [ ] 37. 测试 AI Chat API
  - [ ] 37.1 测试有效请求
  - [ ] 37.2 测试无效请求
  - [ ] 37.3 测试错误处理

### Property-Based Tests

- [ ] 38. 编写 Property 1 测试：Route Rendering Consistency
  - [ ] 38.1 为所有路由生成测试用例
  - [ ] 38.2 验证页面核心元素存在
  - [ ] 38.3 运行至少 100 次迭代

- [ ] 39. 编写 Property 5 测试：LocalStorage Round-trip
  - [ ] 39.1 生成随机数据结构
  - [ ] 39.2 验证序列化/反序列化一致性
  - [ ] 39.3 运行至少 100 次迭代

- [ ] 40. 编写 Property 6 测试：Form State Binding
  - [ ] 40.1 生成随机输入值
  - [ ] 40.2 验证双向绑定
  - [ ] 40.3 运行至少 100 次迭代

- [ ] 41. 编写 Property 13 测试：Search Result Relevance
  - [ ] 41.1 生成随机搜索查询
  - [ ] 41.2 验证结果包含查询字符串
  - [ ] 41.3 运行至少 100 次迭代

- [ ] 42. 编写 Property 14 测试：Filter Result Correctness
  - [ ] 42.1 生成随机筛选条件
  - [ ] 42.2 验证结果匹配条件
  - [ ] 42.3 运行至少 100 次迭代

### Integration Tests

- [ ] 43. 测试 AI 引导完整流程
  - [ ] 43.1 测试页面访问
  - [ ] 43.2 测试消息发送
  - [ ] 43.3 测试推荐结果

- [ ] 44. 测试方法论练习流程
  - [ ] 44.1 测试页面访问
  - [ ] 44.2 测试表单填写
  - [ ] 44.3 测试提交和保存

### E2E Tests

- [ ] 45. 测试导航流程
  - [ ] 45.1 测试首页访问
  - [ ] 45.2 测试页面间导航
  - [ ] 45.3 测试动态路由

- [ ] 46. 测试搜索和筛选
  - [ ] 46.1 测试搜索功能
  - [ ] 46.2 测试分类筛选
  - [ ] 46.3 测试标签筛选

- [ ] 47. 测试用户数据持久化
  - [ ] 47.1 测试练习记录保存
  - [ ] 47.2 测试历史记录读取
  - [ ] 47.3 测试数据删除

## Phase 9: Optimization

- [ ] 48. 配置 SSR/SSG
  - [ ] 48.1 确定哪些页面使用 SSR
  - [ ] 48.2 确定哪些页面使用 SSG
  - [ ] 48.3 配置 `nuxt.config.ts`
  - [ ] 48.4 测试渲染模式

- [ ] 49. 优化性能
  - [ ] 49.1 实现代码分割
  - [ ] 49.2 实现懒加载
  - [ ] 49.3 优化图片加载
  - [ ] 49.4 测试性能指标

- [ ] 50. 优化 SEO
  - [ ] 50.1 配置 meta 标签
  - [ ] 50.2 添加结构化数据
  - [ ] 50.3 配置 sitemap
  - [ ] 50.4 测试 SEO 分数

- [ ] 51. 添加错误页面
  - [ ] 51.1 创建 `error.vue`
  - [ ] 51.2 实现 404 页面
  - [ ] 51.3 实现 500 页面
  - [ ] 51.4 测试错误处理

## Phase 10: Documentation and Deployment

- [ ] 52. 编写文档
  - [ ] 52.1 更新 README.md
  - [ ] 52.2 编写迁移指南
  - [ ] 52.3 编写 API 文档
  - [ ] 52.4 编写组件文档

- [ ] 53. 配置部署
  - [ ] 53.1 配置构建脚本
  - [ ] 53.2 配置部署环境
  - [ ] 53.3 测试生产构建
  - [ ] 53.4 配置 CI/CD

- [ ] 54. 数据迁移
  - [ ] 54.1 编写数据迁移脚本
  - [ ] 54.2 测试旧数据兼容性
  - [ ] 54.3 提供迁移指南

- [ ] 55. 最终验证
  - [ ] 55.1 运行所有测试
  - [ ] 55.2 验证所有功能
  - [ ] 55.3 性能测试
  - [ ] 55.4 安全审计

- [ ] 56. 部署到生产
  - [ ] 56.1 部署到测试环境
  - [ ] 56.2 进行 UAT 测试
  - [ ] 56.3 部署到生产环境
  - [ ] 56.4 监控和日志

## Notes

- 每个任务完成后应该进行测试验证
- 遇到问题及时记录和解决
- 保持与原 Next.js 版本的功能对等
- 定期提交代码到版本控制系统
