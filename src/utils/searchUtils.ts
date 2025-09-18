import { SearchFilters, Restaurant } from '../types';
import ApiClient, { SearchRequest } from '../services/apiClient';

// Convert UI filters to API request format
const convertFiltersToApiRequest = (filters: SearchFilters): SearchRequest => {
  // Map station names to API format
  const locationMap = {
    'shibuya': '渋谷駅',
    'shinjuku': '新宿駅',
    'ikebukuro': '池袋駅'
  };

  // Map priority names to API format
  const priorityMap = {
    'looks': 'looks',
    'taste': 'taste',
    'price': 'price',
    'walk': 'walk'
  };

  return {
    location: locationMap[filters.station],
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
    looks: apiData.looks,
    station: stationMap[apiData.location] || 'shibuya',
    cuisine: 'unknown', // Not provided by API
    address: apiData.location, // Use location as address
    description: `${apiData.name}の詳細情報` // Generate basic description
  };
};

export const searchRestaurants = async (filters: SearchFilters): Promise<Restaurant[]> => {
  const apiUrl = import.meta.env.VITE_API_GATEWAY_URL;

  if (!apiUrl) {
    throw new Error('Lambda function URL is not configured. Please set VITE_API_GATEWAY_URL environment variable.');
  }

  try {
    const apiRequest = convertFiltersToApiRequest(filters);

    // APIクライアントを呼び出して、レスポンスオブジェクト全体を取得
    // レスポンスは { "data": [...] } の形式
    const fullApiResponse = await ApiClient.searchRestaurants(apiRequest);

    // 'data'キーから、レストランの配列を抽出
    const restaurantArray = fullApiResponse.data;

    // 抽出したデータが有効な配列であるかを確認
    if (!Array.isArray(restaurantArray)) {
      throw new Error('APIレスポンスの形式が無効です: "data"が配列ではありません。');
    }

    // 抽出した配列をUIの形式に変換
    return restaurantArray.map((restaurant, index) =>
      convertApiResponseToRestaurant(restaurant, index)
    );

  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};