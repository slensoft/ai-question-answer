# Design Document: Next.js to Nuxt Migration

## Overview

本设计文档描述了将 AI 引导式方法论推荐系统从 Next.js (React) 迁移到 Nuxt (Vue) 的技术方案。迁移将保持所有功能完整性，同时利用 Vue 3 Composition API 和 Nuxt 3 的现代特性。

### Migration Strategy

采用**渐进式迁移**策略：
1. 建立新的 Nuxt 项目结构
2. 逐个迁移页面和组件
3. 保持数据结构和 API 接口不变
4. 确保每个迁移步骤都可测试和验证

### Key Principles

- **功能对等**: 所有功能必须在 Nuxt 中完全实现
- **类型安全**: 保持 TypeScript 的严格类型检查
- **性能优化**: 利用 Nuxt 的 SSR/SSG 能力提升性能
- **代码质量**: 遵循 Vue 3 和 Nuxt 3 的最佳实践

## Architecture

### Project Structure

```
nuxt-app/
├── .nuxt/                    # Nuxt 构建输出（自动生成）
├── assets/                   # 静态资源（CSS、图片等）
│   └── styles/
│       └── global.css        # 全局样式
├── components/               # Vue 组件
│   ├── GlobalNav.vue
│   ├── MethodologyGrid.vue
│   ├── MethodologyHeader.vue
│   ├── MethodologyNav.vue
│   ├── PracticeView.vue
│   ├── ScenarioSection.vue
│   ├── SearchFilter.vue
│   ├── VisualizationPanel.vue
│   └── visualization/
│       └── MermaidViewer.vue
├── composables/              # Vue Composables（对应 React Hooks）
│   ├── usePracticeHistory.ts
│   ├── useLocalStorage.ts
│   └── useMermaid.ts
├── layouts/                  # 布局组件
│   └── default.vue           # 默认布局（包含 GlobalNav）
├── pages/                    # 页面（文件系统路由）
│   ├── index.vue             # 首页
│   ├── ai-guide.vue          # AI 引导页
│   ├── user.vue              # 用户中心
│   ├── visualization.vue     # 可视化页面
│   └── methodology/
│       ├── index.vue         # 方法论首页
│       ├── all.vue           # 所有方法论
│       ├── scenarios.vue     # 场景选择
│       └── [slug].vue        # 方法论详情（动态路由）
├── public/                   # 公共静态文件
│   └── dunning-kruger-effect.png
├── server/                   # 服务端代码
│   └── api/                  # API 路由
│       └── ai/
│           └── chat.post.ts  # AI 聊天 API
├── types/                    # TypeScript 类型定义
│   ├── methodology.ts
│   └── user.ts
├── utils/                    # 工具函数
│   ├── methodology-data.ts
│   └── visualization-utils.ts
├── .env                      # 环境变量
├── nuxt.config.ts            # Nuxt 配置
├── package.json
├── tsconfig.json
└── README.md
```

### Routing Architecture

**Next.js App Router → Nuxt File-based Routing**

| Next.js Path | Nuxt Path | Description |
|-------------|-----------|-------------|
| `app/page.tsx` | `pages/index.vue` | 首页 |
| `app/ai-guide/page.tsx` | `pages/ai-guide.vue` | AI 引导 |
| `app/methodology/page.tsx` | `pages/methodology/index.vue` | 方法论首页 |
| `app/methodology/all/page.tsx` | `pages/methodology/all.vue` | 所有方法论 |
| `app/methodology/scenarios/page.tsx` | `pages/methodology/scenarios.vue` | 场景选择 |
| `app/methodology/[slug]/page.tsx` | `pages/methodology/[slug].vue` | 方法论详情 |
| `app/user/page.tsx` | `pages/user.vue` | 用户中心 |
| `app/visualization/page.tsx` | `pages/visualization.vue` | 可视化 |
| `app/layout.tsx` | `layouts/default.vue` | 全局布局 |

### State Management Architecture

**React Hooks → Vue Composables**

```typescript
// React Hook 示例
function usePracticeHistory() {
  const [history, setHistory] = useState<PracticeRecord[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('practice-history');
    if (stored) setHistory(JSON.parse(stored));
  }, []);
  
  const addRecord = (record: PracticeRecord) => {
    const newHistory = [...history, record];
    setHistory(newHistory);
    localStorage.setItem('practice-history', JSON.stringify(newHistory));
  };
  
  return { history, addRecord };
}

// Vue Composable 等价实现
function usePracticeHistory() {
  const history = ref<PracticeRecord[]>([]);
  
  onMounted(() => {
    const stored = localStorage.getItem('practice-history');
    if (stored) history.value = JSON.parse(stored);
  });
  
  const addRecord = (record: PracticeRecord) => {
    history.value.push(record);
    localStorage.setItem('practice-history', JSON.stringify(history.value));
  };
  
  return { history: readonly(history), addRecord };
}
```

## Components and Interfaces

### Component Migration Mapping

#### 1. GlobalNav Component

**React (Next.js)**:
```tsx
// src/components/GlobalNav.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GlobalNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav>
      <Link href="/" className={isActive('/') ? 'active' : ''}>
        首页
      </Link>
      {/* ... */}
    </nav>
  );
}
```

**Vue (Nuxt)**:
```vue
<!-- components/GlobalNav.vue -->
<script setup lang="ts">
const route = useRoute();
const isActive = (path: string) => route.path === path;
</script>

<template>
  <nav>
    <NuxtLink to="/" :class="{ active: isActive('/') }">
      首页
    </NuxtLink>
    <!-- ... -->
  </nav>
</template>
```

#### 2. MethodologyGrid Component

**Props Interface**:
```typescript
interface MethodologyGridProps {
  methodologies: Methodology[];
  onSelect?: (slug: string) => void;
}
```

**Migration Notes**:
- React: 使用 `onClick` 处理点击
- Vue: 使用 `@click` 和 `defineEmits`
- React: 使用 `map()` 渲染列表
- Vue: 使用 `v-for` 渲染列表

#### 3. PracticeView Component

**State Management**:
```typescript
// React
const [answers, setAnswers] = useState<Record<number, string>>({});
const [context, setContext] = useState('');

// Vue
const answers = ref<Record<number, string>>({});
const context = ref('');
```

**Form Handling**:
- React: 受控组件 + `onChange`
- Vue: `v-model` 双向绑定

#### 4. MermaidViewer Component

**Lifecycle Hooks**:
```typescript
// React
useEffect(() => {
  const loadMermaid = async () => {
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({ /* config */ });
    await mermaid.run();
  };
  loadMermaid();
}, [code]);

// Vue
onMounted(async () => {
  const mermaid = (await import('mermaid')).default;
  mermaid.initialize({ /* config */ });
  await nextTick();
  await mermaid.run();
});
```

### Composables (Hooks Migration)

#### usePracticeHistory

```typescript
// composables/usePracticeHistory.ts
import type { PracticeRecord } from '~/types/methodology';

export function usePracticeHistory() {
  const history = ref<PracticeRecord[]>([]);
  const isLoaded = ref(false);

  // 加载历史记录
  const loadHistory = () => {
    if (process.client) {
      const stored = localStorage.getItem('practice-history');
      if (stored) {
        try {
          history.value = JSON.parse(stored);
        } catch (error) {
          console.error('Failed to parse practice history:', error);
          history.value = [];
        }
      }
      isLoaded.value = true;
    }
  };

  // 添加记录
  const addRecord = (record: PracticeRecord) => {
    history.value.push(record);
    saveHistory();
  };

  // 删除记录
  const deleteRecord = (index: number) => {
    history.value.splice(index, 1);
    saveHistory();
  };

  // 清空历史
  const clearHistory = () => {
    history.value = [];
    saveHistory();
  };

  // 保存到 localStorage
  const saveHistory = () => {
    if (process.client) {
      localStorage.setItem('practice-history', JSON.stringify(history.value));
    }
  };

  // 组件挂载时加载
  onMounted(() => {
    loadHistory();
  });

  return {
    history: readonly(history),
    isLoaded: readonly(isLoaded),
    addRecord,
    deleteRecord,
    clearHistory,
  };
}
```

#### useLocalStorage

```typescript
// composables/useLocalStorage.ts
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue);
  const isLoaded = ref(false);

  const load = () => {
    if (process.client) {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          data.value = JSON.parse(stored);
        } catch {
          data.value = defaultValue;
        }
      }
      isLoaded.value = true;
    }
  };

  const save = () => {
    if (process.client) {
      localStorage.setItem(key, JSON.stringify(data.value));
    }
  };

  // 监听变化自动保存
  watch(data, save, { deep: true });

  onMounted(load);

  return { data, isLoaded };
}
```

#### useMermaid

```typescript
// composables/useMermaid.ts
export function useMermaid() {
  const isReady = ref(false);
  const error = ref<string | null>(null);

  const initialize = async () => {
    try {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis',
        },
      });
      isReady.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load Mermaid';
    }
  };

  const render = async (element: HTMLElement) => {
    if (!isReady.value) {
      await initialize();
    }
    const mermaid = (await import('mermaid')).default;
    await mermaid.run({ nodes: [element] });
  };

  return { isReady, error, initialize, render };
}
```

## Data Models

### Type Definitions

所有类型定义保持不变，直接从 Next.js 项目复制到 Nuxt 项目的 `types/` 目录。

```typescript
// types/methodology.ts
export interface Question {
  text: string;
  quickOptions?: string[];
  placeholder?: string;
}

export interface Methodology {
  name: string;
  category: string;
  description: string;
  scenarios: string[];
  difficulty: string;
  tags: string[];
  questions: (string | Question)[];
  example: string;
  supportsVisualization?: boolean;
}

export interface ScenarioNeed {
  id: string;
  name: string;
  methods: string[];
}

export interface PracticeRecord {
  timestamp: string;
  methodology: string;
  methodologyName: string;
  methodologyCategory: string;
  methodologyDescription: string;
  methodologyTags: string[];
  contextTitle?: string;
  context: string;
  questionAnswers: QuestionAnswer[];
  reflection: string;
}

export interface QuestionAnswer {
  questionNumber: number;
  question: string;
  answer: string;
}

// types/user.ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UserProgress {
  methodologySlug: string;
  completedAt: string;
  practiceCount: number;
}
```

### Data Management

```typescript
// utils/methodology-data.ts
import type { Methodology, ScenarioNeed } from '~/types/methodology';

// 方法论数据（保持不变）
export const methodologies: Record<string, Methodology> = {
  // ... 15 种方法论数据
};

// 场景映射（保持不变）
export const scenarioNeeds: Record<string, ScenarioNeed[]> = {
  // ... 场景数据
};

// 辅助函数
export function getMethodologyBySlug(slug: string): Methodology | undefined {
  return methodologies[slug];
}

export function getAllMethodologies(): Methodology[] {
  return Object.values(methodologies);
}

export function getMethodologiesByCategory(category: string): Methodology[] {
  return getAllMethodologies().filter(m => m.category === category);
}

export function getMethodologiesByScenario(scenario: string): Methodology[] {
  const needs = scenarioNeeds[scenario] || [];
  const methodSlugs = new Set(needs.flatMap(n => n.methods));
  return getAllMethodologies().filter(m => 
    methodSlugs.has(Object.keys(methodologies).find(k => methodologies[k] === m) || '')
  );
}

export function searchMethodologies(query: string): Methodology[] {
  const lowerQuery = query.toLowerCase();
  return getAllMethodologies().filter(m =>
    m.name.toLowerCase().includes(lowerQuery) ||
    m.description.toLowerCase().includes(lowerQuery) ||
    m.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
```

## API Integration

### Server Routes

Nuxt 使用 `server/api/` 目录定义服务端 API 路由。

```typescript
// server/api/ai/chat.post.ts
import { OpenAI } from 'openai';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  
  const { messages, model = 'openai/gpt-3.5-turbo' } = body;
  
  if (!messages || !Array.isArray(messages)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request: messages array required',
    });
  }
  
  try {
    const openai = new OpenAI({
      apiKey: config.openrouterApiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    });
    
    const completion = await openai.chat.completions.create({
      model,
      messages,
    });
    
    return {
      message: completion.choices[0]?.message?.content || '',
      usage: completion.usage,
    };
  } catch (error) {
    console.error('OpenRouter API error:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to get AI response',
    });
  }
});
```

### Client-side API Calls

```typescript
// composables/useAIChat.ts
export function useAIChat() {
  const messages = ref<Array<{ role: string; content: string }>>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const sendMessage = async (content: string) => {
    messages.value.push({ role: 'user', content });
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch('/api/ai/chat', {
        method: 'POST',
        body: {
          messages: messages.value,
        },
      });

      messages.value.push({
        role: 'assistant',
        content: response.message,
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to send message';
      // 移除失败的用户消息
      messages.value.pop();
    } finally {
      isLoading.value = false;
    }
  };

  const clearMessages = () => {
    messages.value = [];
  };

  return {
    messages: readonly(messages),
    isLoading: readonly(isLoading),
    error: readonly(error),
    sendMessage,
    clearMessages,
  };
}
```

## Styling

### Global Styles

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/styles/global.css'],
  // ...
});
```

### CSS Modules

```vue
<!-- components/MethodologyGrid.vue -->
<script setup lang="ts">
// ...
</script>

<template>
  <div :class="$style.grid">
    <!-- ... -->
  </div>
</template>

<style module>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
```

### Scoped Styles

```vue
<style scoped>
.methodology-card {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.methodology-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
```

## Configuration

### Nuxt Config

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss', // 可选：如果使用 Tailwind
  ],
  
  css: ['~/assets/styles/global.css'],
  
  typescript: {
    strict: true,
    typeCheck: true,
  },
  
  runtimeConfig: {
    // 服务端环境变量
    openrouterApiKey: process.env.OPENROUTER_API_KEY,
    
    // 公开环境变量
    public: {
      apiBase: process.env.API_BASE_URL || '',
    },
  },
  
  app: {
    head: {
      title: '提问方法论学习平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '通过实践掌握15种核心提问与思考方法' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  
  // 字体配置
  googleFonts: {
    families: {
      'Geist Sans': true,
      'Geist Mono': true,
    },
  },
});
```

### TypeScript Config

```json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "types": ["@nuxt/types"],
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    }
  }
}
```

### Environment Variables

```bash
# .env
OPENROUTER_API_KEY=your_api_key_here
API_BASE_URL=https://api.example.com
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Route Rendering Consistency

*For any* defined route in the application, when accessed, the system should render a page with the expected core elements (title, navigation, main content area) matching the original Next.js implementation.

**Validates: Requirements 1.1, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8**

### Property 2: Client-side Navigation

*For any* navigation link click, the system should perform client-side routing without full page reload, maintaining application state.

**Validates: Requirements 1.9**

### Property 3: URL Structure Preservation

*For all* routes, the URL structure in Nuxt should exactly match the URL structure in the original Next.js application.

**Validates: Requirements 1.10**

### Property 4: Component Interface Consistency

*For any* migrated component, its props interface and event handling should be functionally equivalent to the original React component.

**Validates: Requirements 2.10**

### Property 5: LocalStorage Round-trip

*For any* data written to localStorage, reading it back should return an equivalent value (serialization/deserialization round-trip).

**Validates: Requirements 3.2, 9.1**

### Property 6: Form State Binding

*For any* form input with v-model binding, changes to the input should immediately update the bound state, and changes to the state should immediately update the input value.

**Validates: Requirements 3.3**

### Property 7: Reactive UI Updates

*For any* state change in a Vue component, the UI should re-render to reflect the new state within the next render cycle.

**Validates: Requirements 3.5**

### Property 8: API Format Compatibility

*For any* API endpoint, the request and response format in Nuxt should match the format used in the original Next.js application.

**Validates: Requirements 4.5**

### Property 9: Visualization Conditional Rendering

*For any* methodology with `supportsVisualization: true`, the system should display visualization options; for methodologies with `supportsVisualization: false` or undefined, no visualization options should be shown.

**Validates: Requirements 8.1**

### Property 10: Visualization Parameter Reactivity

*For any* change to visualization parameters (theme, layout, etc.), the Mermaid chart should update to reflect the new parameters.

**Validates: Requirements 8.4**

### Property 11: Practice Record Persistence

*For any* practice record, saving it to localStorage and then reading the history should include that record with all its data intact.

**Validates: Requirements 9.1, 9.4**

### Property 12: Data Format Backward Compatibility

*For any* data stored by the original Next.js application in localStorage, the Nuxt application should be able to read and correctly parse that data.

**Validates: Requirements 9.4, 20.1**

### Property 13: Search Result Relevance

*For any* search query, all returned methodology results should contain the query string in their name, description, or tags (case-insensitive).

**Validates: Requirements 11.1**

### Property 14: Filter Result Correctness

*For any* filter criteria (category, difficulty, tag), all returned methodologies should match the selected criteria.

**Validates: Requirements 11.2, 11.3, 11.4**

## Error Handling

### Client-side Error Handling

#### 1. API Errors

```typescript
// composables/useAIChat.ts
export function useAIChat() {
  const error = ref<string | null>(null);
  
  const sendMessage = async (content: string) => {
    try {
      const response = await $fetch('/api/ai/chat', {
        method: 'POST',
        body: { messages: [...] },
      });
      // 处理成功响应
    } catch (err) {
      // 友好的错误消息
      if (err.statusCode === 429) {
        error.value = 'API 调用频率过高，请稍后再试';
      } else if (err.statusCode === 401) {
        error.value = 'API 密钥无效，请联系管理员';
      } else {
        error.value = 'AI 服务暂时不可用，请稍后再试';
      }
      
      // 记录详细错误用于调试
      console.error('AI API Error:', err);
    }
  };
  
  return { error, sendMessage };
}
```

#### 2. LocalStorage Errors

```typescript
// composables/useLocalStorage.ts
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue);
  const error = ref<string | null>(null);
  
  const load = () => {
    if (!process.client) return;
    
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        data.value = JSON.parse(stored);
      }
    } catch (err) {
      error.value = '无法读取本地数据，将使用默认值';
      console.error('LocalStorage read error:', err);
      data.value = defaultValue;
    }
  };
  
  const save = () => {
    if (!process.client) return;
    
    try {
      localStorage.setItem(key, JSON.stringify(data.value));
    } catch (err) {
      if (err.name === 'QuotaExceededError') {
        error.value = '存储空间已满，请清理部分历史记录';
      } else {
        error.value = '无法保存数据到本地';
      }
      console.error('LocalStorage write error:', err);
    }
  };
  
  return { data, error, load, save };
}
```

#### 3. Mermaid Rendering Errors

```vue
<!-- components/visualization/MermaidViewer.vue -->
<script setup lang="ts">
const error = ref<string | null>(null);

const renderMermaid = async () => {
  try {
    const mermaid = (await import('mermaid')).default;
    await mermaid.run();
  } catch (err) {
    error.value = '图表渲染失败，请检查图表代码';
    console.error('Mermaid render error:', err);
  }
};
</script>

<template>
  <div v-if="error" class="error-message">
    ❌ {{ error }}
    <details>
      <summary>查看代码</summary>
      <pre>{{ code }}</pre>
    </details>
  </div>
  <div v-else class="mermaid">{{ code }}</div>
</template>
```

### Server-side Error Handling

```typescript
// server/api/ai/chat.post.ts
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    // 验证请求
    if (!body.messages || !Array.isArray(body.messages)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid request: messages array required',
      });
    }
    
    // 调用 OpenRouter API
    const response = await callOpenRouterAPI(body);
    return response;
    
  } catch (error) {
    // 记录错误
    console.error('API Error:', error);
    
    // 返回友好的错误响应
    if (error.statusCode) {
      throw error; // 已经是 H3 Error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to process AI request',
    });
  }
});
```

### Error Boundaries

```vue
<!-- layouts/default.vue -->
<script setup lang="ts">
const error = useError();

const handleError = (err: Error) => {
  console.error('Application error:', err);
  // 可以发送到错误追踪服务（如 Sentry）
};

onErrorCaptured((err) => {
  handleError(err);
  return false; // 阻止错误继续传播
});
</script>

<template>
  <div>
    <GlobalNav />
    <main>
      <slot />
    </main>
    
    <!-- 全局错误提示 -->
    <div v-if="error" class="global-error">
      <p>抱歉，出现了一些问题</p>
      <button @click="clearError()">刷新页面</button>
    </div>
  </div>
</template>
```

### 404 Error Page

```vue
<!-- error.vue -->
<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number;
    statusMessage: string;
    message: string;
  };
}>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.statusMessage }}</p>
    <p>{{ error.message }}</p>
    <button @click="handleError">返回首页</button>
  </div>
</template>
```

## Testing Strategy

### Dual Testing Approach

本项目采用**单元测试**和**属性测试**相结合的策略：

- **单元测试**: 验证具体的功能实现、边界情况和错误处理
- **属性测试**: 验证系统的通用属性和不变量

两者互补，共同确保代码质量和功能正确性。

### Testing Framework

使用 **Vitest** 作为测试框架（Nuxt 3 官方推荐）：

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Unit Testing

#### Component Tests

```typescript
// components/__tests__/MethodologyGrid.spec.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MethodologyGrid from '../MethodologyGrid.vue';
import { methodologies } from '~/utils/methodology-data';

describe('MethodologyGrid', () => {
  it('renders all methodologies', () => {
    const wrapper = mount(MethodologyGrid, {
      props: {
        methodologies: Object.values(methodologies),
      },
    });
    
    expect(wrapper.findAll('.methodology-card')).toHaveLength(15);
  });
  
  it('emits select event when card is clicked', async () => {
    const wrapper = mount(MethodologyGrid, {
      props: {
        methodologies: Object.values(methodologies).slice(0, 1),
      },
    });
    
    await wrapper.find('.methodology-card').trigger('click');
    expect(wrapper.emitted('select')).toBeTruthy();
  });
  
  it('displays methodology name and description', () => {
    const testMethodology = Object.values(methodologies)[0];
    const wrapper = mount(MethodologyGrid, {
      props: {
        methodologies: [testMethodology],
      },
    });
    
    expect(wrapper.text()).toContain(testMethodology.name);
    expect(wrapper.text()).toContain(testMethodology.description);
  });
});
```

#### Composable Tests

```typescript
// composables/__tests__/usePracticeHistory.spec.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { usePracticeHistory } from '../usePracticeHistory';

describe('usePracticeHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  it('loads history from localStorage', () => {
    const mockHistory = [{ /* mock data */ }];
    localStorage.setItem('practice-history', JSON.stringify(mockHistory));
    
    const { history } = usePracticeHistory();
    expect(history.value).toEqual(mockHistory);
  });
  
  it('adds new record to history', () => {
    const { history, addRecord } = usePracticeHistory();
    const newRecord = { /* mock data */ };
    
    addRecord(newRecord);
    expect(history.value).toContain(newRecord);
  });
  
  it('persists history to localStorage', () => {
    const { addRecord } = usePracticeHistory();
    const newRecord = { /* mock data */ };
    
    addRecord(newRecord);
    const stored = JSON.parse(localStorage.getItem('practice-history') || '[]');
    expect(stored).toContain(newRecord);
  });
});
```

#### API Tests

```typescript
// server/api/__tests__/ai-chat.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { eventHandler } from 'h3';

describe('AI Chat API', () => {
  it('returns AI response for valid request', async () => {
    const mockRequest = {
      messages: [{ role: 'user', content: 'Hello' }],
    };
    
    // Mock OpenRouter API
    vi.mock('openai', () => ({
      OpenAI: vi.fn(() => ({
        chat: {
          completions: {
            create: vi.fn(() => ({
              choices: [{ message: { content: 'Hi there!' } }],
            })),
          },
        },
      })),
    }));
    
    const response = await $fetch('/api/ai/chat', {
      method: 'POST',
      body: mockRequest,
    });
    
    expect(response.message).toBe('Hi there!');
  });
  
  it('returns 400 for invalid request', async () => {
    await expect(
      $fetch('/api/ai/chat', {
        method: 'POST',
        body: {},
      })
    ).rejects.toThrow('Bad Request');
  });
});
```

### Property-Based Testing

使用 **fast-check** 库进行属性测试（每个测试至少 100 次迭代）：

```typescript
// utils/__tests__/methodology-data.property.spec.ts
import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { searchMethodologies } from '../methodology-data';

describe('Methodology Data Properties', () => {
  /**
   * Feature: next-to-nuxt-migration, Property 13: Search Result Relevance
   * For any search query, all returned methodology results should contain 
   * the query string in their name, description, or tags (case-insensitive).
   */
  it('search results always contain query string', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 }),
        (query) => {
          const results = searchMethodologies(query);
          const lowerQuery = query.toLowerCase();
          
          return results.every(m =>
            m.name.toLowerCase().includes(lowerQuery) ||
            m.description.toLowerCase().includes(lowerQuery) ||
            m.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

```typescript
// composables/__tests__/useLocalStorage.property.spec.ts
import { describe, it, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { useLocalStorage } from '../useLocalStorage';

describe('LocalStorage Properties', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  /**
   * Feature: next-to-nuxt-migration, Property 5: LocalStorage Round-trip
   * For any data written to localStorage, reading it back should return 
   * an equivalent value (serialization/deserialization round-trip).
   */
  it('localStorage round-trip preserves data', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          name: fc.string(),
          count: fc.integer(),
          tags: fc.array(fc.string()),
        }),
        (data) => {
          const { data: stored, load, save } = useLocalStorage('test-key', data);
          stored.value = data;
          save();
          
          const { data: loaded } = useLocalStorage('test-key', {});
          load();
          
          return JSON.stringify(loaded.value) === JSON.stringify(data);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

```typescript
// components/__tests__/form-binding.property.spec.ts
import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { mount } from '@vue/test-utils';
import PracticeView from '../PracticeView.vue';

describe('Form Binding Properties', () => {
  /**
   * Feature: next-to-nuxt-migration, Property 6: Form State Binding
   * For any form input with v-model binding, changes to the input should 
   * immediately update the bound state, and changes to the state should 
   * immediately update the input value.
   */
  it('form input binding is bidirectional', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        async (inputValue) => {
          const wrapper = mount(PracticeView);
          const input = wrapper.find('input[type="text"]');
          
          // Test input -> state
          await input.setValue(inputValue);
          expect(wrapper.vm.formData.value).toBe(inputValue);
          
          // Test state -> input
          wrapper.vm.formData.value = inputValue + '_modified';
          await wrapper.vm.$nextTick();
          expect(input.element.value).toBe(inputValue + '_modified');
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

```typescript
// tests/integration/ai-guide-flow.spec.ts
import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';

describe('AI Guide Flow', () => {
  await setup({
    // Nuxt 配置
  });
  
  it('completes full AI guide conversation', async () => {
    // 1. 访问 AI 引导页面
    const page = await $fetch('/ai-guide');
    expect(page).toContain('开始提问');
    
    // 2. 发送消息
    const response = await $fetch('/api/ai/chat', {
      method: 'POST',
      body: {
        messages: [{ role: 'user', content: '我想分析问题' }],
      },
    });
    expect(response.message).toBeTruthy();
    
    // 3. 获取推荐
    // ... 继续测试流程
  });
});
```

### E2E Testing

使用 **Playwright** 进行端到端测试：

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate through all pages', async ({ page }) => {
  // 访问首页
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('提问方法论学习平台');
  
  // 点击 AI 引导
  await page.click('text=AI 智能引导');
  await expect(page).toHaveURL('/ai-guide');
  
  // 点击方法论
  await page.click('text=浏览方法论');
  await expect(page).toHaveURL('/methodology/all');
  
  // 点击具体方法论
  await page.click('.methodology-card:first-child');
  await expect(page).toHaveURL(/\/methodology\/.+/);
});
```

### Test Coverage Goals

- **单元测试覆盖率**: 至少 80%
- **关键路径覆盖**: 100%（AI 引导、练习提交、数据持久化）
- **属性测试**: 所有 Correctness Properties 都有对应的属性测试
- **E2E 测试**: 覆盖主要用户流程

### Continuous Integration

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run property tests
        run: npm run test:property
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Testing Best Practices

1. **单元测试**: 专注于具体功能和边界情况
2. **属性测试**: 验证通用规则和不变量，使用随机生成的输入
3. **集成测试**: 测试组件和 API 的协作
4. **E2E 测试**: 验证完整的用户流程
5. **测试隔离**: 每个测试独立运行，不依赖其他测试
6. **Mock 外部依赖**: 使用 mock 隔离外部 API 和服务
7. **快速反馈**: 单元测试应该快速运行（< 1 秒）
8. **可读性**: 测试代码应该清晰易懂，作为文档使用

## Migration Checklist

### Phase 1: Project Setup
- [ ] 创建 Nuxt 3 项目
- [ ] 配置 TypeScript
- [ ] 配置 ESLint 和 Prettier
- [ ] 设置 Git 仓库
- [ ] 配置环境变量

### Phase 2: Core Infrastructure
- [ ] 迁移类型定义
- [ ] 迁移数据文件
- [ ] 迁移工具函数
- [ ] 设置全局样式
- [ ] 配置字体

### Phase 3: Layout and Navigation
- [ ] 创建默认布局
- [ ] 迁移 GlobalNav 组件
- [ ] 配置路由结构
- [ ] 测试导航功能

### Phase 4: Pages Migration
- [ ] 迁移首页
- [ ] 迁移 AI 引导页
- [ ] 迁移方法论页面
- [ ] 迁移用户中心
- [ ] 迁移可视化页面

### Phase 5: Components Migration
- [ ] 迁移展示组件
- [ ] 迁移表单组件
- [ ] 迁移可视化组件
- [ ] 测试组件功能

### Phase 6: State Management
- [ ] 创建 composables
- [ ] 迁移 localStorage 逻辑
- [ ] 测试状态管理

### Phase 7: API Integration
- [ ] 创建 server routes
- [ ] 配置 OpenRouter API
- [ ] 测试 API 调用
- [ ] 实现错误处理

### Phase 8: Testing
- [ ] 编写单元测试
- [ ] 编写属性测试
- [ ] 编写集成测试
- [ ] 编写 E2E 测试

### Phase 9: Optimization
- [ ] 配置 SSR/SSG
- [ ] 优化性能
- [ ] 优化 SEO
- [ ] 测试性能指标

### Phase 10: Deployment
- [ ] 配置部署环境
- [ ] 测试生产构建
- [ ] 部署到生产环境
- [ ] 监控和日志

## Conclusion

本设计文档提供了从 Next.js 迁移到 Nuxt 的完整技术方案。通过遵循本文档的架构设计、组件映射和测试策略，可以确保迁移后的系统保持功能完整性、类型安全和高代码质量。

关键成功因素：
1. 保持数据结构和 API 接口不变
2. 使用 Vue Composition API 实现与 React Hooks 等价的功能
3. 充分利用 Nuxt 3 的现代特性（SSR、文件系统路由、自动导入）
4. 建立完善的测试体系（单元测试 + 属性测试）
5. 渐进式迁移，每个步骤都可验证
