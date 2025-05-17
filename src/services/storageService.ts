
import { DiagnosticHistory, DiagnosticResult } from "@/types/diagnostic";

const HISTORY_KEY = 'revo_diagnostic_history';

export const saveToHistory = (result: DiagnosticResult): void => {
  try {
    const history = getHistory();
    const newHistoryEntry: DiagnosticHistory = {
      id: generateId(),
      timestamp: Date.now(),
      result
    };
    history.unshift(newHistoryEntry); // Add to beginning of array
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Error saving to history:", error);
  }
};

export const getHistory = (): DiagnosticHistory[] => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error getting history:", error);
    return [];
  }
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};

export const deleteHistoryEntry = (id: string): void => {
  try {
    const history = getHistory();
    const updatedHistory = history.filter(entry => entry.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Error deleting history entry:", error);
  }
};

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
