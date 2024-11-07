import { useState, useEffect } from 'react';

interface JournalEntry {
  id: string;
  content: string;
  quadrant: string;
  timestamp: number;
  mood: number;
  tags: string[];
}

export const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem('journal_entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    setLoading(false);
  }, []);

  const saveEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('journal_entries', JSON.stringify(updatedEntries));
    return newEntry;
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journal_entries', JSON.stringify(updatedEntries));
  };

  return { entries, loading, saveEntry, deleteEntry };
};