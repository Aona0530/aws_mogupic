import React from 'react';
import { Star, Camera, Clock, MapPin } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  viewMode: 'grid' | 'list';
  priorityType: 'instagrammability' | 'price' | 'taste' | 'distance';
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, viewMode, priorityType }) => {
  const getPriceSymbols = (level: number) => {
    return '¥'.repeat(level) + '¥'.repeat(4 - level).split('').map((_, i) => (
      <span key={i} className="text-gray-300">¥</span>
    ));
  };

  const priorityColors = {
    instagrammability: '#ac91bd',
    price: '#7fcba4',
    taste: '#efc1b4',
    distance: '#98c9a3'
  };

  const getPriorityValue = () => {
    switch (priorityType) {
      case 'instagrammability': return restaurant.instagrammability;
      case 'taste': return restaurant.tasteRating;
      case 'distance': return `${restaurant.walkingTime}分`;
      case 'price': return `¥${restaurant.priceRange.min.toLocaleString()}~`;
      default: return '';
    }
  };

  const cardClass = viewMode === 'list' 
    ? 'flex space-x-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-6'
    : 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden';

  const imageClass = viewMode === 'list'
    ? 'w-48 h-36 object-cover rounded-lg flex-shrink-0'
    : 'w-full h-48 object-cover';

  return (
    <div className={cardClass}>
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className={imageClass}
      />
      
      <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-[#4a4a4a] line-clamp-1">
            {restaurant.name}
          </h3>
          <div 
            className="px-2 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: priorityColors[priorityType] }}
          >
            {getPriorityValue()}
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center text-[#4a4a4a]">
            {getPriceSymbols(restaurant.priceRange.level)}
          </div>
          <span className="text-sm text-[#6b6b6b]">
            (¥{restaurant.priceRange.min.toLocaleString()}〜¥{restaurant.priceRange.max.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-[#6b6b6b]">
              <Clock className="w-4 h-4" />
              <span>徒歩{restaurant.walkingTime}分</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-[#efc1b4] text-[#efc1b4]" />
              <span className="text-[#4a4a4a] font-medium">{restaurant.tasteRating.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Camera className="w-4 h-4 text-[#ac91bd]" />
              <span className="text-[#4a4a4a] font-medium">{restaurant.instagrammability}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 text-sm text-[#6b6b6b]">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{restaurant.address}</span>
          </div>
        </div>

        {restaurant.description && (
          <p className="mt-3 text-sm text-[#6b6b6b] line-clamp-2">
            {restaurant.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;