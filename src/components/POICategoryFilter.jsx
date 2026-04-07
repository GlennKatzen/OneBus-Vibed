import React from 'react';
import '../styles/POICategoryFilter.css';

const POICategoryFilter = ({ 
  categories, 
  selectedCategories, 
  onToggleCategory,
  onClearAll,
  onSelectAll,
  categoryCounts 
}) => {
  return (
    <div className="poi-filter-container">
      <div className="poi-filter-header">
        <span className="poi-filter-title">Filter POIs</span>
        <span className="poi-filter-count">
          {selectedCategories.size} selected
        </span>
      </div>
      
      <div className="poi-filter-list">
        {categories.map(category => (
          <div
            key={category}
            className={`poi-filter-item ${selectedCategories.has(category) ? 'selected' : ''}`}
            onClick={() => onToggleCategory(category)}
          >
            <span className={`poi-filter-dot ${selectedCategories.has(category) ? 'selected' : ''}`} />
            <span className="poi-filter-name">
              {category}
            </span>
            <span className="poi-filter-badge">
              {categoryCounts[category] || 0}
            </span>
          </div>
        ))}
      </div>
      
      {selectedCategories.size > 0 && (
        <div className="poi-filter-actions">
          <button
            className="poi-filter-btn clear"
            onClick={onClearAll}
          >
            Clear all
          </button>
          {selectedCategories.size !== categories.length && (
            <button
              className="poi-filter-btn select-all"
              onClick={onSelectAll}
            >
              Select all
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default POICategoryFilter;