import { Restaurant } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'GARDEN HOUSE SHIBUYA',
    imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: { min: 2000, max: 4000, level: 3 },
    walkingTime: 3,
    tasteRating: 4.5,
    instagrammability: 5,
    station: 'shibuya',
    cuisine: 'italian',
    address: '東京都渋谷区神南1-19-8',
    description: '緑に囲まれたおしゃれなイタリアンレストラン。Instagram映え抜群の空間で素敵な食事を楽しめます。'
  },
  {
    id: '2',
    name: '焼肉 金龍山',
    imageUrl: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: { min: 1500, max: 3000, level: 2 },
    walkingTime: 2,
    tasteRating: 4.8,
    instagrammability: 3,
    station: 'shibuya',
    cuisine: 'korean',
    address: '東京都渋谷区道玄坂2-9-10',
    description: '新鮮な和牛を使用した本格焼肉店。コスパ抜群で美味しい焼肉を味わえます。'
  },
  {
    id: '3',
    name: 'Cafe Aaliya',
    imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: { min: 800, max: 1800, level: 1 },
    walkingTime: 1,
    tasteRating: 4.2,
    instagrammability: 4,
    station: 'shibuya',
    cuisine: 'american',
    address: '東京都渋谷区神南1-17-5',
    description: '有名なパンケーキ専門店。ふわふわのパンケーキと美味しいコーヒーが楽しめます。'
  },
  {
    id: '4',
    name: 'L\'AS',
    imageUrl: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: { min: 5000, max: 12000, level: 4 },
    walkingTime: 8,
    tasteRating: 4.9,
    instagrammability: 5,
    station: 'shinjuku',
    cuisine: 'french',
    address: '東京都新宿区西新宿1-26-2',
    description: '本格フレンチの老舗レストラン。特別な日にぴったりの上質な料理とサービス。'
  },
  {
    id: '5',
    name: '鳥心',
    imageUrl: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: { min: 1200, max: 2500, level: 2 },
    walkingTime: 4,
    tasteRating: 4.6,
    instagrammability: 2,
    station: 'shinjuku',
    cuisine: 'japanese',
    address: '東京都新宿区歌舞伎町1-1-16',
    description: '新鮮な鶏料理専門店。こだわりの地鶏を使った絶品料理が味わえます。'
  },
  {
    id: '6',
    name: 'Bills お台場',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: { min: 1800, max: 3500, level: 2 },
    walkingTime: 12,
    tasteRating: 4.3,
    instagrammability: 5,
    station: 'ikebukuro',
    cuisine: 'american',
    address: '東京都豊島区南池袋1-28-2',
    description: '世界一の朝食で有名なカフェ。リコッタパンケーキは絶品で写真映えも抜群。'
  },
  {
    id: '7',
    name: '天ぷら 新宿つな八',
    imageUrl: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: { min: 2500, max: 6000, level: 3 },
    walkingTime: 6,
    tasteRating: 4.7,
    instagrammability: 3,
    station: 'shinjuku',
    cuisine: 'japanese',
    address: '東京都新宿区新宿3-31-8',
    description: '老舗天ぷら専門店。職人が目の前で揚げる天ぷらは絶品です。'
  },
  {
    id: '8',
    name: 'ガーデンカフェ池袋',
    imageUrl: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: { min: 1000, max: 2200, level: 2 },
    walkingTime: 3,
    tasteRating: 4.1,
    instagrammability: 4,
    station: 'ikebukuro',
    cuisine: 'italian',
    address: '東京都豊島区池袋2-36-1',
    description: '緑豊かなテラス席が人気のカフェ。パスタとスイーツが美味しいと評判。'
  }
];

export default mockRestaurants;