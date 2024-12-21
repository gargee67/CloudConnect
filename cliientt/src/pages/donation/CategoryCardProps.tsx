import React from 'react';
import { GraduationCap, Heart, Lightbulb, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { id } from 'ethers/lib/utils';

type CategoryCardProps = {
  category: string;
  title: string;
  description: string;
  id:string;
  icon: 'education' | 'medical' | 'startup' | 'social';
};

const icons = {
  education: GraduationCap,
  medical: Heart,
  startup: Lightbulb,
  social: Users,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, title, description, id, icon }) => {
  const Icon = icons[icon];

  return (
    <Link
      to={`/campaigns/${category}`}
      className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-pink-500/20 hover:bg-gray-700 transition-all duration-300 flex flex-col items-center text-center group"
    >
      <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors duration-300">
        <Icon className="w-8 h-8 text-pink-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-pink-200">{description}</p>
      <p className="text-pink-200">{id}</p>
     
    </Link>
  );
};
