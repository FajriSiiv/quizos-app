import { create } from "zustand";

export const useStore = create((set) => ({
  numberQuest: null,
  categoryName: null,
  userName: null,
  correctAnswerUser: 0,
  setNumberQuest: (noQuest: number) => set({ numberQuest: noQuest }),
  setCategoryName: (category: string) => set({ categoryName: category }),
  setUserName: (name: string) => set({ userName: name }),
  resetCorrectAnswerUser: () => set({ correctAnswerUser: 0 }),
  incCorrectAnswer: () =>
    set((answer: any) => ({ correctAnswerUser: answer.correctAnswerUser + 1 })),
}));
