# 2026-02-14 Supabase 学习记录

## 背景
学习 Supabase 作为后端服务平台，探索其在产品开发中的应用场景和最佳实践。

Supabase 是一个开源的 Firebase 替代方案，提供：
- PostgreSQL 数据库
- 实时订阅功能
- 身份认证系统
- 存储服务
- Edge Functions

---

## 学习问题与思考


### 问题 1: Supabase 有哪些核心功能？

**回答：**

根据 [Supabase 官方文档](https://supabase.com/docs/guides/getting-started/features)，Supabase 提供以下核心功能模块：

#### 1. 数据库 (Database)
- **Postgres 数据库**：每个项目都是完整的 PostgreSQL 数据库
- **向量数据库**：支持存储向量嵌入，适合 AI 应用
- **自动生成 REST API**：通过 PostgREST 自动生成，无需编写代码
- **自动生成 GraphQL API**：通过 pg_graphql 扩展提供
- **数据库 Webhooks**：数据变化时触发外部服务
- **加密与密钥管理**：Supabase Vault 扩展
- **数据复制**：自动复制到数据仓库等外部目标

#### 2. 平台功能 (Platform)
- **数据库备份**：每日自动备份，可升级到时间点恢复
- **自定义域名**：白标化 API
- **网络限制**：IP 范围访问控制
- **SSL 强制**：强制客户端使用 SSL 连接
- **分支功能**：测试和预览变更
- **Terraform 支持**：基础设施即代码
- **只读副本**：多区域部署，降低延迟
- **日志导出**：导出到第三方工具

#### 3. 实时功能 (Realtime)
- **Postgres Changes**：通过 WebSocket 接收数据库变化
- **Broadcast**：用户间消息广播
- **Presence**：同步共享状态（在线状态、输入指示器等）

#### 4. 身份认证 (Auth)
- **邮箱登录**
- **社交登录**：支持 Apple、GitHub、Slack 等
- **手机登录**：通过第三方 SMS 提供商
- **无密码登录**：魔法链接
- **行级安全 (RLS)**：通过 Postgres 策略控制数据访问
- **CAPTCHA 保护**
- **服务端认证**：支持 Next.js、SvelteKit、Remix 等框架
- **SAML SSO**

#### 5. 存储 (Storage)
- **文件存储**：简单的文件存储和服务
- **CDN**：缓存大文件
- **智能 CDN**：边缘自动重新验证
- **图片转换**：实时转换图片
- **可恢复上传**：支持大文件上传
- **S3 兼容**：支持 S3 协议工具

#### 6. Edge Functions
- **Deno Edge Functions**：全球分布的 TypeScript 函数
- **区域调用**：在靠近数据库的区域执行
- **NPM 兼容**：原生支持 NPM 模块

#### 7. 开发工具
- **CLI**：本地开发和部署
- **Management API**：编程式管理项目
- **客户端库**：JavaScript、Flutter、Swift、Python

---

**引发思考的问题：**

1. **架构思考**：Supabase 将这么多功能集成在一起，相比于自己组合多个独立服务（如 AWS RDS + Auth0 + S3），在什么场景下更有优势？什么场景下可能不适合？

2. **数据安全**：行级安全 (RLS) 是 Supabase 的核心特性，它如何改变传统的后端权限控制思路？在什么情况下 RLS 可能不够用？

3. **实时功能的应用**：Realtime 的三种模式（Postgres Changes、Broadcast、Presence）分别适合什么样的业务场景？如何选择？

4. **成本与规模**：对于一个初创项目，从 Supabase 开始是否是最优选择？随着项目规模增长，迁移成本如何？

5. **自托管 vs 云服务**：文档中标注了哪些功能支持自托管，这对技术选型有什么影响？什么情况下应该考虑自托管？

6. **功能成熟度**：不同功能处于不同阶段（Alpha、Beta、GA），如何评估在生产环境中使用这些功能的风险？

7. **Edge Functions vs 传统后端**：Edge Functions 适合处理什么样的业务逻辑？什么情况下还是需要传统的后端服务？

