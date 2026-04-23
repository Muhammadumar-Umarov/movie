import { create } from "zustand";

type User = {
  email: string;
  name: string;
  picture: string;
};

type Store = {
  saved: any[];
  toggleSave: (movie: any) => void;
  setSaved: (movies: any[]) => void;

  auth: User | null;
  setAuth: (user: User) => void;
  logout: () => void;
};

const getInitialSavedMovies = () => {
  if (typeof window === "undefined") return [];
  const savedMovies = localStorage.getItem("savedMovies");
  return savedMovies ? JSON.parse(savedMovies) : [];
};

export const useStore = create<Store>((set, get) => ({
  saved: getInitialSavedMovies(),

  toggleSave: (movie) => {
    const { saved } = get();
    const isSaved = saved.some((m) => m.id === movie.id);
    const newSaved = isSaved
      ? saved.filter((m) => m.id !== movie.id)
      : [...saved, movie];

    if (typeof window !== "undefined") {
      localStorage.setItem("savedMovies", JSON.stringify(newSaved));
    }
    set({ saved: newSaved });
  },
  setSaved: (movies) => set({ saved: movies }),

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
