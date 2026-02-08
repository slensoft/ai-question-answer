'use client';

import Link from 'next/link';
import './methodology.css';

export default function MethodologyPage() {
  return (
    <div className="methodology-container">
      <div className="methodology-header">
        <h1>🎯 提问方法论学习平台</h1>
        <p>通过实践掌握15种核心提问与思考方法</p>
      </div>

      <div className="methodology-content">
        <div className="home-intro">
          <h2>欢迎来到提问方法论学习平台</h2>
          <p>这里收录了15种经典的提问与思考方法论，帮助你在不同场景下更好地分析问题、做出决策。</p>
          
          <div className="intro-cards">
            <Link href="/methodology/scenarios" className="intro-card">
              <div className="intro-icon">🎯</div>
              <h3>按场景选择</h3>
              <p>根据你当前的实际场景（工作、学习、创新、决策），快速找到最适合的方法论</p>
            </Link>

            <Link href="/methodology/decision-tree" className="intro-card">
              <div className="intro-icon">🌳</div>
              <h3>智能决策树</h3>
              <p>不确定用哪个方法？回答几个问题，让我们帮你找到最合适的方法论</p>
            </Link>

            <Link href="/methodology/all" className="intro-card">
              <div className="intro-icon">📚</div>
              <h3>所有方法论</h3>
              <p>浏览完整的方法论资源库，了解每个方法的特点和适用场景</p>
            </Link>
          </div>

          <div className="quick-start">
            <h3>💡 使用建议</h3>
            <ul>
              <li>如果你有明确的场景需求，推荐使用「按场景选择」</li>
              <li>如果你不确定该用哪个方法，试试「智能决策树」</li>
              <li>如果你想系统学习所有方法，可以浏览「所有方法论」</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
