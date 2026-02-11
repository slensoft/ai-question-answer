<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">🎯 智能学习平台</div>
        <h1 class="hero-title">提问方法论学习平台</h1>
        <p class="hero-subtitle">掌握15种核心思维框架，让 AI 帮你找到最适合的解决方案</p>

        <div class="cta-buttons">
          <NuxtLink class="btn-cta primary" to="/ai-guide">
            <span class="btn-icon">🤖</span>
            <span class="btn-text"><strong>AI 智能引导</strong><small>3分钟找到答案</small></span>
          </NuxtLink>
          <NuxtLink class="btn-cta secondary" to="/methodology/all">
            <span class="btn-icon">📚</span>
            <span class="btn-text"><strong>浏览方法论</strong><small>自主探索学习</small></span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="features-section">
      <h2 class="section-title">选择你的学习方式</h2>
      <div class="features-grid">
        <NuxtLink to="/ai-guide" class="feature-card clickable">
          <div class="feature-icon">🤖</div>
          <h3>AI 引导</h3>
          <p>不确定用什么方法？AI 通过提问帮你快速找到最适合的方法论</p>
          <div class="card-arrow">→</div>
        </NuxtLink>
        <NuxtLink to="/methodology/scenarios" class="feature-card clickable">
          <div class="feature-icon">🎯</div>
          <h3>按场景选择</h3>
          <p>工作汇报、问题分析、创新思考...根据场景快速筛选方法论</p>
          <div class="card-arrow">→</div>
        </NuxtLink>
        <NuxtLink to="/methodology/all" class="feature-card clickable">
          <div class="feature-icon">📚</div>
          <h3>所有方法论</h3>
          <p>浏览全部15种方法论，包含详细说明和实践练习</p>
          <div class="card-arrow">→</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
