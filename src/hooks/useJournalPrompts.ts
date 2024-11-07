import { useState, useEffect } from 'react';

export const useJournalPrompts = (quadrant: string) => {
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    const promptsByQuadrant: Record<string, string[]> = {
      dharma: [
        "What activities make you lose track of time?",
        "How did you contribute to others' wellbeing today?",
        "What values guided your decisions today?"
      ],
      artha: [
        "What resources do you need to achieve your goals?",
        "How did you invest in your personal growth today?",
        "What skills would you like to develop?"
      ],
      kama: [
        "What brought you joy today?",
        "How did you practice self-care?",
        "What experiences would you like to have?"
      ],
      moksha: [
        "What limiting beliefs did you challenge today?",
        "How did you practice mindfulness?",
        "What helps you feel most at peace?"
      ]
    };

    setPrompts(promptsByQuadrant[quadrant] || []);
  }, [quadrant]);

  const selectPrompt = (prompt: string) => {
    // Implement prompt selection logic
    console.log('Selected prompt:', prompt);
  };

  return { prompts, selectPrompt };
};