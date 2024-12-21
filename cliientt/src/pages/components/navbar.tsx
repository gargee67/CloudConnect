import React from 'react';
import { PlusCircle, BarChart2, Calendar } from 'lucide-react';


export default function Navbar() {
  return (
    
    <nav className="bg-[#131313] text-gray-100 h-16 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-bold text-pink-400">Campaign</span>
            <span className="text-2xl font-bold">Dashboard</span>
          </div>
          
         
        </div>
      </div>
    </nav>
  );
}