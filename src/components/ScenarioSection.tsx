'use client';

import { useState } from 'react';
import { scenarioNeeds } from '@/lib/methodology-data';

interface ScenarioSectionProps {
  onSelectMethodology: (key: string) => void;
}

export default function ScenarioSection({ onSelectMethodology }: ScenarioSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('');

  const scenarios = [
    { id: 'work', icon: '💼', name: '工作场景', desc: '向领导汇报、项目复盘、团队会议、跨部门协作等' },
    { id: 'learning', icon: '📚', name: '学习场景', desc: '学习新知识、阅读论文、向导师请教、自我反思等' },
    { id: 'innovation', icon: '💡', name: '创新场景', desc: '产品创新、头脑风暴、突破僵局、商业模式创新等' },
    { id: 'decision', icon: '🎲', name: '决策场景', desc: '技术选型、风险评估、资源分配、投资决策等' }
  ];

  const handleScenarioClick = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setShowModal(true);
  };

  const handleNeedSelect = (methodKey: string) => {
    setShowModal(false);
    onSelectMethodology(methodKey);
  };

  return (
    <>
      <div className="scenario-section">
        <h2>🎯 按场景选择</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          根据你当前的实际场景，快速找到最适合的方法论
        </p>
        <div className="scenario-grid">
          {scenarios.map((s) => (
            <div
              key={s.id}
              className="scenario-card"
              onClick={() => handleScenarioClick(s.id)}
            >
              <div className="icon">{s.icon}</div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>选择具体需求</h2>
            <div className="options">
              {scenarioNeeds[selectedScenario]?.map((need) => (
                <button
                  key={need.id}
                  className="option-btn"
                  onClick={() => handleNeedSelect(need.methods[0])}
                >
                  <strong>{need.name}</strong>
                  <br />
                  <small>推荐方法：{need.methods.join('、')}</small>
                </button>
              ))}
            </div>
            <button
              className="btn btn-secondary"
              style={{ marginTop: '20px', width: '100%' }}
              onClick={() => setShowModal(false)}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </>
  );
}
