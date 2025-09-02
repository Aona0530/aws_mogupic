export interface SearchFilters {
  station: 'shibuya' | 'shinjuku' | 'ikebukuro';
  priorities: ('instagrammability' | 'price' | 'taste' | 'distance')[];
}

export interface Restaurant {
  id: string;
  name: string;
  pics: string;
  price: number;
  location: string;
  walk: number; // minutes
  taberogu_score: number;
  google_score: number;
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