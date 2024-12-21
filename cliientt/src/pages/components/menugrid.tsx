import React from 'react';
import { PlusCircle, BarChart2, Calendar } from 'lucide-react';

const menuItems = [
  {
    icon: PlusCircle,
    title: 'Create Campaign',
    description: 'Launch a new marketing campaign',
  },
  {
    icon: BarChart2,
    title: 'View Campaigns',
    description: 'Manage your active campaigns',
  },
  {
    icon: Calendar,
    title: 'Campaign Schedule',
    description: 'Check campaign timeline',
  },
];

export default function MenuGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <button
          key={item.title}
          className="bg-[#131313] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group border border-pink-500/10"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-pink-500/10 rounded-full group-hover:bg-pink-500/20 transition-colors">
              <item.icon className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}