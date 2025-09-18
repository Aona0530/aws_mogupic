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
    if (!s3Url) {
      console.warn('No image URL provided');
      return '/placeholder-image.jpg';
    }
    
    if (s3Url.startsWith('s3://')) {
      try {
        const s3Path = s3Url.replace('s3://', '');
        const [bucket, ...keyParts] = s3Path.split('/');
        
        if (!bucket || keyParts.length === 0) {
          console.error('Invalid S3 URL format:', s3Url);
          return '/placeholder-image.jpg';
        }
        
        const key = keyParts.join('/');
        const region = 'us-east-1'; // あなたのAWSリージョンに変更してください
        
        // URLエンコード（スラッシュは保持）
        const encodedKey = encodeURIComponent(key).replace(/%2F/g, '/');
        
        const httpsUrl = `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
        console.log('S3 URL converted:', { original: s3Url, converted: httpsUrl });
        
        return httpsUrl;
      } catch (error) {
        console.error('S3 URL conversion error:', error);
        return '/placeholder-image.jpg';
      }
    }
    
    // 既にHTTPS URLの場合はそのまま返す
    if (s3Url.startsWith('https://') || s3Url.startsWith('http://')) {
      return s3Url;
    }
    
    // その他の場合はデフォルト画像
    console.warn('Unknown URL format:', s3Url);
    return '/placeholder-image.jpg';
  };

  // 価格レベルの表示（使用していない場合は削除可能）
  const getPriceSymbols = (level: number) => {
    const activeSymbols = '¥'.repeat(Math.min(level, 4));
    const inactiveCount = Math.max(0, 4 - level);
    
    return (
      <>
        {activeSymbols}
        {Array.from({ length: inactiveCount }, (_, i) => (
          <span key={i} className="text-gray-300">¥</span>
        ))}
      </>
    );
  };

  // 優先度別の色設定
  const priorityColors = {
    looks: '#ac91bd',
    price: '#7fcba4',
    taste: '#efc1b4',
    walk: '#98c9a3'
  };

  // 優先度に応じた値を取得
  const getPriorityValue = () => {
    switch (priorityType) {
      case 'looks': 
        return restaurant.looks;
      case 'taste': 
        return restaurant.taberogu_score ? restaurant.taberogu_score.toFixed(1) : 'N/A';
      case 'walk': 
        return `${restaurant.walk}分`;
      case 'price': 
        return `¥${restaurant.price.toLocaleString()}`;
      default: 
        return '';
    }
  };

  // 画像読み込みエラーハンドリング
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image load failed for restaurant:', restaurant.name, 'URL:', e.currentTarget.src);
    setImageError(true);
    setImageLoading(false);
    // フォールバック画像を設定
    e.currentTarget.src = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  // 画像読み込み成功時の処理
  const handleImageLoad = () => {
    console.log('Image loaded successfully for:', restaurant.name);
    setImageLoading(false);
    setImageError(false);
  };

  // デバッグ用：画像URL確認
  useEffect(() => {
    const imageUrl = getImageUrl(restaurant.pics);
    console.log(`Image debug for ${restaurant.name}:`, {
      original: restaurant.pics,
      converted: imageUrl,
      restaurant: restaurant
    });
  }, [restaurant.pics, restaurant.name]);

  // レスポンシブクラス設定
  const cardClass = viewMode === 'list' 
    ? 'flex space-x-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-6'
    : 'bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden';
  
  const imageClass = viewMode === 'list'
    ? 'w-48 h-36 object-cover rounded-lg flex-shrink-0'
    : 'w-full h-48 object-cover';

  return (
    <div className={cardClass}>
      {/* 画像セクション */}
      <div className="relative">
        {/* ローディング状態 */}
        {imageLoading && (
          <div className={`${imageClass} bg-gray-200 animate-pulse flex items-center justify-center`}>
            <Camera className="w-8 h-8 text-gray-400" />
            <span className="ml-2 text-gray-500 text-sm">読み込み中...</span>
          </div>
        )}
        
        {/* 実際の画像 */}
        <img
          src={getImageUrl(restaurant.pics)}
          alt={restaurant.name}
          className={`${imageClass} ${imageLoading ? 'hidden' : 'block'} transition-opacity duration-300`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* エラー表示 */}
        {imageError && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            画像エラー
          </div>
        )}
      </div>
      
      {/* コンテンツセクション */}
      <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
        {/* ヘッダー（レストラン名と優先度バッジ） */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-[#4a4a4a] line-clamp-1 flex-1 mr-2">
            {restaurant.name}
          </h3>
          <div 
            className="px-2 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap"
            style={{ backgroundColor: priorityColors[priorityType] }}
          >
            {getPriorityValue()}
          </div>
        </div>
        
        {/* 価格情報 */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm text-[#6b6b6b] font-medium">
            ¥{restaurant.price.toLocaleString()}
          </span>
        </div>
        
        {/* 詳細情報（スコア、徒歩時間など） */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            {/* 徒歩時間 */}
            <div className="flex items-center space-x-1 text-[#6b6b6b]">
              <Clock className="w-4 h-4" />
              <span>徒歩{restaurant.walk}分</span>
            </div>
            
            {/* 食べログスコア */}
            {restaurant.taberogu_score && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-[#efc1b4] text-[#efc1b4]" />
                <span className="text-[#4a4a4a] font-medium">
                  {restaurant.taberogu_score.toFixed(1)}
                </span>
              </div>
            )}
            
            {/* 見た目スコア */}
            {restaurant.looks && (
              <div className="flex items-center space-x-1">
                <Camera className="w-4 h-4 text-[#ac91bd]" />
                <span className="text-[#4a4a4a] font-medium">{restaurant.looks}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* 位置情報 */}
        <div className="mt-3 text-sm text-[#6b6b6b]">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{restaurant.location}</span>
          </div>
        </div>
        
        {/* 説明文（もしあれば） */}
        {restaurant.description && (
          <p className="mt-3 text-sm text-[#6b6b6b] line-clamp-2">
            {restaurant.description}
          </p>
        )}
        
        {/* Googleスコア（もしあれば） */}
        {restaurant.google_score && (
          <div className="mt-2 text-xs text-[#6b6b6b]">
            Google: {restaurant.google_score.toFixed(1)}
          </div>
        )}
        
        {/* デバッグ情報（開発時のみ表示） */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
            <strong>Debug:</strong>
            <div>Original URL: {restaurant.pics}</div>
            <div>Converted URL: {getImageUrl(restaurant.pics)}</div>
            <div>Loading: {imageLoading ? 'Yes' : 'No'}</div>
            <div>Error: {imageError ? 'Yes' : 'No'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;