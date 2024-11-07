import React, { useState } from 'react';
import { Brain, Book, Sparkles, Target } from 'lucide-react';
import JournalEntry from '../components/wellbeing/JournalEntry';
import EmotionalInsights from '../components/wellbeing/EmotionalInsights';
import JournalPrompts from '../components/wellbeing/JournalPrompts';
import QuadrixNav from '../components/wellbeing/QuadrixNav';

const WellbeingJournal: React.FC = () => {
  const [activeQuadrant, setActiveQuadrant] = useState('dharma');

  const quadrants = [
    { id: 'dharma', label: 'Purpose', icon: Target, color: 'purple' },
    { id: 'artha', label: 'Prosperity', icon: Sparkles, color: 'yellow' },
    { id: 'kama', label: 'Pleasure', icon: Brain, color: 'rose' },
    { id: 'moksha', label: 'Freedom', icon: Book, color: 'blue' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Wellbeing Journal</h1>
        
        <QuadrixNav
          quadrants={quadrants}
          activeQuadrant={activeQuadrant}
          onQuadrantChange={setActiveQuadrant}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <JournalPrompts quadrant={activeQuadrant} />
            <JournalEntry quadrant={activeQuadrant} />
          </div>
          <EmotionalInsights />
        </div>
      </div>
    </div>
  );
};

export default WellbeingJournal;