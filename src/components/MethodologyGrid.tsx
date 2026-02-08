import { methodologies } from '@/lib/methodology-data';

interface MethodologyGridProps {
  searchTerm: string;
  selectedCategory: string;
  onSelectMethodology: (key: string) => void;
}

export default function MethodologyGrid({
  searchTerm,
  selectedCategory,
  onSelectMethodology
}: MethodologyGridProps) {
  const filteredMethodologies = Object.entries(methodologies).filter(([key, method]) => {
    const matchesSearch = searchTerm === '' ||
      method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || method.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-section">
      <h2>📚 所有方法论</h2>
      <div className="methodology-grid">
        {filteredMethodologies.map(([key, method]) => (
          <div
            key={key}
            className="methodology-card"
            onClick={() => onSelectMethodology(key)}
          >
            <span className="category">{method.category}</span>
            <h3>{method.name}</h3>
            <div className="description">{method.description}</div>
            <div className="tags">
              <span className="tag">难度: {method.difficulty}</span>
              {method.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
