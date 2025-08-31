import React from 'react';
import { Camera, DollarSign, Heart, MapPin } from 'lucide-react';

interface PriorityButtonsProps {
  selectedPriority: 'instagrammability' | 'price' | 'taste' | 'distance' | null;
  onPriorityChange: (priority: 'instagrammability' | 'price' | 'taste' | 'distance') => void;
}

const priorities = [
  {
    id: 'instagrammability' as const,
    label: '映え度優先！',
    description: 'フォトジェニックなお店',
    icon: Camera,
    color: '#ac91bd',
    hoverColor: '#9a7ba8'
  },
  {
    id: 'price' as const,
    label: '金額優先！',
    description: 'コスパの良いお店',
    icon: DollarSign,
    color: '#7fcba4',
    hoverColor: '#6fb892'
  },
  {
    id: 'taste' as const,
    label: '美味しさ優先！',
    description: '味に定評のあるお店',
    icon: Heart,
    color: '#efc1b4',
    hoverColor: '#e8b4a3'
  },
  {
    id: 'distance' as const,
    label: '近場優先！',
    description: '駅から近いお店',
    icon: MapPin,
    color: '#98c9a3',
    hoverColor: '#85b591'
  }
];

const PriorityButtons: React.FC<PriorityButtonsProps> = ({ selectedPriority, onPriorityChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {priorities.map((priority) => {
        const Icon = priority.icon;
        const isSelected = selectedPriority === priority.id;
        
        return (
          <button
            key={priority.id}
            onClick={() => onPriorityChange(priority.id)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
              isSelected 
                ? 'border-transparent shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{
              backgroundColor: isSelected ? priority.color : 'white',
              color: isSelected ? 'white' : '#4a4a4a'
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = `${priority.color}15`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${isSelected ? 'bg-white bg-opacity-20' : ''}`}>
                <Icon className="w-6 h-6" style={{ color: isSelected ? 'white' : priority.color }} />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">{priority.label}</div>
                <div className={`text-sm ${isSelected ? 'text-white text-opacity-90' : 'text-[#6b6b6b]'}`}>
                  {priority.description}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PriorityButtons;