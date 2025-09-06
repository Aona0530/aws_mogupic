import { SearchFilters, Restaurant } from '../types';
import mockRestaurants from '../data/mockData';
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
  try {
    // Check if API Gateway URL is configured
    const apiUrl = import.meta.env.VITE_API_GATEWAY_URL;
    
    if (apiUrl && apiUrl !== 'https://your-api-gateway-url.amazonaws.com/prod') {
      // Use real API
      const apiRequest = convertFiltersToApiRequest(filters);
      const apiResponse = await ApiClient.searchRestaurants(apiRequest);
      
      return apiResponse.map((restaurant, index) => 
        convertApiResponseToRestaurant(restaurant, index)
      );
    } else {
      // Fallback to mock data
      console.log('Using mock data - set VITE_API_GATEWAY_URL environment variable to use real API');
      return searchRestaurantsMock(filters);
    }
  } catch (error) {
    console.error('API request failed, falling back to mock data:', error);
    return searchRestaurantsMock(filters);
  }
};

// Keep existing mock search as fallback
const searchRestaurantsMock = (filters: SearchFilters): Restaurant[] => {
  let results = mockRestaurants.filter(restaurant => {
    // Filter by station
    if (restaurant.station !== filters.station) return false;
    return true;
  });

  // Sort by priorities (first priority is main, second is tiebreaker)
  results = results.sort((a, b) => {
    const mainPriority = filters.priorities[0];
    const secondaryPriority = filters.priorities[1];
    
    // Sort by main priority
    let mainComparison = 0;
    switch (mainPriority) {
      case 'instagrammability':
        mainComparison = b.instagrammability - a.instagrammability;
        break;
      case 'price':
        mainComparison = a.price - b.price;
        break;
      case 'taste':
        mainComparison = b.taberogu_score - a.taberogu_score;
        break;
      case 'distance':
        mainComparison = a.walk - b.walk;
        break;
    }
    
    // If main comparison is tied and there's a secondary priority, use it as tiebreaker
    if (mainComparison === 0 && secondaryPriority) {
      switch (secondaryPriority) {
        case 'instagrammability':
          return b.instagrammability - a.instagrammability;
        case 'price':
          return a.price - b.price;
        case 'taste':
          return b.taberogu_score - a.taberogu_score;
        case 'distance':
          return a.walk - b.walk;
      }
    }
    
    return mainComparison;
  });

  return results;
};