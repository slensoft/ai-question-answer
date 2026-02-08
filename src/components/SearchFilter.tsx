interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}: SearchFilterProps) {
  const categories = [
    'all',
    '思维模型',
    '结构化提问',
    '深度追问',
    '决策分析',
    '创新突破',
    '学习成长'
  ];

  return (
    <div className="filter-section">
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 搜索方法论..."
        />
      </div>
      <div className="filter-tags">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-tag ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat === 'all' ? '全部' : cat}
          </button>
        ))}
      </div>
    </div>
  );
}
