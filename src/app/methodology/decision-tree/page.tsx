'use client';

import { useRouter } from 'next/navigation';
import DecisionTree from '@/components/DecisionTree';
import '../methodology.css';

export default function DecisionTreePage() {
  const router = useRouter();

  const handleSelectMethodology = (methodKey: string) => {
    router.push(`/methodology/${methodKey}`);
  };

  return (
    <div className="methodology-container">
      <div className="methodology-header">
        <h1>🌳 智能决策树</h1>
        <p>不确定用哪个方法？回答几个问题，让我们帮你找到最合适的方法论</p>
      </div>

      <div className="methodology-content">
        <DecisionTree onSelectMethodology={handleSelectMethodology} />
      </div>
    </div>
  );
}
