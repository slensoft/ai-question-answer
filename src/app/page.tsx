import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🎯 智能学习平台</div>
          <h1 className="hero-title">
            提问方法论学习平台
          </h1>
          <p className="hero-subtitle">
            掌握15种核心思维框架，让 AI 帮你找到最适合的解决方案
          </p>

          <div className="cta-buttons">
            <Link className="btn-cta primary" href="/ai-guide">
              <span className="btn-icon">🤖</span>
              <span className="btn-text">
                <strong>AI 智能引导</strong>
                <small>3分钟找到答案</small>
              </span>
            </Link>
            <Link className="btn-cta secondary" href="/methodology/all">
              <span className="btn-icon">📚</span>
              <span className="btn-text">
                <strong>浏览方法论</strong>
                <small>自主探索学习</small>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">选择你的学习方式</h2>
        <div className="features-grid">
          <Link href="/ai-guide" className="feature-card clickable">
            <div className="feature-icon">🤖</div>
            <h3>AI 引导</h3>
            <p>不确定用什么方法？AI 通过提问帮你快速找到最适合的方法论</p>
            <div className="card-arrow">→</div>
          </Link>
          <Link href="/methodology/scenarios" className="feature-card clickable">
            <div className="feature-icon">🎯</div>
            <h3>按场景选择</h3>
            <p>工作汇报、问题分析、创新思考...根据场景快速筛选方法论</p>
            <div className="card-arrow">→</div>
          </Link>
          <Link href="/methodology/all" className="feature-card clickable">
            <div className="feature-icon">📚</div>
            <h3>所有方法论</h3>
            <p>浏览全部15种方法论，包含详细说明和实践练习</p>
            <div className="card-arrow">→</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
