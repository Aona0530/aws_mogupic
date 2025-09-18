// API Gateway client for restaurant search
const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'https://zo1rbziz9c.execute-api.us-east-1.amazonaws.com/mogupic';

export interface SearchRequest {
  location: string;
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
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async searchRestaurants(searchParams: SearchRequest): Promise<RestaurantResponse[]> {
    return this.makeRequest<RestaurantResponse[]>('/*', {
      method: 'POST',
      body: JSON.stringify(searchParams),
    });
  }
}

export default ApiClient;