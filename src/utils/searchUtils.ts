import { SearchFilters, Restaurant } from '../types';
import mockRestaurants from '../data/mockData';

export const searchRestaurants = (filters: SearchFilters): Restaurant[] => {
  let results = mockRestaurants.filter(restaurant => {
    // Filter by station
    if (restaurant.station !== filters.station) return false;
    
    // Filter by price range if specified
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (restaurant.priceRange.max < minPrice || restaurant.priceRange.min > maxPrice) {
        return false;
      }
    }
    
    // Filter by walking time if specified
    if (filters.maxWalkingTime && restaurant.walkingTime > filters.maxWalkingTime) {
      return false;
    }
    
    // Filter by cuisine if specified
    if (filters.cuisine && filters.cuisine !== '' && restaurant.cuisine !== filters.cuisine) {
      return false;
    }
    
    // Filter by minimum rating if specified
    if (filters.minRating && restaurant.tasteRating < filters.minRating) {
      return false;
    }
    
    return true;
  });

  // Sort by priority
  results = results.sort((a, b) => {
    switch (filters.priority) {
      case 'instagrammability':
        return b.instagrammability - a.instagrammability;
      case 'price':
        return a.priceRange.min - b.priceRange.min;
      case 'taste':
        return b.tasteRating - a.tasteRating;
      case 'distance':
        return a.walkingTime - b.walkingTime;
      default:
        return 0;
    }
  });

  return results;
};