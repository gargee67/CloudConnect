/*import React from 'react';
import {  FileText, Users } from 'lucide-react';
import { CategoryCard } from '../pages/donation/CategoryCardProps';
import '../index.css';

export const Donation = () => {
  const categories = [
    {
      category: "education",
      title: "Education",
      description: "Support students and educational initiatives",
      icon: "education"
    },
    {
      category: "medical",
      title: "Medical Emergency",
      description: "Help those in urgent medical need",
      icon: "medical"
    },
    {
      category: "startup",
      title: "Startups",
      description: "Fund innovative business ideas",
      icon: "startup"
    },
    {
      category: "social",
      title: "Social Cause",
      description: "Support community and social projects",
      icon: "social"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 tracking-tight">
          Make a Difference Today
        </h1>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative shadow-2xl">
            
          </div>
        </div>

        <section>
          <h2 className="text-3xl font-semibold mb-8 flex items-center justify-center text-pink-400">
            <FileText className="mr-4 w-8 h-8" /> Choose Your Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {categories.map((category) => (
              <div
                key={category.category}
                className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl 
                           transform transition-all duration-300 
                           hover:scale-105 hover:shadow-pink-500/30 
                           border border-gray-700/50"
              >
                <div className="p-8 text-center">
                  <CategoryCard
                    category={category.category}
                    title={category.title}
                    description={category.description}
                    icon={category.icon}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every contribution creates ripples of change. Join our community of compassionate donors.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Users className="text-pink-500 w-8 h-8" />
            <span className="text-lg text-gray-400">1,000+ Donors Making a Difference</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
*/
import React from 'react';
import { Search, Target, FileText, Users } from 'lucide-react';
import { CategoryCard } from '../pages/donation/CategoryCardProps';
import '../index.css';

export const Donation = () => {
  const categories = [
    {
      category: "education",
      title: "Education",
      description: "Support students and educational initiatives",
      icon: "education"
    },
    {
      category: "medical",
      title: "Medical Emergency",
      description: "Help those in urgent medical need",
      icon: "medical"
    },
    {
      category: "startup",
      title: "Startups",
      description: "Fund innovative business ideas",
      icon: "startup"
    },
    {
      category: "social",
      title: "Social Cause",
      description: "Support community and social projects",
      icon: "social"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute animate-pulse w-96 h-96 -top-10 -left-10 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute animate-pulse w-96 h-96 top-1/2 right-0 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute animate-pulse w-96 h-96 bottom-0 left-1/3 bg-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 tracking-tight">
          Make a Difference Today
        </h1>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative shadow-2xl">
            
           
          </div>
        </div>

        <section>
          <h2 className="text-3xl font-semibold mb-8 flex items-center justify-center text-pink-400">
            <FileText className="mr-4 w-8 h-8" /> Choose Your Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {categories.map((category) => (
              <div
                key={category.category}
                className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl 
                           transform transition-all duration-300 
                           hover:scale-105 hover:shadow-pink-500/30 
                           border border-gray-700/50"
              >
                <div className="p-8 text-center">
                  <CategoryCard
                    category={category.category}
                    title={category.title}
                    description={category.description}
                    icon={category.icon}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every contribution creates ripples of change. Join our community of compassionate donors.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Users className="text-pink-500 w-8 h-8" />
            <span className="text-lg text-gray-400">1,000+ Donors Making a Difference</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;