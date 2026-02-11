# Requirements Document

## Introduction

本文档定义了将 AI 引导式方法论推荐系统从 Next.js (React) 迁移到 Nuxt (Vue) 的完整需求。该系统帮助用户通过 AI 对话和场景选择找到合适的思维方法论，包含 15 种核心方法论、可视化功能和用户学习历史记录。

迁移的核心目标是：
- 保持所有现有功能完整可用
- 保持 UI/UX 设计一致
- 确保类型安全和代码质量
- 提供平滑的迁移路径

## Glossary

- **Next.js**: 基于 React 的全栈框架，使用 App Router 架构
- **Nuxt**: 基于 Vue 的全栈框架，使用文件系统路由
- **Methodology**: 思维方法论，系统中管理的 15 种思考和提问方法
- **AI_Guide**: AI 引导功能，通过对话帮助用户找到合适的方法论
- **Practice_Record**: 用户的练习记录，存储在 localStorage
- **Mermaid**: 用于生成流程图和思维导图的可视化库
- **OpenRouter**: AI API 服务提供商，支持多种 AI 模型
- **Composition_API**: Vue 3 的组合式 API，对应 React Hooks
- **CSS_Modules**: 局部作用域的 CSS 样式方案
- **TypeScript**: 类型安全的 JavaScript 超集

## Requirements

### Requirement 1: 路由系统迁移

**User Story:** 作为开发者，我需要将 Next.js App Router 迁移到 Nuxt 文件系统路由，以便保持所有页面和导航功能正常工作。

#### Acceptance Criteria

1. WHEN 访问首页路径 `/` THEN THE System SHALL 显示与原 Next.js 版本相同的首页内容
2. WHEN 访问 `/ai-guide` 路径 THEN THE System SHALL 显示 AI 引导页面
3. WHEN 访问 `/methodology` 路径 THEN THE System SHALL 显示方法论首页
4. WHEN 访问 `/methodology/all` 路径 THEN THE System SHALL 显示所有方法论列表
5. WHEN 访问 `/methodology/scenarios` 路径 THEN THE System SHALL 显示场景选择页面
6. WHEN 访问 `/methodology/[slug]` 动态路径 THEN THE System SHALL 显示对应方法论的详情页
7. WHEN 访问 `/user` 路径 THEN THE System SHALL 显示用户中心页面
8. WHEN 访问 `/visualization` 路径 THEN THE System SHALL 显示可视化页面
9. WHEN 用户点击导航链接 THEN THE System SHALL 使用 Nuxt 的客户端路由进行页面切换
10. THE System SHALL 保持所有路由的 URL 结构与原系统完全一致

### Requirement 2: 组件系统迁移

**User Story:** 作为开发者，我需要将所有 React 组件转换为 Vue 组件，以便在 Nuxt 中实现相同的 UI 功能。

#### Acceptance Criteria

1. WHEN 迁移 GlobalNav 组件 THEN THE System SHALL 使用 Vue Composition API 实现相同的导航功能
2. WHEN 迁移 MethodologyGrid 组件 THEN THE System SHALL 正确显示方法论卡片网格
3. WHEN 迁移 MethodologyHeader 组件 THEN THE System SHALL 显示方法论详情页头部
4. WHEN 迁移 MethodologyNav 组件 THEN THE System SHALL 实现方法论分类导航
5. WHEN 迁移 PracticeView 组件 THEN THE System SHALL 正确渲染练习表单和问题列表
6. WHEN 迁移 ScenarioSection 组件 THEN THE System SHALL 显示场景选择界面
7. WHEN 迁移 SearchFilter 组件 THEN THE System SHALL 实现搜索和筛选功能
8. WHEN 迁移 VisualizationPanel 组件 THEN THE System SHALL 显示可视化控制面板
9. WHEN 迁移 MermaidViewer 组件 THEN THE System SHALL 正确渲染 Mermaid 图表
10. THE System SHALL 保持所有组件的 props 接口和事件处理逻辑一致

### Requirement 3: 状态管理迁移

**User Story:** 作为开发者，我需要将 React Hooks 转换为 Vue Composables，以便管理组件状态和副作用。

#### Acceptance Criteria

1. WHEN 迁移 usePracticeHistory Hook THEN THE System SHALL 使用 Vue composable 实现相同的历史记录管理
2. WHEN 组件需要访问 localStorage THEN THE System SHALL 使用 Vue 的响应式系统正确读写数据
3. WHEN 组件需要管理表单状态 THEN THE System SHALL 使用 ref 和 reactive 实现双向绑定
4. WHEN 组件需要执行副作用 THEN THE System SHALL 使用 onMounted、onUnmounted 等生命周期钩子
5. THE System SHALL 确保所有状态更新触发正确的 UI 重新渲染

### Requirement 4: API 集成迁移

**User Story:** 作为开发者，我需要将 API 调用逻辑迁移到 Nuxt，以便保持与 OpenRouter AI 服务的集成。

#### Acceptance Criteria

1. WHEN 用户在 AI 引导页面发送消息 THEN THE System SHALL 调用 OpenRouter API 获取 AI 响应
2. WHEN API 调用失败 THEN THE System SHALL 显示友好的错误提示
3. WHEN 使用 Nuxt Server Routes THEN THE System SHALL 将 API 密钥安全地存储在服务端
4. THE System SHALL 使用 Nuxt 的 $fetch 或 useFetch 进行 API 调用
5. THE System SHALL 保持与原系统相同的 API 请求和响应格式

### Requirement 5: 样式系统迁移

**User Story:** 作为开发者，我需要迁移所有 CSS 样式，以便保持 UI 外观完全一致。

#### Acceptance Criteria

1. WHEN 迁移全局样式 THEN THE System SHALL 在 Nuxt 中正确应用 globals.css
2. WHEN 使用 CSS Modules THEN THE System SHALL 为每个组件配置局部作用域样式
3. WHEN 应用字体 THEN THE System SHALL 正确加载 Geist Sans 和 Geist Mono 字体
4. THE System SHALL 保持所有页面和组件的视觉样式与原系统一致
5. THE System SHALL 支持响应式设计和移动端适配

### Requirement 6: 类型系统迁移

**User Story:** 作为开发者，我需要保持 TypeScript 类型定义，以便确保类型安全。

#### Acceptance Criteria

1. WHEN 迁移类型定义 THEN THE System SHALL 保持 methodology.ts 中的所有接口定义
2. WHEN 迁移类型定义 THEN THE System SHALL 保持 user.ts 中的所有接口定义
3. WHEN 在 Vue 组件中使用 TypeScript THEN THE System SHALL 正确推断 props 和 emits 类型
4. WHEN 使用 composables THEN THE System SHALL 提供完整的类型注解
5. THE System SHALL 通过 TypeScript 编译检查，无类型错误

### Requirement 7: 数据管理迁移

**User Story:** 作为开发者，我需要迁移方法论数据和配置，以便系统能访问所有 15 种方法论。

#### Acceptance Criteria

1. WHEN 系统启动 THEN THE System SHALL 正确加载 methodology-data.ts 中的所有方法论数据
2. WHEN 系统启动 THEN THE System SHALL 正确加载 ai-guide-questions.json 配置
3. WHEN 访问方法论数据 THEN THE System SHALL 提供与原系统相同的数据结构
4. THE System SHALL 保持场景和方法论的映射关系
5. THE System SHALL 支持方法论的搜索、筛选和分类功能

### Requirement 8: 可视化功能迁移

**User Story:** 作为用户，我需要可视化功能正常工作，以便生成方法论的流程图和思维导图。

#### Acceptance Criteria

1. WHEN 用户访问支持可视化的方法论 THEN THE System SHALL 显示可视化选项
2. WHEN 用户点击生成图表 THEN THE System SHALL 使用 Mermaid.js 渲染流程图或思维导图
3. WHEN Mermaid 图表渲染完成 THEN THE System SHALL 正确显示在页面中
4. WHEN 用户调整可视化参数 THEN THE System SHALL 实时更新图表
5. THE System SHALL 在客户端正确初始化 Mermaid 库

### Requirement 9: 用户数据持久化迁移

**User Story:** 作为用户，我需要我的练习历史被正确保存和读取，以便追踪学习进度。

#### Acceptance Criteria

1. WHEN 用户完成一次练习 THEN THE System SHALL 将记录保存到 localStorage
2. WHEN 用户访问用户中心 THEN THE System SHALL 从 localStorage 读取历史记录
3. WHEN 用户删除历史记录 THEN THE System SHALL 从 localStorage 中移除对应数据
4. THE System SHALL 保持与原系统相同的数据存储格式
5. THE System SHALL 在服务端渲染时正确处理 localStorage 不可用的情况

### Requirement 10: AI 引导功能迁移

**User Story:** 作为用户，我需要 AI 引导功能正常工作，以便通过对话找到合适的方法论。

#### Acceptance Criteria

1. WHEN 用户进入 AI 引导页面 THEN THE System SHALL 显示欢迎消息和初始问题
2. WHEN 用户输入回答 THEN THE System SHALL 发送到 AI 服务并显示响应
3. WHEN AI 推荐方法论 THEN THE System SHALL 显示方法论卡片和跳转链接
4. WHEN 对话进行中 THEN THE System SHALL 显示加载状态
5. WHEN 对话出错 THEN THE System SHALL 显示错误提示并允许重试
6. THE System SHALL 保持对话历史在会话期间可见

### Requirement 11: 搜索和筛选功能迁移

**User Story:** 作为用户，我需要搜索和筛选功能正常工作，以便快速找到需要的方法论。

#### Acceptance Criteria

1. WHEN 用户输入搜索关键词 THEN THE System SHALL 实时过滤方法论列表
2. WHEN 用户选择分类筛选 THEN THE System SHALL 只显示该分类的方法论
3. WHEN 用户选择难度筛选 THEN THE System SHALL 只显示对应难度的方法论
4. WHEN 用户选择标签筛选 THEN THE System SHALL 显示包含该标签的方法论
5. WHEN 用户清除筛选 THEN THE System SHALL 恢复显示所有方法论

### Requirement 12: 场景选择功能迁移

**User Story:** 作为用户，我需要场景选择功能正常工作，以便根据使用场景找到合适的方法论。

#### Acceptance Criteria

1. WHEN 用户访问场景页面 THEN THE System SHALL 显示所有场景分类（工作、学习、创新、决策）
2. WHEN 用户选择一个场景 THEN THE System SHALL 显示该场景下的具体需求列表
3. WHEN 用户选择具体需求 THEN THE System SHALL 显示推荐的方法论列表
4. WHEN 用户点击方法论 THEN THE System SHALL 跳转到方法论详情页
5. THE System SHALL 保持场景和方法论的映射关系准确

### Requirement 13: 练习功能迁移

**User Story:** 作为用户，我需要练习功能正常工作，以便通过回答问题来实践方法论。

#### Acceptance Criteria

1. WHEN 用户进入方法论详情页 THEN THE System SHALL 显示该方法论的所有问题
2. WHEN 问题包含快速选项 THEN THE System SHALL 显示可点击的选项按钮
3. WHEN 用户输入答案 THEN THE System SHALL 保存到表单状态
4. WHEN 用户点击快速选项 THEN THE System SHALL 自动填充到输入框
5. WHEN 用户提交练习 THEN THE System SHALL 保存完整的练习记录
6. THE System SHALL 支持用户输入上下文标题和描述

### Requirement 14: 构建和部署配置

**User Story:** 作为开发者，我需要配置 Nuxt 项目的构建和部署，以便项目可以正常运行和发布。

#### Acceptance Criteria

1. WHEN 运行开发服务器 THEN THE System SHALL 在本地正确启动并支持热重载
2. WHEN 执行生产构建 THEN THE System SHALL 生成优化的静态资源
3. WHEN 配置环境变量 THEN THE System SHALL 正确读取 .env 文件
4. THE System SHALL 配置 TypeScript、ESLint 和其他开发工具
5. THE System SHALL 提供与原系统相同的 npm scripts

### Requirement 15: 性能和优化

**User Story:** 作为用户，我需要系统性能良好，以便获得流畅的使用体验。

#### Acceptance Criteria

1. WHEN 页面首次加载 THEN THE System SHALL 在 3 秒内完成首屏渲染
2. WHEN 切换页面 THEN THE System SHALL 使用客户端路由实现即时切换
3. WHEN 加载大型组件 THEN THE System SHALL 使用代码分割和懒加载
4. THE System SHALL 使用 Nuxt 的 SSR 或 SSG 优化 SEO
5. THE System SHALL 优化图片和静态资源加载

### Requirement 16: 错误处理和边界情况

**User Story:** 作为用户，我需要系统能优雅地处理错误，以便在出现问题时获得清晰的反馈。

#### Acceptance Criteria

1. WHEN API 调用失败 THEN THE System SHALL 显示友好的错误消息
2. WHEN 用户访问不存在的方法论 THEN THE System SHALL 显示 404 页面
3. WHEN localStorage 不可用 THEN THE System SHALL 降级到内存存储并提示用户
4. WHEN Mermaid 渲染失败 THEN THE System SHALL 显示错误提示而不是崩溃
5. WHEN 网络断开 THEN THE System SHALL 提示用户检查网络连接

### Requirement 17: 可访问性和国际化

**User Story:** 作为用户，我需要系统支持良好的可访问性，以便所有用户都能使用。

#### Acceptance Criteria

1. WHEN 使用键盘导航 THEN THE System SHALL 支持 Tab 键和 Enter 键操作
2. WHEN 使用屏幕阅读器 THEN THE System SHALL 提供适当的 ARIA 标签
3. THE System SHALL 保持中文作为主要语言
4. THE System SHALL 确保颜色对比度符合 WCAG 标准
5. THE System SHALL 为交互元素提供清晰的焦点指示

### Requirement 18: 测试和质量保证

**User Story:** 作为开发者，我需要建立测试体系，以便确保迁移后的代码质量。

#### Acceptance Criteria

1. WHEN 编写组件 THEN THE System SHALL 提供单元测试覆盖核心逻辑
2. WHEN 测试路由 THEN THE System SHALL 验证所有路由正确工作
3. WHEN 测试 API THEN THE System SHALL 模拟 API 响应进行测试
4. THE System SHALL 使用 Vitest 或 Jest 作为测试框架
5. THE System SHALL 确保关键功能有端到端测试覆盖

### Requirement 19: 文档和迁移指南

**User Story:** 作为开发者，我需要完整的文档，以便理解迁移过程和新系统架构。

#### Acceptance Criteria

1. THE System SHALL 提供 README 文档说明项目结构和运行方式
2. THE System SHALL 提供迁移指南说明 React 到 Vue 的主要差异
3. THE System SHALL 提供 API 文档说明所有接口和数据结构
4. THE System SHALL 提供组件文档说明每个组件的用法
5. THE System SHALL 提供故障排查指南

### Requirement 20: 向后兼容性

**User Story:** 作为用户，我需要我的旧数据能在新系统中使用，以便无缝过渡。

#### Acceptance Criteria

1. WHEN 用户从旧系统迁移 THEN THE System SHALL 正确读取旧的 localStorage 数据
2. WHEN 数据格式不兼容 THEN THE System SHALL 提供数据迁移脚本
3. THE System SHALL 保持所有 URL 路径不变，避免破坏外部链接
4. THE System SHALL 保持数据结构向后兼容
5. THE System SHALL 在必要时提供数据格式升级提示
