# 需求文档

## 介绍

AI 多角色辩论系统通过模拟不同立场的 AI 角色进行结构化辩论，帮助用户突破个人认知局限，激发慢思考能力，从而在重要决策中做出更理性、全面的判断。

系统基于双系统理论、苏格拉底式提问法、认知盲区理论和多视角思维模型，通过 AI 扮演多个角色从不同视角审视问题，引导用户进行深度思考。

## 术语表

- **System**: AI 多角色辩论系统
- **User**: 使用系统进行决策思考的用户
- **Debate_Session**: 一次完整的辩论会话，包含问题澄清到决策支持的全流程
- **AI_Role**: 系统中预设的具有特定立场和思维方式的 AI 角色
- **Debate_Round**: 辩论过程中的一轮发言，包括所有角色的观点陈述和用户回应
- **Question_Type**: 苏格拉底式提问的六种类型（澄清、假设、证据、视角、后果、元问题）
- **Cognitive_Bias**: 认知偏差，如确认偏误、锚定效应等
- **Decision_Framework**: 决策框架，如决策矩阵、风险分析等结构化思维工具
- **Debate_Stage**: 辩论的五个阶段之一（问题澄清、初始观点、多角色辩论、观点总结、决策支持）

## 需求

### 需求 1: 多角色系统

**用户故事:** 作为用户，我希望系统提供多个不同立场的 AI 角色，以便从多个视角审视我的决策问题。

#### 验收标准

1. THE System SHALL 提供至少 6 个预设 AI 角色，每个角色具有独特的立场和思维方式
2. THE System SHALL 为每个 AI_Role 定义清晰的立场描述、提问方向和价值定位
3. THE System SHALL 确保 AI_Role 包括以下角色：保守派、激进派、实用主义者、理想主义者、批判性思考者、系统思考者
4. WHEN User 开始 Debate_Session 时，THE System SHALL 允许 User 选择参与辩论的 AI_Role
5. WHEN AI_Role 发言时，THE System SHALL 保持该角色的立场一致性，不与其他角色混淆

### 需求 2: 问题澄清阶段

**用户故事:** 作为用户，我希望系统帮助我明确决策问题的背景和目标，以便进行更有针对性的思考。

#### 验收标准

1. WHEN User 输入决策问题时，THE System SHALL 引导 User 明确问题背景、目标和约束条件
2. THE System SHALL 使用澄清性 Question_Type 帮助 User 精确表达问题
3. WHEN 问题澄清完成时，THE System SHALL 生成清晰的问题陈述供 User 确认
4. THE System SHALL 记录问题背景、目标和约束条件供后续阶段使用

### 需求 3: 初始观点收集

**用户故事:** 作为用户，我希望系统记录我的初始想法，以便在辩论过程中对比我的观点变化。

#### 验收标准

1. WHEN User 进入初始观点阶段时，THE System SHALL 引导 User 陈述初步想法和理由
2. THE System SHALL 记录 User 的初始立场、支持理由和关键假设
3. THE System SHALL 在后续阶段中保留初始观点的记录供对比

### 需求 4: 多角色辩论流程

**用户故事:** 作为用户，我希望不同角色依次发言并提出问题，以便从多个视角深入思考问题。

#### 验收标准

1. WHEN 进入多角色辩论阶段时，THE System SHALL 按照预定顺序让每个 AI_Role 依次发言
2. WHEN AI_Role 发言时，THE System SHALL 包含该角色的观点陈述、对其他角色的回应和向 User 提出的问题
3. THE System SHALL 在每个 Debate_Round 中让所有选定的 AI_Role 至少发言一次
4. WHEN User 回答问题时，THE System SHALL 记录回答内容供后续轮次使用
5. THE System SHALL 支持至少 5 个 Debate_Round
6. WHEN User 请求某个 AI_Role 深入阐述时，THE System SHALL 让该角色提供更详细的分析
7. WHEN User 引入新信息时，THE System SHALL 让各 AI_Role 基于新信息更新观点

### 需求 5: 苏格拉底式提问

**用户故事:** 作为用户，我希望系统提出高质量的问题，以便深化我的思考深度。

#### 验收标准

1. THE System SHALL 使用六种 Question_Type：澄清性问题、探究假设的问题、探究证据和理由的问题、探究观点和视角的问题、探究影响和后果的问题、关于问题本身的问题
2. WHEN AI_Role 提问时，THE System SHALL 确保问题符合对应的 Question_Type 特征
3. THE System SHALL 避免引导性问题，保持中立立场
4. WHEN 生成问题时，THE System SHALL 确保问题具有深度，能够触及问题本质
5. THE System SHALL 在每个 Debate_Round 中使用至少 3 种不同的 Question_Type

### 需求 6: 观点总结

**用户故事:** 作为用户，我希望系统整理各方观点，以便清晰地看到不同视角的分析结果。

#### 验收标准

1. WHEN 辩论轮次完成时，THE System SHALL 整理所有 AI_Role 的核心观点
2. THE System SHALL 对比不同视角的分析，识别共识点和分歧点
3. THE System SHALL 将观点总结按照角色分类展示
4. THE System SHALL 突出显示各角色之间的主要争议点

### 需求 7: 决策支持

**用户故事:** 作为用户，我希望系统提供决策框架和分析，以便做出更理性的决策。

#### 验收标准

1. WHEN 进入决策支持阶段时，THE System SHALL 提供至少一种 Decision_Framework
2. THE System SHALL 基于辩论内容生成风险分析
3. THE System SHALL 基于辩论内容生成机会评估
4. THE System SHALL 提供行动建议但不做最终决策
5. THE System SHALL 在决策支持中引用辩论过程中的关键观点

### 需求 8: 认知偏差识别

**用户故事:** 作为用户，我希望系统识别我的认知偏差，以便提高决策质量。

#### 验收标准

1. WHEN User 表达观点时，THE System SHALL 检测常见的 Cognitive_Bias，包括确认偏误、锚定效应、邓宁-克鲁格效应
2. WHEN 检测到 Cognitive_Bias 时，THE System SHALL 适时提醒 User 注意该偏差
3. WHEN 提醒 Cognitive_Bias 时，THE System SHALL 提供去偏差的思考方法
4. THE System SHALL 避免过度频繁的偏差提醒，以免干扰辩论流程

### 需求 9: 辩论历史记录

**用户故事:** 作为用户，我希望系统保存辩论过程，以便回顾和反思我的决策演变。

#### 验收标准

1. THE System SHALL 保存每个 Debate_Session 的完整记录
2. THE System SHALL 记录每个 Debate_Stage 的内容，包括问题陈述、初始观点、各轮辩论内容、观点总结和决策支持
3. THE System SHALL 记录 User 观点的演变过程
4. WHEN User 请求查看历史时，THE System SHALL 提供 Debate_Session 列表
5. WHEN User 选择历史记录时，THE System SHALL 展示该 Debate_Session 的完整内容

### 需求 10: 个性化配置

**用户故事:** 作为用户，我希望自定义辩论参数，以便根据不同场景调整辩论方式。

#### 验收标准

1. WHEN User 开始 Debate_Session 时，THE System SHALL 允许 User 选择参与的 AI_Role
2. WHEN User 配置辩论时，THE System SHALL 允许 User 设置 Debate_Round 的数量（最少 3 轮，最多 10 轮）
3. WHEN User 配置辩论时，THE System SHALL 允许 User 选择辩论深度级别（快速、标准、深度）
4. THE System SHALL 保存 User 的配置偏好供下次使用

### 需求 11: 对话流畅性

**用户故事:** 作为用户，我希望辩论过程自然流畅，以便保持思考的连贯性。

#### 验收标准

1. THE System SHALL 确保 AI_Role 的发言自然流畅，避免生硬的表达
2. THE System SHALL 在角色切换时提供清晰的过渡
3. WHEN User 需要暂停思考时，THE System SHALL 允许 User 暂停并稍后继续
4. THE System SHALL 控制每个 AI_Role 单次发言的长度在 200 字以内，避免信息过载

### 需求 12: 响应性能

**用户故事:** 作为用户，我希望系统响应迅速，以便保持思考的流畅性。

#### 验收标准

1. WHEN User 提交输入时，THE System SHALL 在 5 秒内生成 AI_Role 的回复
2. THE System SHALL 支持至少 20 轮的连续对话而不出现性能降低
3. WHEN 生成观点总结时，THE System SHALL 在 10 秒内完成处理

