import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import { SearchFilters, Restaurant } from './types'; // types/index.ts から型をインポート
import { searchRestaurants } from './utils/searchUtils';

function App() {
  const [currentView, setCurrentView] = useState<'search' | 'results'>('search');
  // 初期値をnullではなく、空のオブジェクトに変更
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    station: 'shibuya', // 初期値を設定
    priorities: [],
  });
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    setSearchFilters(filters);
    
    try {
      const results = await searchRestaurants(filters);
      setSearchResults(results);
      setCurrentView('results');
    } catch (error) {
      console.error('Search failed:', error);
      alert('検索に失敗しました。Lambda関数のURLが正しく設定されているか確認してください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f9f7f6]">
      <Header />
      
      {currentView === 'search' ? (
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      ) : (
        <SearchResults 
          results={searchResults}
          // filtersがnullになる可能性がなくなるため、!を削除
          filters={searchFilters}
          onBackToSearch={handleBackToSearch}
          onNewSearch={handleSearch}
        />
      )}
    </div>
  );
}

export default App;