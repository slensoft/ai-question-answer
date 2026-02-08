'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MethodologyGrid from '@/components/MethodologyGrid';
import SearchFilter from '@/components/SearchFilter';
import '../methodology.css';

export default function AllMethodologiesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSelectMethodology = (methodKey: string) => {
    router.push(`/methodology/${methodKey}`);
  };

  return (
    <div className="methodology-container">
      <div className="methodology-header">
        <h1>📚 所有方法论</h1>
        <p>浏览完整的方法论资源库，了解每个方法的特点和适用场景</p>
      </div>

      <div className="methodology-content">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <MethodologyGrid
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSelectMethodology={handleSelectMethodology}
        />
      </div>
    </div>
  );
}
