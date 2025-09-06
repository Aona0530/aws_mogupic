import React, { useState } from 'react';
import { ArrowLeft, Grid, List, Filter } from 'lucide-react';
import { Restaurant, SearchFilters } from '../types';
import RestaurantCard from './RestaurantCard';
import ResultsHeader from './ResultsHeader';

interface SearchResultsProps {
  results: Restaurant[];
  filters: SearchFilters;
  onBackToSearch: () => void;
  onNewSearch: (filters: SearchFilters) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  filters, 
  onBackToSearch, 
  onNewSearch 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const priorityLabels = {
    instagrammability: '映え度優先',
    price: '金額優先',
    taste: '美味しさ優先',
    distance: '近場優先'
  };

  const stationLabels = {
    shibuya: '渋谷',
    shinjuku: '新宿',
    ikebukuro: '池袋'
  };

  const getPriorityDisplayText = () => {
    const labels = filters.priorities.map(p => priorityLabels[p]);
    return labels.join('・');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ResultsHeader 
        onBackToSearch={onBackToSearch}
        filters={filters}
        onNewSearch={onNewSearch}
        priorityLabel={getPriorityDisplayText()}
        stationLabel={stationLabels[filters.station]}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <p className="text-lg text-[#4a4a4a]">
            <span className="font-semibold text-[#efc1b4]">{results.length}件</span>のレストランが見つかりました
          </p>
          <div className="hidden sm:block w-1 h-1 bg-[#6b6b6b] rounded-full"></div>
          <p className="text-[#6b6b6b] hidden sm:block">
            {getPriorityDisplayText()}で{stationLabels[filters.station]}駅周辺を検索
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-white shadow-sm text-[#efc1b4]' 
                  : 'text-[#6b6b6b] hover:text-[#4a4a4a]'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white shadow-sm text-[#efc1b4]' 
                  : 'text-[#6b6b6b] hover:text-[#4a4a4a]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
      }`}>
        {results.map((restaurant) => (
          <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant}
            viewMode={viewMode}
            priorityType={filters.priorities[0]}
          />
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-16">
          <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#4a4a4a] mb-2">
            条件に合うレストランが見つかりませんでした
          </h3>
          <p className="text-[#6b6b6b] mb-6">
            検索条件を変更して再度お試しください
          </p>
          <button
            onClick={onBackToSearch}
            className="bg-[#efc1b4] hover:bg-[#e8b4a3] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            検索条件を変更
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;