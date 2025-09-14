// apiClient.ts
import { API } from 'aws-amplify';

// API Gateway client for restaurant search
export interface SearchRequest {
  location: string;
  looks: number;
  taste: number;
  price_bottom: number;
  price_top: number;
  priority: string[];
}

export interface RestaurantResponse {
  name: string;
  pics: string;
  price: number;
  location: string;
  walk: number;
  taberogu_score: number;
  google_score: number;
}

export class ApiClient {
  private static apiName = 'MySearchAPI'; // AWS Amplify設定のAPI名と合わせる

  static async searchRestaurants(searchParams: SearchRequest): Promise<RestaurantResponse[]> {
    try {
      // AmplifyのAPIを使用（推奨）
      const response = await API.post(this.apiName, '/search', {
        body: searchParams
      });
      
      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw new Error(`検索リクエストに失敗しました: ${error}`);
    }
  }

  // フォールバック用：直接fetchを使う場合
  static async searchRestaurantsWithFetch(searchParams: SearchRequest): Promise<RestaurantResponse[]> {
    const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
    
    if (!API_BASE_URL || API_BASE_URL === 'https://zo1rbziz9c.execute-api.us-east-1.amazonaws.com/mogupic') {
      throw new Error('API Gateway URL is not configured. Please set VITE_API_GATEWAY_URL environment variable.');
    }

    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 必要に応じてAPI Keyを追加
        // 'X-API-Key': import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify(searchParams),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

export default ApiClient;