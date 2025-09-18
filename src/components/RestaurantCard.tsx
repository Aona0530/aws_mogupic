import React, { useState, useEffect } from 'react';
import { Star, Camera, Clock, MapPin } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  viewMode: 'grid' | 'list';
  priorityType: 'looks' | 'price' | 'taste' | 'walk';
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, viewMode, priorityType }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // S3 URL を HTTPS URL に変換
  const getImageUrl = (s3Url: string) => {
    if (!s3Url) return '/placeholder-image.jpg';
    
    if (s3Url.startsWith('s3://')) {
      try {
        const s3Path = s3Url.replace('s3://', '');
        const [bucket, ...keyParts] = s3Path.split('/');
        const key = keyParts.join('/');
        const region = 'us-east-1'; // あなたのリージョンに変更
        
        return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      } catch (error) {
        console.error('S3 URL conversion error:', error);
        return '/placeholder-image.jpg';
      }
    }
    
    return s3Url;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image load failed for restaurant:', restaurant.name, 'URL:', e.currentTarget.src);
    setImageError(true);
    e.currentTarget.src = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  // デバッグ用
  useEffect(() => {
    const imageUrl = getImageUrl(restaurant.pics);
    console.log(`Image for ${restaurant.name}:`, {
      original: restaurant.pics,
      converted: imageUrl
    });
  }, [restaurant.pics, restaurant.name]);


  const cardClass = viewMode === 'list' 
    ? 'flex space-x-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-6'
    : 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden';
  
  const imageClass = viewMode === 'list'
    ? 'w-48 h-36 object-cover rounded-lg flex-shrink-0'
    : 'w-full h-48 object-cover';

  return (
    <div className={cardClass}>
      <div className="relative">
        {imageLoading && (
          <div className={`${imageClass} bg-gray-200 animate-pulse flex items-center justify-center`}>
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <img
          src={getImageUrl(restaurant.pics)}
          alt={restaurant.name}
          className={`${imageClass} ${imageLoading ? 'hidden' : 'block'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      
      {/* 残りのJSX（レストラン情報表示部分）は同じ */}
    </div>
  );
};

export default RestaurantCard;