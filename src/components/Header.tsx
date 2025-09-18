import React from 'react';
import { MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#efc1b4] to-[#ac91bd] rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <a href="/">
              <h1 className="text-2xl font-bold text-[#4a4a4a] cursor-pointer">MOGUPIC</h1>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-[#6b6b6b] hover:text-[#efc1b4] transition-colors duration-200 font-medium">
              検索
            </a>
            <a href="#" className="text-[#6b6b6b] hover:text-[#efc1b4] transition-colors duration-200 font-medium">
              お気に入り
            </a>
            <a href="#" className="text-[#6b6b6b] hover:text-[#efc1b4] transition-colors duration-200 font-medium">
              履歴
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;