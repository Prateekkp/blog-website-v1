import React from 'react';
import styles from './TopicFilter.module.css';

export interface TopicFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const TopicFilter: React.FC<TopicFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div
      className={`band ${styles.topics}`}
      role="group"
      aria-label="Filter by topic"
      id="topics"
    >
      {categories.map((category) => {
        const isPressed = category === selectedCategory;
        return (
          <button
            key={category}
            type="button"
            className={styles.chip}
            aria-pressed={isPressed}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default TopicFilter;
