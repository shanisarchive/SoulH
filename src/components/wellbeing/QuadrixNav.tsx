import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuadrixNavProps {
  quadrants: {
    id: string;
    label: string;
    icon: LucideIcon;
    color: string;
  }[];
  activeQuadrant: string;
  onQuadrantChange: (id: string) => void;
}

const QuadrixNav = ({ quadrants, activeQuadrant, onQuadrantChange }: QuadrixNavProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {quadrants.map((quadrant) => (
        <button
          key={quadrant.id}
          onClick={() => onQuadrantChange(quadrant.id)}
          className={`flex items-center justify-center p-4 rounded-lg transition-all ${
            activeQuadrant === quadrant.id
              ? `bg-${quadrant.color}-100 border-2 border-${quadrant.color}-500`
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <quadrant.icon className={`h-6 w-6 text-${quadrant.color}-500`} />
            <span className={`text-sm font-medium text-${quadrant.color}-700`}>
              {quadrant.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuadrixNav;