import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SearchFilters } from '../types';
import PriorityButtons from './PriorityButtons';
import StationSelector from './StationSelector';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [selectedStation, setSelectedStation] = useState<'shibuya' | 'shinjuku' | 'ikebukuro'>('shibuya');
  const [selectedPriorities, setSelectedPriorities] = useState<('instagrammability' | 'price' | 'taste' | 'distance')[]>([]);

  const handleSearch = () => {
    if (selectedPriorities.length === 0) return;

    const filters: SearchFilters = {
      station: selectedStation,
      priorities: selectedPriorities
    };

    onSearch(filters);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#4a4a4a] mb-4">
          あなたにぴったりの<br />レストランを見つけよう
        </h2>
        <p className="text-xl text-[#6b6b6b] leading-relaxed">
          優先したいポイントを選んで、理想のお店を探しましょう
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <StationSelector 
          selectedStation={selectedStation}
          onStationChange={setSelectedStation}
        />

        <div className="border-t border-gray-100 pt-8">
          <h3 className="text-xl font-semibold text-[#4a4a4a] mb-6">何を重視しますか？</h3>
          <p className="text-sm text-[#6b6b6b] mb-6">1つまたは2つまで選択してください</p>
          <PriorityButtons 
            selectedPriorities={selectedPriorities}
            onPriorityChange={setSelectedPriorities}
          />
        </div>

        <div className="border-t border-gray-100 pt-8">
          <button
            onClick={handleSearch}
            disabled={selectedPriorities.length === 0 || isLoading}
            className="w-full bg-[#efc1b4] hover:bg-[#e8b4a3] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:hover:scale-100 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>検索中...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Search className="w-5 h-5" />
                <span>レストランを探す</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default SearchForm;