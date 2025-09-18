import React from 'react';
import { Train } from 'lucide-react';

interface StationSelectorProps {
  selectedStation: 'shibuya' | 'shinjuku' | 'ikebukuro';
  onStationChange: (station: 'shibuya' | 'shinjuku' | 'ikebukuro') => void;
}

const stations = [
  { id: 'shibuya' as const, name: '渋谷駅' },
  { id: 'shinjuku' as const, name: '新宿駅' },
  { id: 'ikebukuro' as const, name: '池袋駅' }
];

const StationSelector: React.FC<StationSelectorProps> = ({ selectedStation, onStationChange }) => {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Train className="w-5 h-5 text-[#ac91bd]" />
        <h3 className="text-xl font-semibold text-[#4a4a4a]">検索エリア</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {stations.map((station) => (
          <button
            key={station.id}
            onClick={() => onStationChange(station.id)}
            className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              selectedStation === station.id
                ? 'bg-[#efc1b4] text-white shadow-md'
                : 'bg-gray-50 text-[#4a4a4a] hover:bg-[#efc1b4] hover:bg-opacity-10 border border-gray-200'
            }`}
          >
            {station.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StationSelector;