import { create } from "zustand";

export const useStore = create((set) => ({
  numberQuest: null,
  categoryName: null,
  setNumberQuest: (noQuest: number) => set({ numberQuest: noQuest }),
  setCategoryName: (category: string) => set({ categoryName: category }),
}));
