export interface SearchFilters {
  station: 'shibuya' | 'shinjuku' | 'ikebukuro';
  priorities: ('instagrammability' | 'price' | 'taste' | 'distance')[];
}

export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  priceRange: {
    min: number;
    max: number;
    level: 1 | 2 | 3 | 4; // ¥ symbols count
  };
  walkingTime: number; // minutes
  tasteRating: number; // 1-5
  instagrammability: number; // 1-5
  station: 'shibuya' | 'shinjuku' | 'ikebukuro';
  cuisine: string;
  address: string;
  description?: string;
}

export interface SortOption {
  value: string;
  label: string;
}