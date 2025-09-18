import { SearchFilters, Restaurant } from '../types';
import ApiClient, { SearchRequest } from '../services/apiClient';

// Convert UI filters to API request format
const convertFiltersToApiRequest = (filters: SearchFilters): SearchRequest => {
  // Map station names to API format
  const locationMap = {
    'shibuya': '渋谷',
    'shinjuku': '新宿',
    'ikebukuro': '池袋'
  };

  // Map priority names to API format
  const priorityMap = {
    'instagrammability': 'looks',
    'taste': 'taste',
    'price': 'price',
    'distance': 'location'
  };

  return {
    location: locationMap[filters.station],
    looks: 3, // Default value - could be made configurable
    taste: 3, // Default value - could be made configurable
    price_bottom: 1000, // Default value - could be made configurable
    price_top: 10000, // Default value - could be made configurable
    priority: filters.priorities.map(p => priorityMap[p])
  };
};

// Convert API response to UI format
const convertApiResponseToRestaurant = (apiData: any, index: number): Restaurant => {
  // Map location back to station format
  const stationMap: { [key: string]: 'shibuya' | 'shinjuku' | 'ikebukuro' } = {
    '渋谷駅': 'shibuya',
    '新宿駅': 'shinjuku',
    '池袋駅': 'ikebukuro'
  };

  return {
    id: `api-${index}`,
    name: apiData.name,
    pics: apiData.pics,
    price: apiData.price,
    location: apiData.location,
    walk: apiData.walk,
    taberogu_score: apiData.taberogu_score,
    google_score: apiData.google_score,
    instagrammability: Math.floor(Math.random() * 5) + 1, // Generate random value since not in API
    station: stationMap[apiData.location] || 'shibuya',
    cuisine: 'unknown', // Not provided by API
    address: apiData.location, // Use location as address
    description: `${apiData.name}の詳細情報` // Generate basic description
  };
};

export const searchRestaurants = async (filters: SearchFilters): Promise<Restaurant[]> => {
  const apiUrl = import.meta.env.VITE_API_GATEWAY_URL;
  
  if (!apiUrl || apiUrl === 'https://your-api-gateway-url.amazonaws.com/prod') {
    throw new Error('Lambda function URL is not configured. Please set VITE_API_GATEWAY_URL environment variable.');
  }

  try {
    // Call Lambda function via API Gateway
    const apiRequest = convertFiltersToApiRequest(filters);
    const apiResponse = await ApiClient.searchRestaurants(apiRequest);
    
    return apiResponse.map((restaurant, index) => 
      convertApiResponseToRestaurant(restaurant, index)
    );
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};