import React from 'react';
import { Camera, DollarSign, Heart, MapPin } from 'lucide-react';

interface PriorityButtonsProps {
  selectedPriorities: ('looks' | 'price' | 'taste' | 'walk')[];
  onPriorityChange: (priorities: ('looks' | 'price' | 'taste' | 'walk')[]) => void;
}

const priorities = [
  {
    id: 'looks' as const,
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
    id: 'walk' as const,
    label: '近場優先！',
    description: '駅から近いお店',
    icon: MapPin,
    color: '#98c9a3',
    hoverColor: '#85b591'
  }
];

const PriorityButtons: React.FC<PriorityButtonsProps> = ({ selectedPriorities, onPriorityChange }) => {
  const handlePriorityClick = (priorityId: 'looks' | 'price' | 'taste' | 'walk') => {
    if (selectedPriorities.includes(priorityId)) {
      // Remove if already selected
      onPriorityChange(selectedPriorities.filter(p => p !== priorityId));
    } else if (selectedPriorities.length < 2) {
      // Add if less than 2 selected
      onPriorityChange([...selectedPriorities, priorityId]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {priorities.map((priority) => {
        const Icon = priority.icon;
        const isSelected = selectedPriorities.includes(priority.id);
        const isDisabled = !isSelected && selectedPriorities.length >= 2;
        
        return (
          <button
            key={priority.id}
            onClick={() => handlePriorityClick(priority.id)}
            disabled={isDisabled}
            className={`p-6 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
              isSelected 
                ? 'border-transparent shadow-lg' 
                : isDisabled
                ? 'border-gray-200 opacity-50 cursor-not-allowed'
                : 'border-gray-200 hover:border-gray-300'
            } ${isDisabled ? 'hover:scale-100 hover:shadow-sm' : ''}`}
            style={{
              backgroundColor: isSelected ? priority.color : 'white',
              color: isSelected ? 'white' : '#4a4a4a'
            }}
            onMouseEnter={(e) => {
              if (!isSelected && !isDisabled) {
                e.currentTarget.style.backgroundColor = `${priority.color}15`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected && !isDisabled) {
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
            {isSelected && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {selectedPriorities.indexOf(priority.id) + 1}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PriorityButtons;