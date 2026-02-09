import type { Composer } from "@/entities/composer/model";
import { create } from "zustand";

type UseMe = {
  me: null | Composer;
  setMe: (me: null | Composer) => void;
};

export const useMe = create<UseMe>((set) => ({
  me: null,
  setMe: (me) => set({ me }),
}));
