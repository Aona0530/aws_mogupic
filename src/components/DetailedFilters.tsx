import React from 'react';
import { Slider } from './Slider';

interface DetailedFiltersProps {
  filters: {
    priceRange: [number, number];
    maxWalkingTime: number;
    cuisine: string;
    minRating: number;
  };
  onFiltersChange: (filters: any) => void;
}

const cuisines = [
  { value: '', label: 'すべて' },
  { value: 'japanese', label: '和食' },
  { value: 'italian', label: 'イタリアン' },
  { value: 'french', label: 'フレンチ' },
  { value: 'chinese', label: '中華' },
  { value: 'korean', label: '韓国料理' },
  { value: 'american', label: 'アメリカン' }
];

const DetailedFilters: React.FC<DetailedFiltersProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-6">
      <h4 className="text-lg font-semibold text-[#4a4a4a] mb-4">詳細条件</h4>
      
      <div>
        <label className="block text-sm font-medium text-[#6b6b6b] mb-3">
          予算範囲: ¥{filters.priceRange[0].toLocaleString()} - ¥{filters.priceRange[1].toLocaleString()}
        </label>
        <Slider
          min={500}
          max={10000}
          step={500}
          value={filters.priceRange}
          onChange={(value) => updateFilter('priceRange', value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6b6b6b] mb-3">
          最大徒歩時間: {filters.maxWalkingTime}分
        </label>
        <Slider
          min={1}
          max={20}
          step={1}
          value={[filters.maxWalkingTime]}
          onChange={(value) => updateFilter('maxWalkingTime', value[0])}
        />
      </div>

      <div>
        <label htmlFor="cuisine" className="block text-sm font-medium text-[#6b6b6b] mb-2">
          料理ジャンル
        </label>
        <select
          id="cuisine"
          value={filters.cuisine}
          onChange={(e) => updateFilter('cuisine', e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#efc1b4] focus:border-transparent"
        >
          {cuisines.map((cuisine) => (
            <option key={cuisine.value} value={cuisine.value}>
              {cuisine.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6b6b6b] mb-3">
          最低評価: {filters.minRating}★以上
        </label>
        <Slider
          min={1}
          max={5}
          step={0.5}
          value={[filters.minRating]}
          onChange={(value) => updateFilter('minRating', value[0])}
        />
      </div>
    </div>
  );
};

export default DetailedFilters;