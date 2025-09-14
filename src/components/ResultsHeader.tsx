import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { SearchFilters } from '../types';

interface ResultsHeaderProps {
  onBackToSearch: () => void;
  filters: SearchFilters;
  priorityLabel: string;
  stationLabel: string;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ 
  onBackToSearch, 
  filters, 
  priorityLabel, 
  stationLabel 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToSearch}
          className="flex items-center space-x-2 text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">検索に戻る</span>
        </button>

        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-sm text-[#6b6b6b]">検索条件</div>
            <div className="font-semibold text-[#4a4a4a]">
              {stationLabel}駅・{priorityLabel}
            </div>
          </div>
          
          <button
            onClick={onBackToSearch}
            className="flex items-center space-x-2 bg-[#7fcba4] hover:bg-[#6fb892] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            <span>再検索</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;