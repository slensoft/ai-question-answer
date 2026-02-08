'use client';

import { useRouter } from 'next/navigation';
import MethodologyNav from '@/components/MethodologyNav';
import ScenarioSection from '@/components/ScenarioSection';
import '../methodology.css';

export default function ScenariosPage() {
  const router = useRouter();

  const handleSelectMethodology = (methodKey: string) => {
    router.push(`/methodology/${methodKey}`);
  };

  return (
    <div className="methodology-container">
      <div className="methodology-header">
        <h1>🎯 按场景选择方法论</h1>
        <p>根据你当前的实际场景，快速找到最适合的方法论</p>
      </div>

      <MethodologyNav />

      <div className="methodology-content">
        <ScenarioSection onSelectMethodology={handleSelectMethodology} />
      </div>
    </div>
  );
}
