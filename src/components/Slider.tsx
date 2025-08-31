import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onChange: (value: number[]) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange }) => {
  const isRange = value.length === 2;

  return (
    <div className="relative">
      {isRange ? (
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => onChange([parseFloat(e.target.value), value[1]])}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => onChange([value[0], parseFloat(e.target.value)])}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <div 
            className="absolute h-2 bg-[#efc1b4] rounded-lg pointer-events-none"
            style={{
              left: `${((value[0] - min) / (max - min)) * 100}%`,
              width: `${((value[1] - value[0]) / (max - min)) * 100}%`
            }}
          />
        </div>
      ) : (
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => onChange([parseFloat(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <div 
            className="absolute h-2 bg-[#efc1b4] rounded-lg pointer-events-none"
            style={{
              width: `${((value[0] - min) / (max - min)) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Slider;

export { Slider }