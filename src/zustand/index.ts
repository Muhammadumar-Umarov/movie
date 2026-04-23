import { create } from "zustand";

type User = {
  email: string;
  name: string;
  picture: string;
};

type Store = {
  auth: User | null;
  setAuth: (user: User) => void;
  logout: () => void;
};

export const useStore = create<Store>((set, ) => ({
  auth: null,
  setAuth: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    set({ auth: user });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    set({ auth: null });
  },
}));
