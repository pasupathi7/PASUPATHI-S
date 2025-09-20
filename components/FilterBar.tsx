
import React from 'react';
import { FilterSort } from '../types';

interface FilterBarProps {
  onSortChange: (sort: FilterSort) => void;
  currentSort: FilterSort;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSortChange, currentSort }) => {
  const sortOptions: { key: FilterSort; label: string }[] = [
    { key: FilterSort.RATING_DESC, label: 'Rating (High to Low)' },
    { key: FilterSort.PRICE_ASC, label: 'Price (Low to High)' },
    { key: FilterSort.PRICE_DESC, label: 'Price (High to Low)' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center space-x-4">
        <label htmlFor="sort-by" className="text-sm font-medium text-gray-700">Sort by:</label>
        <select
          id="sort-by"
          name="sort-by"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as FilterSort)}
        >
          {sortOptions.map(option => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
