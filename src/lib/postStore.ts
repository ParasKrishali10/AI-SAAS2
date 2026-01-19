import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostState {
  content: string;
  images: string[];
  description: string;
  setContent: (c: string) => void;
  setImages: (imgs: string[]) => void;
  setDescription: (d: string) => void;
  reset: () => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      content: "",
      images: [],
      description: "",
      setContent: (content) => set({ content }),
      setImages: (images) => set({ images }),
      setDescription: (description) => set({ description }),
      reset: () => set({ content: "", images: [], description: "" }),
    }),
    {
      name: "post-store",
    }
  )
);
