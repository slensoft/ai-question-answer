'use client';

import { useRouter } from 'next/navigation';
import { methodologies } from '@/lib/methodology-data';
import PracticeView from '@/components/PracticeView';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function MethodologyDetailPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = decodeURIComponent(resolvedParams.slug);

  const handleBack = () => {
    router.back();
  };

  // 检查方法论是否存在
  if (!methodologies[slug]) {
    return (
      <div className="methodology-container">
        <div className="methodology-header">
          <h1>方法论不存在</h1>
          <p>原始 slug: {resolvedParams.slug}</p>
          <p>解码后 slug: {slug}</p>
          <p>可用的方法论: {Object.keys(methodologies).join(', ')}</p>
        </div>
        <div className="methodology-content">
          <button className="btn btn-secondary" onClick={handleBack}>
            ← 返回上一页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="methodology-container">
      <div className="methodology-header">
        <h1>🎯 {methodologies[slug].name}</h1>
        <p>{methodologies[slug].description}</p>
      </div>

      <div className="methodology-content">
        <PracticeView
          methodologyKey={slug}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
