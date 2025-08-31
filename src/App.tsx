import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import { SearchFilters, Restaurant } from './types';
import { searchRestaurants } from './utils/searchUtils';

function App() {
  const [currentView, setCurrentView] = useState<'search' | 'results'>('search');
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    setSearchFilters(filters);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const results = searchRestaurants(filters);
    setSearchResults(results);
    setCurrentView('results');
    setIsLoading(false);
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
          filters={searchFilters!}
          onBackToSearch={handleBackToSearch}
          onNewSearch={handleSearch}
        />
      )}
    </div>
  );
}

export default App;