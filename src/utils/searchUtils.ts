import { SearchFilters, Restaurant } from '../types';
import mockRestaurants from '../data/mockData';

export const searchRestaurants = (filters: SearchFilters): Restaurant[] => {
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
        mainComparison = a.priceRange.min - b.priceRange.min;
        break;
      case 'taste':
        mainComparison = b.tasteRating - a.tasteRating;
        break;
      case 'distance':
        mainComparison = a.walkingTime - b.walkingTime;
        break;
    }
    
    // If main comparison is tied and there's a secondary priority, use it as tiebreaker
    if (mainComparison === 0 && secondaryPriority) {
      switch (secondaryPriority) {
        case 'instagrammability':
          return b.instagrammability - a.instagrammability;
        case 'price':
          return a.priceRange.min - b.priceRange.min;
        case 'taste':
          return b.tasteRating - a.tasteRating;
        case 'distance':
          return a.walkingTime - b.walkingTime;
      }
    }
    
    return mainComparison;
  });

  return results;
};