# 提问方法论学习平台 - Next.js 版本

## 项目结构

```
src/
├── app/
│   ├── methodology/
│   │   ├── page.tsx              # 方法论主页面
│   │   └── methodology.css       # 方法论样式
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   └── globals.css               # 全局样式
├── components/
│   ├── SearchFilter.tsx          # 搜索筛选组件
│   ├── MethodologyGrid.tsx       # 方法论网格组件
│   ├── ScenarioSection.tsx       # 场景选择组件
│   ├── DecisionTree.tsx          # 决策树组件
│   └── PracticeView.tsx          # 实践视图组件
├── hooks/
│   └── usePracticeHistory.ts     # 历史记录 Hook
└── lib/
    └── methodology-data.ts       # 方法论数据
```

## 技术栈

- **Next.js 14+** - React 框架
- **TypeScript** - 类型安全
- **React Hooks** - 状态管理
- **CSS Modules** - 样式隔离
- **localStorage** - 数据持久化

## 功能特点

### 1. 服务端渲染 (SSR)
- 首页使用 SSR，提升 SEO
- 方法论页面使用客户端渲染，支持交互

### 2. 组件化架构
- 每个功能模块独立组件
- 可复用、易维护
- TypeScript 类型安全

### 3. 自定义 Hooks
- `usePracticeHistory` - 管理学习记录
- 自动同步 localStorage
- 支持导出功能

### 4. 响应式设计
- 移动端优先
- 自适应布局
- 触摸友好

## 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
npm start
```

## 路由说明

- `/` - 首页，介绍和导航
- `/methodology` - 方法论学习平台主页面

## 组件说明

### SearchFilter
搜索和筛选组件
- 实时搜索
- 按类别筛选
- 响应式设计

### MethodologyGrid
方法论网格展示
- 卡片式布局
- 悬停效果
- 点击进入实践

### ScenarioSection
场景选择组件
- 4大场景分类
- 模态框选择具体需求
- 智能推荐方法论

### DecisionTree
决策树引导
- 问答式导航
- 智能推荐
- 可重置

### PracticeView
实践视图
- 动态问答系统
- 每个问题独立输入
- 自动保存记录
- 历史记录展示

## 数据结构

### Methodology
```typescript
interface Methodology {
  name: string;
  category: string;
  description: string;
  scenarios: string[];
  difficulty: string;
  tags: string[];
  questions: string[];
  example: string;
}
```

### PracticeRecord
```typescript
interface PracticeRecord {
  timestamp: string;
  methodology: string;
  methodologyName: string;
  methodologyCategory: string;
  methodologyDescription: string;
  methodologyTags: string[];
  context: string;
  questionAnswers: QuestionAnswer[];
  reflection: string;
}
```

## 样式说明

### CSS 组织
- `globals.css` - 全局样式和 Tailwind
- `methodology.css` - 方法论页面专用样式
- 组件内联样式 - 特定组件样式

### 主题色
- 主色：#667eea (紫蓝色)
- 辅色：#764ba2 (紫色)
- 成功：#4caf50 (绿色)
- 警告：#ff9800 (橙色)

## 状态管理

### 本地状态
- `useState` - 组件内状态
- `useEffect` - 副作用处理

### 持久化
- localStorage - 浏览器存储
- 自动同步
- JSON 格式

## 性能优化

### 代码分割
- 动态导入组件
- 按需加载

### 图片优化
- Next.js Image 组件
- 自动优化

### 缓存策略
- 静态资源缓存
- API 路由缓存

## 部署

### Vercel (推荐)
```bash
vercel
```

### 其他平台
```bash
npm run build
# 部署 .next 文件夹
```

## 环境变量

目前不需要环境变量，所有数据存储在客户端。

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动端浏览器

## 开发建议

### 添加新方法论
编辑 `src/lib/methodology-data.ts`：
```typescript
'新方法': {
  name: '方法名称',
  category: '类别',
  description: '描述',
  scenarios: ['work'],
  difficulty: '⭐⭐',
  tags: ['标签1', '标签2'],
  questions: ['问题1', '问题2'],
  example: '示例'
}
```

### 修改样式
编辑 `src/app/methodology/methodology.css`

### 添加新组件
1. 在 `src/components/` 创建组件
2. 导出组件
3. 在页面中导入使用

## 常见问题

### Q: 如何清除历史记录？
A: 打开浏览器开发者工具，清除 localStorage 中的 `methodologyPractice` 键。

### Q: 如何导出数据？
A: 在实践页面点击"下载完整记录"按钮。

### Q: 支持服务端存储吗？
A: 当前版本使用 localStorage，可以扩展为 API + 数据库。

## 下一步计划

- [ ] 添加用户认证
- [ ] 服务端数据存储
- [ ] 数据统计分析
- [ ] 社交分享功能
- [ ] 多语言支持
- [ ] PWA 支持

## 许可证

MIT License
