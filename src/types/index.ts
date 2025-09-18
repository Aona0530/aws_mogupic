export interface SearchFilters {
  station: 'shibuya' | 'shinjuku' | 'ikebukuro';
  priorities: ('looks' | 'price' | 'taste' | 'walk')[];
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
  looks: number; // 1-5
  station: 'shibuya' | 'shinjuku' | 'ikebukuro';
  cuisine: string;
  address: string;
  description?: string;
}