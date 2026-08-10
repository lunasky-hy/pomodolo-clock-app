import type { HistoryLog } from "../types";

const STORAGE_KEY = "pomodoro_react_history";

// Load saved history from LocalStorage (used as lazy state initializer)
export const loadHistory = (): HistoryLog[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as HistoryLog[]) : [];
  } catch (e) {
    console.warn("Failed to load history from localStorage:", e);
    return [];
  }
};

// Persist history to LocalStorage
export const saveHistory = (logs: HistoryLog[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (e) {
    console.warn("Failed to save history to localStorage:", e);
  }
};
