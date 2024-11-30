import React from 'react';
import { CategoryCard } from '../pages/donation/CategoryCardProps';
import { Search } from 'lucide-react';
import '../index.css';

export const Donation = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Make a Difference Today
          </h1>
          <p className="text-xl text-pink-200 mb-8">
            Choose a cause you care about and start making an impact
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-pink-500 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard
            category="education"
            title="Education"
            description="Support students and educational initiatives"
            icon="education"
          />
          <CategoryCard
            category="medical"
            title="Medical Emergency"
            description="Help those in urgent medical need"
            icon="medical"
          />
          <CategoryCard
            category="startup"
            title="Startups"
            description="Fund innovative business ideas"
            icon="startup"
          />
          <CategoryCard
            category="social"
            title="Social Cause"
            description="Support community and social projects"
            icon="social"
          />
        </div>
      </div>
    </div>
  );
};