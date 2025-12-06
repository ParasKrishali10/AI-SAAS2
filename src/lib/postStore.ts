import { create } from "zustand";

interface PostData {
  description: string;
  content: string;
  images: string[];

  setDescription: (desc: string) => void;
  setPost: (description: string, content: string, images: string[]) => void;
}

export const usePostStore = create<PostData>((set) => ({
  description: "",
  content: "",
  images: [],

  setDescription: (desc) => set({ description: desc }),

  setPost: (description, content, images) =>
    set({ description, content, images }),
}));
