# AI 引导式方法论推荐系统

基于 Next.js 的 AI 引导式方法论推荐系统，集成了 OpenRouter API，提供智能的方法论推荐和可视化功能。

## ✨ 主要功能

- 🤖 **AI 引导推荐** - 智能推荐适合的问题解决方法论
- 📊 **Mermaid 可视化** - AI 生成流程图和思维导图
- 🎯 **方法论库** - 丰富的方法论数据库
- 💬 **智能对话** - 基于 OpenRouter 的多模型支持

## 🚀 快速开始

### 方式一：命令行测试（推荐）

```bash
# 1. 配置 API Key
cp .env.example .env
# 编辑 .env 文件，填入你的 OpenRouter API Key

# 2. 测试 API（真实调用）
npm run test:openrouter

# 3. 启动项目
npm run dev
```

### 方式二：使用脚本

```bash
# 一键启动（包含 API 测试）
./test-openrouter.sh
```

### 方式三：手动配置

```bash
npm install
cp .env.example .env
# 编辑 .env 文件
npm run dev
```

获取 API Key：访问 [OpenRouter](https://openrouter.ai/)

## 📚 文档

### 快速开始
- [快速开始.md](快速开始.md) - 最快上手方式
- [OPENROUTER_SETUP.md](OPENROUTER_SETUP.md) - 配置指南
- [整理完成清单.md](整理完成清单.md) - 整理工作说明

### 详细文档
- [OPENROUTER_INDEX.md](OPENROUTER_INDEX.md) - 文档索引
- [OPENROUTER_FILES.md](OPENROUTER_FILES.md) - 文件结构
- [可视化功能使用说明](doc/可视化功能使用说明.md) - Mermaid 可视化
- [AI 引导功能说明](doc/AI引导功能实现说明.md) - AI 引导推荐

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **AI**: OpenRouter API (支持多种免费模型)
- **可视化**: Mermaid.js
- **样式**: CSS Modules
- **TypeScript**: 类型安全

## 📖 OpenRouter 免费模型

项目默认使用免费模型，无需付费：

- **Llama 3.3 70B** (推荐)
- **Qwen 2.5 7B** (中文友好)
- **Gemini 2.0 Flash**
- **Mistral 7B**

详见 [OPENROUTER_SETUP.md](OPENROUTER_SETUP.md)

## 🔧 开发

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 生产模式
npm start

# 代码检查
npm run lint
```

## 📝 License

MIT
